# Implementation Notes

Architecture choices, things tried and rejected, gotchas, local conventions. Not a session log — this is the durable "how/why" reference.

## Stack
- Next.js 15.1.9 (app router), React 18.3, TypeScript (strict), Tailwind CSS, Framer Motion, Radix UI primitives.
- PostHog analytics (`posthog-js`).
- Anthropic SDK (`@anthropic-ai/sdk`). The live `/scan` tool (`app/api/scan/route.ts`) uses `claude-opus-4-5` (Cofounder's choice) and is now DIAGNOSTIC (returns `observations` + `questions` + `focus`, no invented dollar values). See decisions-log 2026-06-01.
- Deployment (RESOLVED 2026-06-01): the existing Vercel project `anchormarianas.com` deploying from GitHub `main` is the deployment of record. No `prod` branch; production is `main`. The cofounder.ai `anchor-bbb827` / `prod` and the cofounder.co migration are dropped.
- CI (RESOLVED 2026-06-01): `.github/workflows/` exists with frontend-type-check, nextjs-build, frontend-tests (a Biome check), package-security-check, plus Supabase DB migration workflows. PRs are gated. Caveat: `biome.json` currently scopes `files.includes` to `biome.json` only, so the Biome step does not lint app code yet; tsc and the Next build are the real gates.

## AnchorScan (the live `/scan` tool)
- The live tool is `/scan` (`app/scan/page.tsx` + `app/scan/layout.tsx` + `app/api/scan/route.ts`). It reads a business URL, fetches the homepage text, and runs one Claude call. As of 2026-06-01 it is DIAGNOSTIC: it returns `observations` (each with `title`, `detail`, and `evidence` citing what on the site triggered it), `questions` (demand-led discovery prompts), and a `focus` framed as a question. It deliberately does NOT invent dollar values or prescribe products. In-memory 24h cache keyed by hostname.

## Anchor Scan reviews tool (WIPED, not in repo)
- A separate standalone Anchor Scan reviews tool was built in a prior session (`lib/anchor-scan/core.ts` single-file core, `scripts/anchor-scan.ts` CLI, `app/anchor-scan/` web form, swappable `ReviewsSource` for Google Places / Apify / SerpAPI / manual paste, JSON-on-disk store). It was never committed and was wiped by a working-directory re-clone. It is NOT on `origin/main`. If rebuilt, it should be diagnostic from the start (same shape as the live `/scan`) and should not duplicate Cofounder's reviews work. Full source remains in the originating chat transcript.

## Conventions
- Read both `context/` lanes before substantive work; append a session summary after; update `decisions-log.md` / `open-questions.md` / `implementation-notes.md` as needed; commit context with the related code.
- Write only `context/claude/`. Flag cross-lane items in `context/claude/open-questions.md`, never by editing `context/cofounder/`.
- No em dashes in any Anchor output or docs (founder style rule). No emojis in code or docs unless asked.
- `tsconfig.json` excludes sibling project dirs (`anchorscan/`, `_legacy/`, `_site/`, `out/`, `Archive/`) to keep `next build` typecheck clean.
- The repo frequently has significant uncommitted, in-flight work. Stage files explicitly by path, never `git add -A`. Context-lane PRs are produced from an isolated git worktree off `origin/main` so the diff stays clean.
