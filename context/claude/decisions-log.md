# Claude Decisions Log

Append-only. Newest entries at the top. Technical and implementation decisions made in Claude Code or Claude Chat sessions.

## 2026-05-18

- **Claude lane initialized.** Adopted the shared `/context/` cross-tool memory pattern alongside Cofounder. Read `context/cofounder/` (business brief, decisions, open questions, session summaries) before writing. Convention going forward: read both lanes before substantive work, append a session summary after, and commit context updates with the related code change.

- **Anchor Scan v1 architecture.** Built as a separate module, not a rewrite of the existing `/scan` website-audit. Single-file core (`lib/anchor-scan/core.ts`) so the Next route and the CLI share one source of truth with no internal-import or extension friction. Swappable `ReviewsSource` interface: Google Places API v1 default (reliable, returns ~5 reviews), Apify and SerpAPI behind env keys for volume, manual-paste fallback. One Claude call returns structured JSON; Markdown and branded printable HTML are rendered deterministically so branding stays in code, not the model. JSON-on-disk store (`data/anchor-scan/`) because there is no database in the repo. CLI runs via `tsx` (`npm run scan`). Code paths: `lib/anchor-scan/core.ts`, `scripts/anchor-scan.ts`, `app/api/anchor-scan/route.ts`, `components/anchor-scan/console.tsx`, `app/anchor-scan/page.tsx`.

- **Model is Claude Haiku 4.5, not Opus.** Both `/scan` (`app/api/scan/route.ts`) and Anchor Scan (`lib/anchor-scan/core.ts`) use `claude-haiku-4-5-20251001`, overridable for Anchor Scan via `ANCHOR_SCAN_MODEL`. Logged explicitly because the lane-seed text claimed "Claude Opus for /scan"; corrected to match the code.
