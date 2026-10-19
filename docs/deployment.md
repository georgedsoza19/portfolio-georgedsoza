# Deployment

## Current state

| Item | Status |
|------|--------|
| GitHub Actions (local/repo) | Configured — see `.github/workflows/` |
| Deploy target | **Vercel** (Node host for `/api/*`) |
| Legacy site | `legacy-3d-portfolio` branch; old Pages site still on `gh-pages` |
| Auto-deploy trigger | Push to `main` (includes merged PRs) |

AI Route Handlers require a Node-capable host. Pure static GitHub Pages **cannot** run `/api/chat` or `/api/contact`.

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

## One-time Vercel + secrets setup

1. Create a Vercel account and install the CLI locally:

   ```bash
   npm i -g vercel
   vercel login
   cd /path/to/portfolio-georgedsoza
   vercel link
   ```

2. Copy IDs from `.vercel/project.json` (`orgId`, `projectId`).

3. Create a Vercel token: [vercel.com/account/tokens](https://vercel.com/account/tokens).

4. In the GitHub repo → **Settings → Secrets and variables → Actions**, add:

   | Secret | Value |
   |--------|--------|
   | `VERCEL_TOKEN` | Vercel personal/access token |
   | `VERCEL_ORG_ID` | `orgId` from `.vercel/project.json` |
   | `VERCEL_PROJECT_ID` | `projectId` from `.vercel/project.json` |

5. In the Vercel project → **Settings → Environment Variables**, add production values from `.env.example` (`OPENAI_API_KEY`, `NEXT_PUBLIC_SITE_URL`, optional Resend keys).

6. Prefer **either** GitHub Actions deploy **or** Vercel’s built-in Git integration — not both — to avoid double production deploys. With these workflows, disable Vercel’s automatic Git deploys (Project → Settings → Git → disconnect / ignore).

## Branch rules (recommended)

On `main`:

- Require a pull request before merging
- Require the CI status check: **CI / Lint, typecheck, and build**
- Do not allow force pushes to `main`

These can be set under **Settings → Rules → Rulesets** (or Branch protection). After the first CI run on a PR, the check name appears in the required-checks list.

## Legacy GitHub Pages

The previous static site may still be live at:

`https://georgedsoza19.github.io/portfolio-georgedsoza/`

Source: `gh-pages` branch (legacy). The 3D Vite app source is on `legacy-3d-portfolio`. Once Vercel is the production URL, update the GitHub repo homepage and consider unpublishing Pages if you no longer need it.

## Production checklist

- [ ] GitHub Actions secrets for Vercel are set
- [ ] Vercel env vars include `NEXT_PUBLIC_SITE_URL` and optional AI/contact keys
- [ ] Merge to `main` triggers **Deploy** workflow (green)
- [ ] Resume opens at `/GeorgeDsoza_Resume.pdf`
- [ ] Dark/light toggle works
- [ ] Chat / polish work when `OPENAI_API_KEY` is set on Vercel
- [ ] Contact form sends via Resend or opens mailto
