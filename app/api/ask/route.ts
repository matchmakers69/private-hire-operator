import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type RateInfo = {
  count: number;
  lastReset: number;
};

// In-memory limit (dla prostego użytku — działa dopóki serwer działa)
const rateMap = new Map<string, RateInfo>();
const LIMIT = 10;
const WINDOW = 24 * 60 * 60 * 1000; // 24h

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();

  const rate = rateMap.get(ip) ?? { count: 0, lastReset: now };

  // Reset licznika co 24h
  if (now - rate.lastReset > WINDOW) {
    rate.count = 0;
    rate.lastReset = now;
  }

  // Sprawdź, czy użytkownik nie przekroczył limitu
  if (rate.count >= LIMIT) {
    return NextResponse.json({ error: "Rate limit reached. Please try again tomorrow." }, { status: 429 });
  }

  rate.count++;
  rateMap.set(ip, rate);

  // Pobranie pytania z requesta
  const { question } = await req.json();

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // ✅ tańszy i wystarczająco dobry
      max_tokens: 400,
      messages: [
        {
          role: "system",
          content: `You are a friendly, professional transport assistant based in Boston, Lincolnshire, UK.
          You help users with information about airport transfers, courier services, routes, and travel advice.
          Never confuse Boston UK with Boston USA.
          Keep answers concise, polite, and easy to read.`,
        },
        { role: "user", content: question },
      ],
    });

    const answer = response.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate an answer.";

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("AI error:", err);
    return NextResponse.json({ error: "Failed to get response from OpenAI." }, { status: 500 });
  }
}
