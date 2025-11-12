import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type RateInfo = {
  count: number;
  lastReset: number;
};

// In-memory rate limiting (resetuje się przy restarcie serwera)
const rateMap = new Map<string, RateInfo>();
const LIMIT = 10;
const WINDOW = 24 * 60 * 60 * 1000; // 24h

function getRateLimitKey(req: Request): string {
  // Pobierz IP z różnych źródeł
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  return forwarded?.split(",")[0].trim() || realIp || "unknown";
}

export async function POST(req: Request) {
  const ip = getRateLimitKey(req);
  const now = Date.now();

  const rate = rateMap.get(ip) ?? { count: 0, lastReset: now };

  // Reset licznika co 24h
  if (now - rate.lastReset > WINDOW) {
    rate.count = 0;
    rate.lastReset = now;
  }

  // Sprawdź limit
  if (rate.count >= LIMIT) {
    return NextResponse.json({ error: "Rate limit reached. Please try again tomorrow." }, { status: 429 });
  }

  rate.count++;
  rateMap.set(ip, rate);

  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    // Sanityzacja - ogranicz długość
    const sanitizedQuestion = question.trim().slice(0, 500);

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 500,
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

Important guidelines:
- NEVER confuse Boston, Lincolnshire, UK with Boston, Massachusetts, USA
- Always specify "Boston, Lincolnshire" or "Boston, UK" when mentioning the location
- Confirm that the driver operates throughout the UK and European Union
- Keep responses concise (2-3 sentences), friendly, and professional
- Use Polish language if the user writes in Polish
- If unsure about specific details, suggest contacting the driver directly

Examples:
User: "Do you travel to Europe?"
Assistant: "Yes! I provide airport transfers and long-distance travel throughout the UK and European Union. Whether you need a ride to a UK airport or international travel within the EU, I can help."

User: "Czy wozisz na lotniska?"
Assistant: "Tak! Oferuję transfery na lotniska w UK i Europie. Mój serwis obejmuje całą Wielką Brytanię oraz Unię Europejską."`,
        },
        { role: "user", content: sanitizedQuestion },
      ],
    });

    const answer = response.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate an answer.";

    return NextResponse.json({ answer });
  } catch (err: unknown) {
    console.error("OpenAI API error:", err);

    if (err instanceof Error) {
      // Rate limit od OpenAI
      if (err.message.includes("rate_limit")) {
        return NextResponse.json(
          { error: "Service temporarily unavailable. Please try again later." },
          { status: 503 },
        );
      }
    }

    return NextResponse.json({ error: "Failed to get response. Please try again later." }, { status: 500 });
  }
}
