"use client";

import { useState, useTransition } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  SendIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = { name: "", email: "", message: "" };

function socialIcon(label: string) {
  const key = label.toLowerCase();
  if (key.includes("linkedin")) return <LinkedInIcon />;
  if (key.includes("github")) return <GitHubIcon />;
  return null;
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [polishing, setPolishing] = useState(false);

  function validate(values: FormState) {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email.";
    }
    if (!values.message.trim()) next.message = "Message cannot be empty.";
    return next;
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setStatus("idle");
  }

  async function polishMessage() {
    if (!form.message.trim()) {
      setErrors((prev) => ({
        ...prev,
        message: "Add a draft message before polishing.",
      }));
      return;
    }

    setPolishing(true);
    setStatus("idle");
    try {
      const response = await fetch("/api/contact/polish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: form.message }),
      });
      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.message) {
        throw new Error(data.error ?? "Could not polish the message.");
      }

      setForm((prev) => ({ ...prev, message: data.message! }));
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "AI polish is unavailable right now.",
      );
    } finally {
      setPolishing(false);
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startTransition(async () => {
      setStatus("idle");
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = (await response.json()) as {
          ok?: boolean;
          error?: string;
          mailto?: string;
        };

        if (!response.ok) {
          throw new Error(data.error ?? "Could not send your message.");
        }

        setStatus("success");
        setStatusMessage(
          data.mailto
            ? "Email delivery is not configured yet — your mail client will open as a fallback."
            : `Thanks, ${form.name}. I will get back to you soon.`,
        );
        if (data.mailto) {
          window.location.href = data.mailto;
        }
        setForm(initialForm);
      } catch (error) {
        setStatus("error");
        setStatusMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please email me directly.",
        );
      }
    });
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s work together"
              description="Prefer email, LinkedIn, or a quick call? Use the form or reach out directly — the AI assist only polishes your draft; it never sends for you."
            />
            <ul className="mt-8 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="focus-ring group flex items-center gap-3 rounded-xl text-sm text-muted transition hover:text-accent"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-accent transition group-hover:border-accent">
                    <MailIcon />
                  </span>
                  <span>{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="focus-ring group flex items-center gap-3 rounded-xl text-sm text-muted transition hover:text-accent"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-accent transition group-hover:border-accent">
                    <PhoneIcon />
                  </span>
                  <span>{site.phone}</span>
                </a>
              </li>
              {site.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="focus-ring group flex items-center gap-3 rounded-xl text-sm text-muted transition hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-accent transition group-hover:border-accent">
                      {socialIcon(link.label)}
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow)] sm:p-8"
              noValidate
            >
              <Field label="Your name" error={errors.name} id="contact-name">
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={inputClass(Boolean(errors.name))}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  placeholder="Alex Rivera"
                />
              </Field>

              <Field
                label="Your email"
                error={errors.email}
                id="contact-email"
                className="mt-5"
              >
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass(Boolean(errors.email))}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  placeholder="alex@company.com"
                />
              </Field>

              <Field
                label="Your message"
                error={errors.message}
                id="contact-message"
                className="mt-5"
              >
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={inputClass(Boolean(errors.message))}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  placeholder="Share a bit about the role, product, or collaboration idea."
                />
              </Field>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={polishMessage}
                  disabled={polishing || isPending}
                >
                  <SparklesIcon />
                  {polishing ? "Polishing…" : "Improve with AI"}
                </Button>
                <Button type="submit" disabled={isPending || polishing}>
                  {isPending ? "Sending…" : "Send message"}
                  <SendIcon />
                </Button>
              </div>

              {status !== "idle" ? (
                <p
                  role="status"
                  className={cn(
                    "mt-4 text-sm",
                    status === "success" ? "text-accent" : "text-red-400",
                  )}
                >
                  {statusMessage}
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "focus-ring w-full rounded-xl border bg-bg px-4 py-3 text-sm text-text placeholder:text-muted",
    hasError ? "border-red-400" : "border-border",
  );
}
