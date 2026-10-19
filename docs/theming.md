# Theming — Ink & Teal

## Tokens

Defined in `src/app/globals.css`.

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#F3F5F8` | `#0B1220` |
| `--surface` | `#FFFFFF` | `#121A2B` |
| `--border` | `#D5DBE6` | `#243044` |
| `--text` | `#0B1220` | `#F4F1EA` |
| `--muted` | `#5B6575` | `#9AA4B2` |
| `--accent` | `#0D9488` | `#2DD4BF` |
| `--accent-ink` | `#042F2E` | `#042F2E` |

Tailwind maps these via `@theme inline` as `bg-bg`, `text-accent`, `border-border`, etc.

## Typography

- Display: **Space Grotesk** (`font-display`)
- Body / UI: **Source Sans 3** (`font-sans`)
- Loaded with `next/font` in `src/app/layout.tsx`

## Dark / light mode

- Provider: `next-themes` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem`)
- Toggle: `src/components/layout/theme-toggle.tsx`
- `suppressHydrationWarning` on `<html>` avoids theme flash mismatches

## Motion

Framer Motion reveals respect `prefers-reduced-motion` via `useReducedMotion` in `Reveal` and section heroes.
