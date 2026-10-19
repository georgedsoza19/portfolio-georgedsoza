import { NextResponse } from "next/server";
import { z } from "zod";
import { site } from "@/content/site";
import { rateLimit } from "@/lib/rate-limit";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(4000),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const limited = rateLimit(`contact:${ip}`, 8, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many messages. Try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
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
      { error: "Please provide a valid name, email, and message." },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (resendKey && from) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `Portfolio message from ${name}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Resend rejected the request");
      }

      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json(
        {
          error:
            "Email delivery failed. Please use the mailto fallback or try again.",
        },
        { status: 502 },
      );
    }
  }

  const mailto = `mailto:${to}?subject=${encodeURIComponent(
    `Portfolio message from ${name}`,
  )}&body=${encodeURIComponent(`${message}\n\n— ${name} <${email}>`)}`;

  return NextResponse.json({
    ok: true,
    mailto,
  });
}
