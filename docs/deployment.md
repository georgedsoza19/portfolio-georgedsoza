# Deployment

## Current state

| Item | Status |
|------|--------|
| GitHub Actions | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml), [`deploy.yml`](../.github/workflows/deploy.yml) |
| Deploy target | **Vercel** (Node host for `/api/*`) |
| Production URL | `https://portfolio-georgedsoza.vercel.app` |
| Legacy site | `legacy-3d-portfolio` branch; old Pages site may still be on `gh-pages` |
| Auto-deploy trigger | Push to `main` (includes merged PRs) |

AI Route Handlers require a Node-capable host. Pure static GitHub Pages **cannot** run `/api/chat` or `/api/contact`.

**Full CLI + secrets walkthrough:** [vercel-setup.md](./vercel-setup.md)

## GitHub Actions

### CI — `.github/workflows/ci.yml`

Runs on every **pull request into `main`**:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`

### Deploy — `.github/workflows/deploy.yml`

Runs on:

- **push to `main`** (PR merge creates this push)
- **workflow_dispatch** (manual run from the Actions tab)

Flow: install → `vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`.

Requires repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Quick setup (summary)

1. `npm install` then `npm run vercel:login` and `npm run vercel:link`
2. Create a personal token at [vercel.com/account/tokens](https://vercel.com/account/tokens)
3. Set GitHub Actions secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`)
4. Set Vercel env vars (`NEXT_PUBLIC_SITE_URL`, optional `OPENAI_API_KEY`, Resend keys)
5. Use **either** Actions deploy **or** Vercel Git auto-deploy — not both
6. Disable Deployment Protection on Production for a public portfolio

Details and troubleshooting: [vercel-setup.md](./vercel-setup.md).

## Branch rules

Ruleset **Protect main** (active):

- Require a pull request before merging
- Require status check: **Lint, typecheck, and build**
- Block force-pushes to `main`

Manage under **Settings → Rules → Rulesets**.

## Legacy GitHub Pages

The previous static site may still be live at:

`https://georgedsoza19.github.io/portfolio-georgedsoza/`

Source: `gh-pages` branch (legacy). The 3D Vite app source is on `legacy-3d-portfolio`. Prefer the Vercel production URL going forward; update the GitHub repo homepage and unpublish Pages when ready.

## Production checklist

- [ ] Follow [vercel-setup.md](./vercel-setup.md) through verification
- [ ] GitHub Actions secrets for Vercel are set
- [ ] Vercel env vars include `NEXT_PUBLIC_SITE_URL` and optional AI/contact keys
- [ ] Merge to `main` triggers **Deploy** workflow (green)
- [ ] Resume opens at `/GeorgeDsoza_Resume.pdf`
- [ ] Dark/light toggle works
- [ ] Chat / polish work when `OPENAI_API_KEY` is set on Vercel
- [ ] Contact form sends via Resend or FormSubmit (activate FormSubmit once if used)
