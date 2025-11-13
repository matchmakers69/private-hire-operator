import { NextResponse } from "next/server";
import OpenAI from "openai";
import { cookies } from "next/headers";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type RateInfo = {
  count: number;
  lastReset: number;
};

type CachedAnswer = {
  answer: string;
  timestamp: number;
};

// In-memory storage
const rateMap = new Map<string, RateInfo>();
const answerCache = new Map<string, CachedAnswer>();

const LIMIT = 10;
const WINDOW = 24 * 60 * 60 * 1000; // 24h
const CACHE_TTL = 60 * 60 * 1000; // 1h
const COOKIE_NAME = "user_id";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

function getRateLimitKey(req: Request, cookieStore: Awaited<ReturnType<typeof cookies>>): string {
  const COOKIE_NAME = "user_session_id";

  const userCookie = cookieStore.get(COOKIE_NAME);
  if (userCookie?.value) {
    return `cookie_${userCookie.value}`;
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0].trim() || realIp || "unknown";
  return `ip_${ip}`;
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const now = Date.now();

  let userId = cookieStore.get(COOKIE_NAME)?.value;
  const isNewUser = !userId;

  if (!userId) {
    userId = generateUserId();
  }

  const rateLimitKey = getRateLimitKey(req, cookieStore);
  const rate = rateMap.get(rateLimitKey) ?? { count: 0, lastReset: now };

  console.log(`📊 Key: ${rateLimitKey}${isNewUser ? " (NEW)" : ""}, Count: ${rate.count}/${LIMIT}`);

  // Reset licznika po 24h
  if (now - rate.lastReset > WINDOW) {
    rate.count = 0;
    rate.lastReset = now;
  }

  // Limit przekroczony
  if (rate.count >= LIMIT) {
    console.log(`❌ Rate limit hit for: ${rateLimitKey}`);

    const response = NextResponse.json(
      { error: "Rate limit reached. Please try again tomorrow." },
      { status: 429 },
    );

    if (isNewUser) {
      response.cookies.set(COOKIE_NAME, userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
      });
    }

    return response;
  }

  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    const sanitizedQuestion = question.trim().slice(0, 500);
    const cacheKey = sanitizedQuestion.toLowerCase();

    // Cache check
    const cached = answerCache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      console.log(`✅ Cache hit for: "${sanitizedQuestion.substring(0, 50)}..."`);

      rate.count++;
      rateMap.set(rateLimitKey, rate);

      const response = NextResponse.json({ answer: cached.answer, cached: true });

      if (isNewUser) {
        response.cookies.set(COOKIE_NAME, userId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: COOKIE_MAX_AGE,
        });
      }

      return response;
    }

    // Zwiększ licznik
    rate.count++;
    rateMap.set(rateLimitKey, rate);
    console.log(`✅ Request allowed. New count: ${rate.count}/${LIMIT}`);

    const aiResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are a helpful transport assistant for a private hire driver based in Boston, Lincolnshire, UK.
    
    Services offered:
    - Airport transfers (UK airports and European airports)
    - Long-distance travel within UK and European Union
    - Courier services (UK and EU)
    - School runs and hospital appointments (local)
    - Disability transport with wheelchair accessibility
    - Professional, licensed, and insured service since 2017
    
    Contact information (only provide if asked):
    Phone: +44 7411 853262
    Email: tomekros1@gmail.com
    
    Important guidelines:
    - NEVER confuse Boston, Lincolnshire, UK with Boston, Massachusetts, USA
    - Always specify "Boston, Lincolnshire" or "Boston, UK" when mentioning the location
    - Confirm that the driver operates throughout the UK and European Union
    - Keep responses concise (2-3 sentences), friendly, and professional
    - Use Polish language if the user writes in Polish
    - If unsure about specific details, suggest contacting the driver directly`,
        },
        { role: "user", content: sanitizedQuestion },
      ],
    });

    const answer = aiResponse.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate an answer.";

    // ✅ Bezpieczne czyszczenie cache
    if (answerCache.size > 100) {
      const oldestKey = Array.from(answerCache.keys())[0];
      if (oldestKey) answerCache.delete(oldestKey);
    }

    // Zapisz nową odpowiedź
    answerCache.set(cacheKey, { answer, timestamp: now });
    console.log(`💾 Cached answer for: "${sanitizedQuestion.substring(0, 50)}..."`);

    const response = NextResponse.json({ answer });

    if (isNewUser) {
      response.cookies.set(COOKIE_NAME, userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
      });
      console.log(`🍪 Set cookie for new user: ${userId}`);
    }

    return response;
  } catch (err: unknown) {
    console.error("OpenAI API error:", err);

    if (err instanceof Error && err.message.includes("rate_limit")) {
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: "Failed to get response. Please try again later." }, { status: 500 });
  }
}
