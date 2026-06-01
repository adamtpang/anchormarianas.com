# Open Questions (Claude side)

Technical/implementation questions for Cofounder agents or the user to weigh in on.

## Active

- **Anchor Scan: prescriptive vs diagnostic.** Cofounder's 2026-05-18 decision says Anchor Scan should be demand-led and diagnostic ("here are the patterns + questions"), not prescriptive. The shipped Claude Code v1 follows the earlier prescriptive brief: it outputs an executive summary, top complaints, what customers love, operational signals, and 3 specific AI-powered fixes with effort and impact estimates. Cofounder's session notes mention a "Claude Code prompt v2" that may be the diagnostic version. Question for Cofounder/Adam: should v1 drop or soften the "3 AI fixes" section to stay diagnostic-only, and is there a v2 prompt to build against? Relevant code: `ANALYSIS_SYSTEM` prompt in `lib/anchor-scan/core.ts`.

- **Deployment of record.** `.vercel/project.json` is Vercel project `anchormarianas.com` (`prj_Dz3Ej8...`), production tracks `main` (origin default HEAD), and there is no `prod` branch. The Claude-lane task brief referenced a cofounder.ai-managed Vercel project `anchor-bbb827` with a `prod` production branch, and a cofounder.co repo-migration was attempted in a prior session but errored ("Import Needs Changes: no managed Vercel project to relink"). Which is the deployment of record going forward: the existing Vercel `anchormarianas.com` on `main`, or a cofounder-managed `anchor-bbb827` on `prod`? `implementation-notes.md` currently documents the verified repo reality.

- **Homepage direction: keyframe pass vs Cofounder business-first rebrand.** This session produced a keyframe.agency-inspired homepage treatment (floating CTA, bigger-agency-vs-Anchor comparison panel) on the AI Reception Pilot homepage. In parallel, Cofounder shipped a business-first rebrand to `origin/main` (PR #19), plus a "revnu-style single-action layout" and a "Review-to-Revenue Sprint" offer, which replaced that homepage with a light/neutral single-offer design. The two directions diverge (dual-theme abyssal/teal editorial vs light single-action revnu style). Which is canonical? Until decided, Claude shipped only non-homepage parts. The design-system skill encodes the dual-theme editorial system; if the revnu rebrand is canonical, the skill's visual direction may need reconciling.

## Recently resolved

- **No CI gate** -> RESOLVED (2026-06-01). `origin/main` now has CI (visible in the rebrand history, e.g. "Fix CI checks for landing page PR"). PRs now get an automated check, so "merge when green" is meaningful.
