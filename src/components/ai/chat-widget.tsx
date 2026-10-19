"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starter: ChatMessage = {
  role: "assistant",
  content:
    "Ask me about George’s experience, stack, or projects. I only use his portfolio knowledge — I won’t invent details.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([starter]);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  function send() {
    const content = input.trim();
    if (!content || isPending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content },
    ];
    setMessages(nextMessages);
    setInput("");
    setError("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content: text }) => ({
              role,
              content: text,
            })),
          }),
        });
        const data = (await response.json()) as {
          reply?: string;
          error?: string;
        };

        if (!response.ok || !data.reply) {
          throw new Error(data.error ?? "Chat is unavailable right now.");
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply! },
        ]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Chat is unavailable. Please use the contact form.",
        );
      }
    });
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="mb-3 flex h-[min(28rem,70vh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]"
            role="dialog"
            aria-label="Ask about my work"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-text">
                  Ask about my work
                </p>
                <p className="text-xs text-muted">Grounded portfolio answers</p>
              </div>
              <button
                type="button"
                className="focus-ring rounded-lg px-2 py-1 text-sm text-muted hover:text-text"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    message.role === "user"
                      ? "ml-auto bg-accent text-accent-ink"
                      : "bg-bg text-muted",
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isPending ? (
                <p className="text-xs text-muted">Thinking…</p>
              ) : null}
              {error ? <p className="text-xs text-red-400">{error}</p> : null}
            </div>

            <form
              className="flex gap-2 border-t border-border p-3"
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Message
              </label>
              <input
                id="chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="focus-ring flex-1 rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-muted"
                placeholder="What stack does George use?"
                disabled={isPending}
              />
              <Button type="submit" disabled={isPending || !input.trim()}>
                Send
              </Button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[var(--shadow)] transition hover:brightness-110"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat about my work"}
        onClick={() => setOpen((value) => !value)}
      >
        <ChatIcon />
      </button>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v5A3.5 3.5 0 0 1 15.5 15H11l-4 3.5V15H8.5A3.5 3.5 0 0 1 5 11.5v-5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
