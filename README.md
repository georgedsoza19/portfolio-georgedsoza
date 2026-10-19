# George Dsoza — Portfolio

Modern **2D** personal portfolio built with the latest **Next.js App Router**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

Design system: **Ink & Teal** with **dark / light mode**. AI features: grounded portfolio chatbot + contact message polish.

> The previous Vite + Three.js site is preserved on the `legacy-3d-portfolio` branch.

## Stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Motion | Framer Motion |
| Theming | `next-themes` (class strategy) |
| AI | OpenAI-compatible API via Route Handlers |
| Contact delivery | Optional Resend, otherwise `mailto:` fallback |
| Content | Typed `src/content/site.ts` + `knowledge.md` |

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

See [`.env.example`](.env.example):

- `OPENAI_API_KEY` — enables chat + “Improve with AI”
- `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` — enables server email send
- `NEXT_PUBLIC_SITE_URL` — canonical URL for metadata

Without AI keys, the rest of the site still works; AI controls show a clear unavailable message.

### Vercel CLI (local)

The `vercel` package is a **devDependency**. After `npm install`:

```bash
npm run vercel:login
npm run vercel:link
npm run vercel:pull    # optional: sync env into .env.local
npm run vercel:prod    # optional: one-off production deploy
```

End-to-end account, secrets, and CI/CD setup: [docs/vercel-setup.md](docs/vercel-setup.md).

## Scripts

```bash
npm run dev            # local development (Turbopack)
npm run build          # production build
npm run start          # serve production build
npm run lint           # ESLint
npm run typecheck      # TypeScript
npm run vercel:login   # Vercel device login
npm run vercel:link    # link this repo to a Vercel project
npm run vercel:pull    # pull env vars into .env.local
npm run vercel:deploy  # preview deploy
npm run vercel:prod    # production deploy
```

## Project structure

```text
src/
  app/                 # routes, layouts, API handlers
  components/
    ai/                # chat widget
    layout/            # header, footer, theme
    sections/          # page sections
    ui/                # primitives
  content/             # site copy + chatbot knowledge
  hooks/
  lib/                 # utils, AI client, rate limit
  types/
docs/                  # architecture & contributor docs
public/                # resume PDF, static assets
```

## Documentation

- [Architecture](docs/architecture.md)
- [Content & resume](docs/content.md)
- [AI features](docs/ai-features.md)
- [Theming](docs/theming.md)
- [Deployment](docs/deployment.md)
- [Vercel end-to-end setup](docs/vercel-setup.md)

## Content edits

1. Update [`src/content/site.ts`](src/content/site.ts) for UI copy.
2. Mirror facts in [`src/content/knowledge.md`](src/content/knowledge.md) for the chatbot.
3. Replace [`public/GeorgeDsoza_Resume.pdf`](public/GeorgeDsoza_Resume.pdf) when the PDF changes.

## Deploy (GitHub Actions)

- **CI** runs on every PR to `main` (lint, typecheck, build).
- **Deploy** runs when a PR is merged into `main` (push to `main`) and publishes to **Vercel**.

Production: `https://portfolio-georgedsoza.vercel.app`

Add repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` before the first Actions production deploy. Full guide: [docs/vercel-setup.md](docs/vercel-setup.md).

## Legacy 3D site

```bash
git checkout legacy-3d-portfolio
```
