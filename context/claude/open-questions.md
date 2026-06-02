# Open Questions (Claude side)

Technical/implementation questions for Cofounder agents or the user to weigh in on.

## Active

- **Homepage direction: keyframe pass vs Cofounder business-first rebrand.** This session produced a keyframe.agency-inspired homepage treatment (floating CTA, bigger-agency-vs-Anchor comparison panel) on the AI Reception Pilot homepage. In parallel, Cofounder shipped a business-first rebrand to `origin/main` (PR #19), plus a "revnu-style single-action layout" and a "Review-to-Revenue Sprint" offer, which replaced that homepage with a light/neutral single-offer design. The two directions diverge (dual-theme abyssal/teal editorial vs light single-action revnu style). Which is canonical? Until decided, Claude shipped only non-homepage parts. The design-system skill encodes the dual-theme editorial system; if the revnu rebrand is canonical, the skill's visual direction may need reconciling.

## Recently resolved

- **Anchor Scan: prescriptive vs diagnostic** -> RESOLVED diagnostic (2026-06-01, Adam: "anchor scan should be diagnostic"). The live `/scan` tool (`app/api/scan/route.ts` + `app/scan/page.tsx`) was prescriptive: it returned `opportunities` with invented `annualValue` dollar figures, a `topRecommendation` ("tackle this first"), and a `readyForReception` sales flag. Converted to diagnostic: it now returns `observations` (evidence-backed patterns), `questions` (demand-led discovery prompts), and a `focus` framed as a question, with no invented numbers and no prescription. Note: the separate standalone Anchor Scan reviews tool from a prior session (`lib/anchor-scan/`) was never committed and was wiped by a re-clone; if rebuilt, it should follow the same diagnostic shape.

- **Deployment of record** -> RESOLVED (2026-06-01, Adam: "use the existing vercel anchormarianas.com one"). The existing Vercel project `anchormarianas.com` deploying from GitHub `main` is the deployment of record (confirmed by the passing "Vercel" check on PR #20). The cofounder.ai-managed `anchor-bbb827` / `prod` branch and the cofounder.co repo-migration are dropped. No `prod` branch; production is `main`.

- **No CI gate** -> RESOLVED (2026-06-01). `origin/main` now has CI: `.github/workflows/` includes frontend-type-check, nextjs-build, frontend-tests (a Biome check), and package-security-check, plus Supabase DB migration workflows. PRs get automated checks, so "merge when green" is meaningful. No new workflow needed.
