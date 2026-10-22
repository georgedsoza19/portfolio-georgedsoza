import { Resend } from "resend";
import { site } from "@/content/site";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export function getContactInbox() {
  return process.env.CONTACT_TO_EMAIL?.trim() || site.email;
}

export function getResendFrom() {
  return (
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "George Dsoza <onboarding@resend.dev>"
  );
}

export function hasServerEmailProvider() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() ||
      process.env.WEB3FORMS_ACCESS_KEY?.trim(),
  );
}

/**
 * Send via Resend when RESEND_API_KEY is set.
 * Uses the published `portfolio-contact` template when available.
 */
export async function sendWithResend(
  payload: ContactPayload,
): Promise<{ ok: true; id?: string } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const resend = new Resend(apiKey);
  const templateId =
    process.env.RESEND_CONTACT_TEMPLATE_ID?.trim() || "portfolio-contact";

  const { data, error } = await resend.emails.send({
    from: getResendFrom(),
    to: [getContactInbox()],
    replyTo: payload.email,
    subject: `Portfolio message from ${payload.name}`,
    template: {
      id: templateId,
      variables: {
        VISITOR_NAME: payload.name,
        VISITOR_EMAIL: payload.email,
        MESSAGE: payload.message,
      },
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, id: data?.id };
}

/**
 * Send via Web3Forms when WEB3FORMS_ACCESS_KEY is set.
 * Free key at https://web3forms.com — works from the server, no domain verify.
 */
export async function sendWithWeb3Forms(
  payload: ContactPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return { ok: false, error: "WEB3FORMS_ACCESS_KEY is not configured." };
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio message from ${payload.name}`,
      from_name: payload.name,
      email: payload.email,
      message: payload.message,
      to: getContactInbox(),
    }),
  });

  const body = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (response.ok && body.success) {
    return { ok: true };
  }

  return {
    ok: false,
    error: body.message || "Web3Forms rejected the request.",
  };
}

export async function sendContactEmail(payload: ContactPayload) {
  if (process.env.RESEND_API_KEY?.trim()) {
    return sendWithResend(payload);
  }
  if (process.env.WEB3FORMS_ACCESS_KEY?.trim()) {
    return sendWithWeb3Forms(payload);
  }
  return {
    ok: false as const,
    error: "No email provider configured.",
  };
}
