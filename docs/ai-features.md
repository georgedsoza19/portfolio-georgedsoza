# AI features

## A — Portfolio chatbot

- UI: `src/components/ai/chat-widget.tsx`
- API: `POST /api/chat`
- Knowledge: `src/content/knowledge.md`
- Behavior: answers only from knowledge; refuses invented employers/metrics

## C — Contact message polish

- UI: “Improve with AI” on the contact form
- API: `POST /api/contact/polish`
- Behavior: rewrites tone/clarity; never auto-sends

## Configuration

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
# OPENAI_BASE_URL=   # optional OpenAI-compatible endpoint
```

Without `OPENAI_API_KEY`, both endpoints return `503` with a user-facing error. The rest of the site remains usable.

## Safety / ops

- Zod input validation
- Per-IP in-memory rate limits (`src/lib/rate-limit.ts`)
- Token caps on completions
- No API keys in client bundles

## Contact delivery (separate from AI)

`POST /api/contact` uses the Resend Node SDK when `RESEND_API_KEY` is set, sending the published `portfolio-contact` template (`RESEND_CONTACT_TEMPLATE_ID`). Test-only from: `George Dsoza <onboarding@resend.dev>` (delivers only to your Resend account email). Fallbacks: `WEB3FORMS_ACCESS_KEY`, then FormSubmit in the browser.
