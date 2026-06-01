# Claude Decisions Log

Append-only. Newest entries at the top. Technical and implementation decisions made in Claude Code or Claude Chat sessions.

## 2026-06-01

- **Design-system skill is the single brand source, standardized against production.** Installed `.claude/skills/anchor-marianas-design/` and made it conform to the live token system rather than inventing a second one. The app's shadcn HSL tokens stay authoritative (every `components/ui/*` depends on them, so no token was renamed). The skill keeps its hex `--bg/--fg/--accent` vocabulary (30 files inside the skill consume it, and hex is correct for standalone artifacts that have no Tailwind), now bridged to production via a documented crosswalk plus `.font-display-italic` / `.font-mono-anchor` class aliases. The semantic type scale (`.t-hero`, `.t-h1`, `.t-eyebrow`, `.t-coord`, etc.) was lifted into `app/globals.css` as additive utilities so both surfaces share one type vocabulary. `globals.css` change is purely additive (0 removed lines).

- **No em dashes, ever, enforced in the brand kit itself.** The imported README literally instructed "em-dashes are everywhere," the opposite of Adam's standing rule. Flipped the rule and swept every em and en dash out of all 56 skill files. Also corrected brand-integrity errors found while in there: dead clients (Prospera, Network School, IDI) removed in favor of Hilton-only, and a contradictory `#0b3b5c` accent hex fixed.

- **Shipped safe parts only after a cross-tool collision.** A keyframe.agency-inspired homepage pass (floating CTA, comparison panel, copy cuts) was built this session on the AI Reception Pilot homepage, left uncommitted, and wiped by a working-directory re-clone. Meanwhile Cofounder rebranded production on `origin/main` (PR #19 business-first rebrand, revnu-style single-action layout, Review-to-Revenue Sprint), superseding that homepage. Decision (Adam): ship only the additive, non-conflicting survivors (design-system skill + type scale) off current `origin/main`; do not reconstruct the keyframe visuals onto the new rebrand without a deliberate direction call.

## 2026-05-18

- **Claude lane initialized.** Adopted the shared `/context/` cross-tool memory pattern alongside Cofounder. Read `context/cofounder/` (business brief, decisions, open questions, session summaries) before writing. Convention going forward: read both lanes before substantive work, append a session summary after, and commit context updates with the related code change.

- **Anchor Scan v1 architecture.** Built as a separate module, not a rewrite of the existing `/scan` website-audit. Single-file core (`lib/anchor-scan/core.ts`) so the Next route and the CLI share one source of truth with no internal-import or extension friction. Swappable `ReviewsSource` interface: Google Places API v1 default (reliable, returns ~5 reviews), Apify and SerpAPI behind env keys for volume, manual-paste fallback. One Claude call returns structured JSON; Markdown and branded printable HTML are rendered deterministically so branding stays in code, not the model. JSON-on-disk store (`data/anchor-scan/`) because there is no database in the repo. CLI runs via `tsx` (`npm run scan`). Code paths: `lib/anchor-scan/core.ts`, `scripts/anchor-scan.ts`, `app/api/anchor-scan/route.ts`, `components/anchor-scan/console.tsx`, `app/anchor-scan/page.tsx`.

- **Model is Claude Haiku 4.5, not Opus.** Both `/scan` (`app/api/scan/route.ts`) and Anchor Scan (`lib/anchor-scan/core.ts`) use `claude-haiku-4-5-20251001`, overridable for Anchor Scan via `ANCHOR_SCAN_MODEL`. Logged explicitly because the lane-seed text claimed "Claude Opus for /scan"; corrected to match the code.
