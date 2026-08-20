# Open Questions (Claude side)

Technical/implementation questions for Cofounder agents or the user to weigh in on.

## Active

- **Silver-generation deal #1: Guam-first, target list still settling, financing
  path still open.** Adam overrode the earlier Hawaii-first call (2026-08-05: "i
  want to start with guam since its my home"). Verified rather than assumed:
  Guam's SBA 7(a) gap is real (2 lenders vs. Hawaii's 29, $2.4M vs. $53.4M funded
  in 2025) but not a capacity ceiling - Bank of Guam alone has $3.04B in total
  assets, so it's an underwriting-appetite question, testable only by an actual
  application (decisions-log.md "final round" entry). **Target list, current
  best read**: Live Well Home Care of Guam LLC (confirmed non-medical, named
  contact Willie-Tanya Gogue-Eubanks found, but the LLC is only ~16 months old -
  call framed as relationship-building, not an acquisition pitch - see
  `context/claude/call-script-live-well-home-care-guam.md`) and Guam Home Care
  (guamhomecare.com, real contact info, track record unclear) are the two
  highest-confidence non-medical for-profit candidates. **Guam Visiting Nurses
  was likely mis-ranked #2** - multiple authoritative sources (Medicare.gov, US
  News) contradict the original non-medical claim and describe it as
  Medicare-certified AND non-profit, both likely disqualifying; no named contact
  found despite a dedicated search (decisions-log.md "correction round" entry).
  Care Connect LLC remains lowest-confidence, unverified beyond one source. Guam
  sourcing monitors are live (3 listing pages, the expensive web-search monitor
  was deleted per Adam's request to avoid the credit cost - decisions-log.md
  "post-final" entry). Hawaii's 3 monitors are paused, not deleted, as fallback.
  Still open: how to actually solve Guam acquisition financing once a real
  target firms up (Bank of Guam / Coast360 / BankPacific direct outreach, or a
  seller-carry-heavy structure), and Miguel's actual role (broker partner?
  co-searcher?) is still not documented anywhere. Open question #4 from the
  rollup doc (does this get a site page or stay internal) is still undecided.

- **Homepage direction: keyframe pass vs Cofounder business-first rebrand.** This session produced a keyframe.agency-inspired homepage treatment (floating CTA, bigger-agency-vs-Anchor comparison panel) on the AI Reception Pilot homepage. In parallel, Cofounder shipped a business-first rebrand to `origin/main` (PR #19), plus a "revnu-style single-action layout" and a "Review-to-Revenue Sprint" offer, which replaced that homepage with a light/neutral single-offer design. The two directions diverge (dual-theme abyssal/teal editorial vs light single-action revnu style). Which is canonical? Until decided, Claude shipped only non-homepage parts. The design-system skill encodes the dual-theme editorial system; if the revnu rebrand is canonical, the skill's visual direction may need reconciling.

## Recently resolved

- **Silver-generation rollup: entity type and sourcing market** -> RESOLVED
  non-medical home care, sourced in Hawaii (2026-08-05, Adam: "pick non-medical
  home care, find deal #1 in Hawaii"). SBA 7(a) does not finance Medicare-certified
  home health/hospice; non-medical home care up to ~$5M is the financeable type.
  Guam's thinner SBA lender coverage argues for Hawaii as the first-deal market
  even though Guam/Marianas is the long-term footprint.

- **Anchor Scan: prescriptive vs diagnostic** -> RESOLVED diagnostic (2026-06-01, Adam: "anchor scan should be diagnostic"). The live `/scan` tool (`app/api/scan/route.ts` + `app/scan/page.tsx`) was prescriptive: it returned `opportunities` with invented `annualValue` dollar figures, a `topRecommendation` ("tackle this first"), and a `readyForReception` sales flag. Converted to diagnostic: it now returns `observations` (evidence-backed patterns), `questions` (demand-led discovery prompts), and a `focus` framed as a question, with no invented numbers and no prescription. Note: the separate standalone Anchor Scan reviews tool from a prior session (`lib/anchor-scan/`) was never committed and was wiped by a re-clone; if rebuilt, it should follow the same diagnostic shape.

- **Deployment of record** -> RESOLVED (2026-06-01, Adam: "use the existing vercel anchormarianas.com one"). The existing Vercel project `anchormarianas.com` deploying from GitHub `main` is the deployment of record (confirmed by the passing "Vercel" check on PR #20). The cofounder.ai-managed `anchor-bbb827` / `prod` branch and the cofounder.co repo-migration are dropped. No `prod` branch; production is `main`.

- **No CI gate** -> RESOLVED (2026-06-01). `origin/main` now has CI: `.github/workflows/` includes frontend-type-check, nextjs-build, frontend-tests (a Biome check), and package-security-check, plus Supabase DB migration workflows. PRs get automated checks, so "merge when green" is meaningful. No new workflow needed.
