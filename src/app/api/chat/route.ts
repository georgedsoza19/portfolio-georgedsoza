import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getChatModel, getOpenAIClient } from "@/lib/ai/client";
import { chatSystemPrompt } from "@/lib/ai/prompts";
import { rateLimit } from "@/lib/rate-limit";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const limited = rateLimit(`chat:${ip}`, 20, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly." },
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
          "AI chat is not configured. Set OPENAI_API_KEY, or email georgedsoza19@gmail.com.",
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
    return NextResponse.json({ error: "Invalid chat payload." }, { status: 400 });
  }

  const knowledgePath = path.join(
    process.cwd(),
    "src/content/knowledge.md",
  );
  const knowledge = await readFile(knowledgePath, "utf8");

  try {
    const completion = await client.chat.completions.create({
      model: getChatModel(),
      temperature: 0.3,
      max_tokens: 350,
      messages: [
        {
          role: "system",
          content: `${chatSystemPrompt}\n\n--- KNOWLEDGE ---\n${knowledge}`,
        },
        ...parsed.data.messages,
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "No reply was generated." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "The AI provider failed. Please try again later." },
      { status: 502 },
    );
  }
}
