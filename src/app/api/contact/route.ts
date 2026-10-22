import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getContactInbox,
  hasServerEmailProvider,
  sendContactEmail,
} from "@/lib/contact-email";
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

  const payload = parsed.data;

  if (hasServerEmailProvider()) {
    const result = await sendContactEmail(payload);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivery: "server" as const });
  }

  // No Resend / Web3Forms — client delivers via FormSubmit (browser Origin required).
  return NextResponse.json({
    ok: true,
    delivery: "formsubmit" as const,
    to: getContactInbox(),
  });
}
