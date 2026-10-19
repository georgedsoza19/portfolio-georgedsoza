# Architecture

## Principles

- **Server Components by default** — static marketing sections stay on the server; interactivity is isolated in client islands.
- **Typed content layer** — UI reads from `src/content/site.ts`; AI reads from `src/content/knowledge.md`.
- **Route Handlers for secrets** — API keys never ship to the browser.
- **Progressive enhancement** — missing AI/email config degrades gracefully (messages + mailto).

## Request flow

```text
Browser
  ├─ RSC page (sections) ──► site.ts
  ├─ ChatWidget ──POST──► /api/chat ──► OpenAI + knowledge.md
  └─ Contact form
        ├─ Improve with AI ──► /api/contact/polish
        └─ Send ──► /api/contact ──► Resend | mailto fallback
```

## Folder roles

| Path | Responsibility |
|------|----------------|
| `src/app` | Routing, metadata, API |
| `src/components/sections` | Page composition units |
| `src/components/ui` | Reusable presentational primitives |
| `src/components/layout` | Shell chrome + theme |
| `src/components/ai` | AI UX surfaces |
| `src/lib` | Pure utilities and server helpers |
| `src/hooks` | Client-only reusable behavior |
| `src/types` | Shared TypeScript contracts |
| `docs/` | Human docs kept in sync with the code |

## React / Next practices used

- App Router layouts + `metadata` API
- `next/font` for Space Grotesk + Source Sans 3
- `useTransition` for non-blocking form/chat submissions
- `useEffectEvent` in `useActiveSection` for stable IntersectionObserver callbacks
- Zod validation on API payloads
- Lightweight in-memory rate limiting per IP key

## Caching note

`next.config.ts` enables `cacheComponents` / Turbopack CSS rules from the Next 16 scaffold. Prefer Server Components and static content modules so portfolio copy stays cheap to render.
