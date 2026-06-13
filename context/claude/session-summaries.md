# Claude Session Summaries

Append-only rolling log. One entry per substantive Claude Code or Claude Chat session. Newest at top.

## 2026-06-01 — AnchorScan made diagnostic; deployment + CI questions resolved

- Adam answered three open questions. Converted the live `/scan` (AnchorScan) from prescriptive to diagnostic: it no longer returns AI-workflow `opportunities` with invented `annualValue` dollar figures, a "tackle this first" `topRecommendation`, or a `readyForReception` sales flag. It now returns `observations` (evidence-backed operational patterns, each citing what on the site triggered it), `questions` (genuinely diagnostic discovery prompts), and a `focus` framed as a question. The system prompt forbids invented numbers and product prescriptions, in Anchor's voice (no em dashes, no emoji). Files: `app/api/scan/route.ts`, `app/scan/page.tsx`, `app/scan/layout.tsx`.
- Resolved "deployment of record": the existing Vercel `anchormarianas.com` deploying from GitHub `main` (Adam: "use the existing vercel anchormarianas.com one"). Dropped the cofounder.ai `anchor-bbb827` / `prod` and the cofounder.co migration.
- Resolved "CI": it already exists on `origin/main` (frontend type-check, Next build, a Biome check, package security, plus Supabase DB workflows). No new workflow needed; confirmed it gates PRs.
- Verified against current production reality: this and the design-system PR were cut from a fresh worktree off `origin/main`, which Cofounder had rebranded (PR #19). The standalone Anchor Scan reviews tool from a prior session stays wiped; if rebuilt it should follow the same diagnostic shape.

## 2026-06-01 — Design-system skill + standardization, plus a cross-tool collision

- Imported the Anchor Marianas design-system kit from Adam's desktop as a project skill at `.claude/skills/anchor-marianas-design/` (56 files: SKILL.md, README, `colors_and_type.css`, assets, content JSON, 28 preview cards, a React UI kit).
- Standardized it: added a production-token crosswalk and `.font-display-italic` / `.font-mono-anchor` class aliases to the skill CSS, lifted the semantic type scale (`.t-*`) into `app/globals.css` as additive utilities so app and skill share one type vocabulary, purged every em and en dash skill-wide, flipped the skill's contradictory "em dashes everywhere" rule to "no em dashes ever" (matches Adam's standing style rule), fixed stale dead-client partner references (Prospera, Network School, IDI) to Hilton-only, and fixed a `#0b3b5c` color typo.
- Also did a keyframe.agency-inspired homepage UX pass (a persistent floating CTA, a bigger-agency-vs-Anchor comparison panel, copy cuts) on the then-current AI Reception Pilot homepage.
- Collision found at ship time: this working directory is a fresh clone, local `main` was 15 commits behind `origin/main`, and Cofounder had rebranded production in parallel (PR #19 "Anchor Marianas business-first", plus "revnu-style single-action layout" and a "Review-to-Revenue Sprint"). The keyframe pass was built on a homepage that rebrand superseded, and the keyframe work was never committed so the re-clone wiped it.
- Per Adam's call, shipped only the safe, additive survivors that do not fight the rebrand: the design-system skill and the `globals.css` type scale, via a branch off current `origin/main`. Did not reconstruct the keyframe homepage onto Cofounder's new design.

## 2026-05-18 — Anchor Scan v1 build + Claude lane initialized

- Built Anchor Scan v1 end to end as a separate module (existing `/scan` website-audit untouched): swappable `ReviewsSource` interface (Google Places v1 default, Apify/SerpAPI/manual), one Haiku 4.5 analysis call, Markdown + branded printable HTML, JSON-on-disk store, `tsx` CLI (`npm run scan`), and a password-gated `/anchor-scan` web form with `app/api/anchor-scan` route. Project type-checks clean (0 errors). The real "Dusit Beach Resort Guam" run is blocked only on a missing local `ANTHROPIC_API_KEY`; rendering was verified against a synthetic sample artifact.
- Read the Cofounder lane to load shared context. Learned the company wedge is Anchor Scan and that Cofounder refined it to demand-led/diagnostic on 2026-05-18. Flagged a likely mismatch with the shipped prescriptive v1 (still emits "3 AI fixes") in `open-questions.md`.
- Created `context/claude/` scaffolding: `decisions-log.md`, `open-questions.md`, `session-summaries.md`, `implementation-notes.md`.
- Corrected lane-seed facts to match the codebase: model is Haiku 4.5 (not Opus); Vercel project is `anchormarianas.com` on `main` with no `prod` branch (not `anchor-bbb827`/`prod`). Logged in `decisions-log.md` and `open-questions.md`.
- Adopted convention: read `context/cofounder/` before substantive work, append summaries here after, and commit context updates with the related code change.
