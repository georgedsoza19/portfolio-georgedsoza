# Vercel end-to-end setup guide

Complete walkthrough for local CLI setup, project linking, environment variables, GitHub Actions secrets, and first production deploy for this portfolio.

Production URL (after first deploy): `https://portfolio-georgedsoza.vercel.app`

---

## What you will set up

```text
Local machine          GitHub                         Vercel
─────────────          ──────                         ──────
vercel CLI      →      Actions secrets         →      Project + env vars
vercel link     →      CI on PRs               →      Production deploy
vercel deploy   →      Deploy on main merge    →      /api chat + contact
```

| Goal | Tooling |
|------|---------|
| Local preview against Vercel project | `vercel` CLI (devDependency + optional user install) |
| Auto quality checks | `.github/workflows/ci.yml` |
| Auto production deploy on merge to `main` | `.github/workflows/deploy.yml` |
| Runtime secrets (OpenAI, Resend) | Vercel project Environment Variables |

---

## Prerequisites

- Node.js 20+ (CI uses 22)
- npm
- GitHub CLI (`gh`) authenticated to `georgedsoza19/portfolio-georgedsoza` (optional but convenient for secrets)
- A [Vercel](https://vercel.com) account (Hobby is enough)

---

## 1. Install the Vercel CLI locally

### Option A — project-local (recommended, already in `package.json`)

From the repo root:

```bash
npm install
npx vercel --version
```

Useful npm scripts (see `package.json`):

```bash
npm run vercel          # same as npx vercel
npm run vercel:login
npm run vercel:link
npm run vercel:pull
npm run vercel:deploy   # preview deploy
npm run vercel:prod     # production deploy
```

### Option B — user-global without sudo (macOS / Linux)

System-global `npm i -g vercel` often fails with `EACCES` under `/usr/local`. Use a user prefix instead:

```bash
mkdir -p "$HOME/.local/bin"
npm install -g vercel@latest --prefix "$HOME/.local"
export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
vercel --version
```

---

## 2. Log in

```bash
npx vercel login
# or: npm run vercel:login
```

The CLI prints a device URL (e.g. `https://vercel.com/oauth/device?user_code=XXXX-XXXX`). Open it, approve access, then return to the terminal.

Confirm:

```bash
npx vercel whoami
```

---

## 3. Link this repository to a Vercel project

From the repo root (must be on the Next.js app branch, not `legacy-3d-portfolio`):

```bash
npx vercel link --yes --project portfolio-georgedsoza
# or: npm run vercel:link
```

This creates or attaches:

- Team / scope (example: `geo-projects1` / **Geo Projects**)
- Project name: `portfolio-georgedsoza`
- Local metadata in **`.vercel/`** (gitignored — do not commit)

Inspect IDs:

```bash
cat .vercel/project.json
```

Example shape:

```json
{
  "projectId": "prj_…",
  "orgId": "team_…",
  "projectName": "portfolio-georgedsoza"
}
```

`orgId` → GitHub secret `VERCEL_ORG_ID`  
`projectId` → GitHub secret `VERCEL_PROJECT_ID`

The CLI may also create/update `.env.local` with Vercel OIDC tokens. Keep `.env.local` gitignored.

---

## 4. Configure Vercel environment variables

App env vars live on **Vercel**, not in GitHub Actions secrets (except deploy credentials).

### Required for a public site

| Name | Example | Environments |
|------|---------|--------------|
| `NEXT_PUBLIC_SITE_URL` | `https://portfolio-georgedsoza.vercel.app` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Development |

CLI examples:

```bash
printf '%s' 'https://portfolio-georgedsoza.vercel.app' | npx vercel env add NEXT_PUBLIC_SITE_URL production
printf '%s' 'https://portfolio-georgedsoza.vercel.app' | npx vercel env add NEXT_PUBLIC_SITE_URL preview
printf '%s' 'http://localhost:3000' | npx vercel env add NEXT_PUBLIC_SITE_URL development
```

Or use the dashboard: **Project → Settings → Environment Variables**.

### Optional (AI + email)

| Name | Purpose |
|------|---------|
| `OPENAI_API_KEY` | Chat widget + “Improve with AI” |
| `OPENAI_MODEL` | Defaults to `gpt-4o-mini` if unset |
| `OPENAI_BASE_URL` | Optional OpenAI-compatible gateway |
| `RESEND_API_KEY` | Server-side contact email |
| `CONTACT_FROM_EMAIL` | Verified Resend from address |
| `CONTACT_TO_EMAIL` | Inbox (defaults to site email in code) |

```bash
npx vercel env add OPENAI_API_KEY production
# paste key when prompted; repeat for preview if needed
```

Pull into local `.env.local` (overwrites local file carefully):

```bash
npm run vercel:pull
# or: npx vercel env pull .env.local
```

Reference template: [`.env.example`](../.env.example).

---

## 5. GitHub Actions secrets (deploy credentials)

These secrets authorize the **Deploy** workflow only.

| Secret | Source |
|--------|--------|
| `VERCEL_TOKEN` | [Account → Tokens](https://vercel.com/account/tokens) — create a personal token (CLI `vercel tokens create` may be blocked for some teams) |
| `VERCEL_ORG_ID` | `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` → `projectId` |

### Via GitHub UI

Repo → **Settings → Secrets and variables → Actions → New repository secret**.

### Via GitHub CLI

```bash
# org + project IDs from .vercel/project.json
gh secret set VERCEL_ORG_ID --body 'team_…'
gh secret set VERCEL_PROJECT_ID --body 'prj_…'

# paste token when prompted (do not commit the token)
gh secret set VERCEL_TOKEN
```

Verify:

```bash
gh secret list
```

You should see at least `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

---

## 6. Choose one production deploy path (avoid doubles)

Linking the GitHub repo in Vercel **and** running `.github/workflows/deploy.yml` can produce **two** production deploys per merge.

**Recommended for this repo:** keep **GitHub Actions** as the deploy path used by the ruleset docs.

1. Vercel → Project → **Settings → Git**
2. Disconnect the Git integration **or** disable production deployments from Git
3. Keep Actions Deploy workflow enabled

**Alternative:** keep Vercel Git auto-deploy and treat Actions as **CI only** (you would then remove or disable `deploy.yml`).

---

## 7. Public access (Deployment Protection)

Hobby projects may enable **Vercel Authentication** on previews/production. For a public portfolio:

1. Vercel → Project → **Settings → Deployment Protection**
2. Disable protection on **Production** (and Preview if you want shareable PR URLs)

Otherwise visitors hit a Vercel login wall.

---

## 8. Local workflows cheat sheet

```bash
# Install deps
npm install

# App locally (Next)
cp .env.example .env.local   # fill keys as needed
npm run dev

# CLI auth + project
npm run vercel:login
npm run vercel:link
npm run vercel:pull

# One-off preview deploy from your machine
npm run vercel:deploy

# One-off production deploy from your machine
npm run vercel:prod
```

---

## 9. CI / CD behavior

### Pull requests → `main`

Workflow: **CI** (`.github/workflows/ci.yml`)

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`

Repo ruleset **Protect main** requires this check before merge.

### Merge / push → `main`

Workflow: **Deploy** (`.github/workflows/deploy.yml`)

1. `vercel pull --environment=production`
2. `vercel build --prod`
3. `vercel deploy --prebuilt --prod`

Uses `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

Manual run: GitHub → **Actions → Deploy → Run workflow**.

---

## 10. First-time verification checklist

- [ ] `npx vercel whoami` works
- [ ] `.vercel/project.json` exists locally (not committed)
- [ ] `gh secret list` shows all three Vercel secrets
- [ ] Vercel env has `NEXT_PUBLIC_SITE_URL` (and optional `OPENAI_API_KEY`)
- [ ] Deployment Protection off for production (public site)
- [ ] Only one auto-deploy path enabled (Actions **or** Vercel Git)
- [ ] PR CI is green
- [ ] After merge to `main`, Deploy workflow is green
- [ ] https://portfolio-georgedsoza.vercel.app loads
- [ ] `/GeorgeDsoza_Resume.pdf` downloads
- [ ] Dark/light toggle works
- [ ] Chat / polish work when OpenAI key is set on Vercel

---

## 11. Troubleshooting

| Symptom | Fix |
|---------|-----|
| `EACCES` on `npm i -g vercel` | Use user prefix (`~/.local`) or `npx vercel` / project scripts |
| `Cannot create tokens for this app` | Create a **personal** token in the Vercel dashboard |
| Deploy Action fails auth | Rotate/re-add `VERCEL_TOKEN`; confirm org/project IDs match `.vercel/project.json` |
| Site asks for Vercel login | Disable Deployment Protection on Production |
| Two deploys per merge | Disconnect Vercel Git **or** disable Actions Deploy |
| AI returns 503 | Set `OPENAI_API_KEY` on Vercel for Production (and Preview) |
| Contact mailto only | Expected until `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` are set |
| Changes missing on `main` | Confirm PR merged; Deploy ran on the merge commit |

---

## 12. Related docs

- [Deployment overview](./deployment.md) — Actions + Pages notes
- [AI features](./ai-features.md) — chat + polish APIs
- [Content](./content.md) — resume and `site.ts`
- [Architecture](./architecture.md) — folder layout
