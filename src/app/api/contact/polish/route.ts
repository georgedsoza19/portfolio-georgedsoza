import { NextResponse } from "next/server";
import { z } from "zod";
import { getChatModel, getOpenAIClient } from "@/lib/ai/client";
import { polishSystemPrompt } from "@/lib/ai/prompts";
import { rateLimit } from "@/lib/rate-limit";

const bodySchema = z.object({
  message: z.string().trim().min(1).max(4000),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const limited = rateLimit(`polish:${ip}`, 15, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many polish requests. Try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const client = getOpenAIClient();
  if (!client) {
    return NextResponse.json(
      {
        error:
          "AI polish is not configured. Set OPENAI_API_KEY to enable this feature.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 },
    );
  }

  try {
    const completion = await client.chat.completions.create({
      model: getChatModel(),
      temperature: 0.4,
      max_tokens: 500,
      messages: [
        { role: "system", content: polishSystemPrompt },
        { role: "user", content: parsed.data.message },
      ],
    });

    const message = completion.choices[0]?.message?.content?.trim();
    if (!message) {
      return NextResponse.json(
        { error: "No polished message was returned." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message });
  } catch {
    return NextResponse.json(
      { error: "The AI provider failed while polishing." },
      { status: 502 },
    );
  }
}
