# Deployment

## Recommended: Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: **Next.js**.
3. Add env vars from `.env.example` (`OPENAI_API_KEY`, optional Resend keys, `NEXT_PUBLIC_SITE_URL`).
4. Deploy.

AI Route Handlers require a Node-capable host. Pure static GitHub Pages **cannot** run `/api/chat` or `/api/contact`.

## Legacy GitHub Pages site

The old Vite + Three.js portfolio remains on:

```bash
git checkout legacy-3d-portfolio
```

That branch can still be published with `gh-pages` if needed. The App Router rebuild on `main` should use Vercel (or similar).

## Production checklist

- [ ] `NEXT_PUBLIC_SITE_URL` points at the live domain
- [ ] Resume PDF opens at `/GeorgeDsoza_Resume.pdf`
- [ ] Dark/light toggle works
- [ ] Chat returns answers when `OPENAI_API_KEY` is set
- [ ] Contact form either sends via Resend or opens mailto
- [ ] LinkedIn / GitHub / email links work
