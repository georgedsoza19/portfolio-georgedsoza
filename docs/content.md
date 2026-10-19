# Content & resume

## Sources of truth

| File | Used by |
|------|---------|
| `src/content/site.ts` | All visible portfolio sections |
| `src/content/knowledge.md` | Chatbot system context |
| `public/GeorgeDsoza_Resume.pdf` | Resume download |

When you change a fact (role dates, email, stack), update **all three** so the page, bot, and PDF stay aligned.

## Placeholders

Project cards may set `placeholder: true` until you add screenshots or public URLs:

```ts
{
  name: "Finti",
  summary: "...",
  technologies: ["React", "TypeScript"],
  placeholder: true,
  // liveUrl: "https://...",
  // repoUrl: "https://github.com/...",
  // image: "/projects/finti.png",
}
```

## Resume

Replace the PDF at `public/GeorgeDsoza_Resume.pdf`. The download path is configured as `site.resumePath`.

Do not put gender, date of birth, or relationship status in the public PDF.
