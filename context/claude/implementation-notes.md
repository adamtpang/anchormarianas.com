# Implementation Notes

Architecture choices, things tried and rejected, gotchas, local conventions. Not a session log — this is the durable "how/why" reference.

## Stack
- Next.js 15.1.9 (app router), React 18.3, TypeScript (strict), Tailwind CSS, Framer Motion, Radix UI primitives.
- PostHog analytics (`posthog-js`).
- Anthropic SDK (`@anthropic-ai/sdk`). The model in use is `claude-haiku-4-5-20251001` for both `/scan` (`app/api/scan/route.ts`) and Anchor Scan (`lib/anchor-scan/core.ts`, overridable via `ANCHOR_SCAN_MODEL`). The lane-seed text said "Claude Opus for /scan"; that is not what the code does. Documented here as the verified reality.
- Deployment: Vercel project `anchormarianas.com` (`prj_Dz3Ej8GdWxpIKAc21Lw6NFI5Jo1d`, from `.vercel/project.json`). Production tracks `main` (origin default HEAD). There is no `prod` branch. A cofounder.ai-managed Vercel project `anchor-bbb827` with a `prod` branch was referenced in tasking, and a cofounder.co migration was attempted in a prior session but is not in effect in this repo as of 2026-05-18. See `open-questions.md` (Deployment of record).
- No CI: there are no `.github/workflows`, so "PR green" means mergeable only.

## Anchor Scan (wedge product)
- Separate module. The pre-existing `/scan` is a different tool (website audit) and was deliberately left untouched.
- One-file core `lib/anchor-scan/core.ts` with no internal relative imports, so the Next route and the `tsx` CLI share it without module-resolution or extension friction. CLI: `scripts/anchor-scan.ts` via `npm run scan`. Web: `app/anchor-scan/page.tsx` + `components/anchor-scan/console.tsx` + `app/api/anchor-scan/route.ts` (Node runtime, gated by `ANCHOR_SCAN_PASSWORD`).
- `ReviewsSource` is a swappable interface: Google Places API v1 (default, reliable, ~5 reviews), Apify and SerpAPI behind env keys for volume, manual paste as the always-available fallback.
- The LLM returns structured JSON; Markdown and branded printable HTML are rendered deterministically so branding lives in code, not in the model output.
- Storage is JSON on disk under `data/anchor-scan/` (gitignored) because there is no database in the repo. Swap for Postgres later behind the same record shape.
- Strategy watch-item: Cofounder wants Anchor Scan diagnostic and demand-led, not prescriptive. v1 still emits "3 AI fixes". Tracked in `open-questions.md`.

## Conventions
- Read both `context/` lanes before substantive work; append a session summary after; update `decisions-log.md` / `open-questions.md` / `implementation-notes.md` as needed; commit context with the related code.
- Write only `context/claude/`. Flag cross-lane items in `context/claude/open-questions.md`, never by editing `context/cofounder/`.
- No em dashes in any Anchor output or docs (founder style rule). No emojis in code or docs unless asked.
- `tsconfig.json` excludes sibling project dirs (`anchorscan/`, `_legacy/`, `_site/`, `out/`, `Archive/`) to keep `next build` typecheck clean.
- The repo frequently has significant uncommitted, in-flight work. Stage files explicitly by path, never `git add -A`. Context-lane PRs are produced from an isolated git worktree off `origin/main` so the diff stays clean.
