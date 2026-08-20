# Claude Decisions Log

Append-only. Newest entries at the top. Technical and implementation decisions made in Claude Code or Claude Chat sessions.

## 2026-08-12 (correction)

- **The "$2,000/mo retained-engineering relationship" referenced in the
  2026-08-10 entry below was never real.** It was taken at face value from
  the live anchormarianas.com homepage copy at the time, but `EVIDENCE.md`'s
  Stripe read shows $0 verified revenue on this account, ever, ruling it
  out. The IDI relationship is, and has only ever been, the free, unpaid
  proof-of-value engagement the 2026-08-10 entry itself describes -
  "retained software engineer" and the $2,000/mo figure were inaccurate
  marketing copy, not a second, separate paid arrangement. Corrected in
  `MASTERPLAN.md`, `content/work.json`, and every page that repeated it
  (`app/page.tsx`, `app/work/page.tsx`, `app/guam/page.tsx`,
  `app/about/page.tsx`) to say what's actually true: real, named, unpaid.
  Leaving the 2026-08-10 entry below unedited per this log's append-only
  rule; this entry is the correction of record.

## 2026-08-10

- **New free AI-automation initiative for IDI's own operations, distinct from the
  island-services menu.** Adam decided to do free AI-automation work on IDI's
  (International Distributors, Inc.) internal operations, unpaid. Family business,
  Adam's mom (a real decision-maker at IDI) approved it. This is explicitly NOT a
  discount on idiguam.com's island-services menu (Website in a Week / AI
  Receptionist / Google Profile Rescue), which idiguam.com's own NORTH_STAR.md
  scope guard states is never sold to family - that offer stays stranger-only via
  referral, unchanged. The existing $2,000/mo retained-engineering relationship
  (stated on the live anchormarianas.com homepage) is also unaffected - this is
  additional scope, not a replacement. The plan, in Adam's words: prove AI can
  save time, save money, and grow revenue at IDI first, then use that as a real,
  provable case study to charge a service fee to comparable Guam
  wholesalers/distributors. This is effectively a new flagship case study for
  Line 1 of MASTERPLAN.md (the AI-services wedge), not a new business line.
  Updated `repos.yaml` on both anchormarianas.com and idiguam.com to log this
  accurately (kin `why` fields), re-verified clean (65/65 claims confirmed, 0
  broken). Not yet defined: what specifically will be measured as "time/money/
  revenue" proof at IDI - needs real grounding in IDI's actual operations before
  numbers get attached to anything, per this repo's own no-invented-numbers rule.
- **First real target for the IDI AI-automation proof: order processing.**
  Adam named it directly as the slowest part of IDI's operations right now.
  Not yet scoped: what the current workflow actually looks like end to end
  (who touches an order, what tools/steps are involved, where the actual
  delay is). That's the next real grounding step before proposing any fix
  or attaching a time/money estimate to it.

## 2026-08-05 (correction round)

- **Guam Visiting Nurses is likely NOT an SBA-eligible target - the earlier #2
  ranking was probably wrong.** Adam asked for a named contact there; instead of
  finding one, found a source conflict that matters more. The original source
  (homecareatlas.com) called it "non-medical, not a medical home health agency."
  But Medicare.gov Care Compare, US News Health, and its own Medicare
  certification (License #657006) all say it IS Medicare-certified home health -
  and US News additionally describes it as a **non-profit**. Both facts, if
  accurate, are disqualifying: Medicare-certified home health isn't SBA
  7(a)-financeable (per the original financing research), and a nonprofit has no
  owner-equity to buy out the way a for-profit LLC does. No named contact found
  for the entity itself - only the office line, (671) 646-6877, 396 Chalan San
  Antonio, Bri Building Ste 102, Tamuning. Adjacent finding, unconfirmed
  relationship: **Marianas Visiting Nurses** (legal name TRI Enterprises, Inc.),
  Tamuning-GU-mailing-address but Saipan/Rota practice locations, run by a named
  person - **Gia Blancaflor Ramos, RN, President**, 671-688-4421 - similar name,
  possibly affiliated, not confirmed either way. Also Medicare-certified home
  health per its NPI taxonomy code, so likely the same SBA-eligibility problem
  even if contacted. **Revised ranking**: Guam Visiting Nurses should be treated
  as unlikely-eligible pending a direct call to verify (ask point-blank: for-profit
  or nonprofit, Medicare-certified or not) rather than assumed as the #2 target.
  Live Well Home Care of Guam LLC and Guam Home Care remain the two
  highest-confidence non-medical, for-profit candidates.

## 2026-08-05 (post-final)

- **Web-search Guam monitor deleted** (not paused) per Adam's explicit request
  to avoid the ~810 credits/mo bill - `019fd135-8dbd-75aa-a44e-67ae820f0d50`.
  The 3 page monitors (BizBuySell Guam, BusinessesForSale.com Guam, Guam Realty
  Finder) remain active at ~60 credits/mo each.
- **Live Well Home Care of Guam LLC call script prepped**
  (`context/claude/call-script-live-well-home-care-guam.md`). Found her full
  name (Willie-Tanya Gogue-Eubanks), phone (866-448-6565), and NPI record
  confirms non-medical classification and an "OWNER"-titled authorized
  official. **Correction to the earlier ranking rationale**: the LLC's NPI
  registration date is 04/11/2025 - only ~16 months old, which weakens the
  "established, retirement-ready owner" read that ranked it #1. Reframed the
  script accordingly: a relationship/learning call, not an acquisition pitch -
  a 16-month-old business's owner is not a retirement-exit prospect, and
  leading with a buy offer would misread the situation. Guam Visiting Nurses
  (18+ yrs licensed) remains the stronger succession-conversation candidate,
  once a named contact is found there too.

## 2026-08-05 (final round)

- **Complete-picture sweep of Guam non-medical home care businesses, plus Jacobs
  deal-count and lender-capacity research.** Adam asked for (1) a fuller business
  list before ranking, (2) whether Bank of Guam/Coast360 could realistically fund
  a multi-deal rollup, and (3) how many deals Brad Jacobs actually did, to
  calibrate expectations. All sourced, not assumed:
  - **Fuller Guam business list** (beyond the original 3): added **Guam Home Care**
    (guamhomecare.com, real phone 671-797-1663 / info@guamhomecare.com, claims
    150+ families served), confirmed **Live Well Home Care of Guam LLC** is a real
    NPI-registered entity (1350 N Marine Corps Dr Ste 202, Tamuning) with a named
    real contact - **Tanya Eubanks**, featured on local media ("The Brightside") -
    plus a veteran-focused care program and active Indeed hiring presence. Also
    found two adjacent, structurally-different opportunities: **Helping Hands
    Adult Care Center** (adult day care facility, not in-home) and **St.
    Dominic's Senior Care Home** (private residential senior facility, MIP-funded)
    - kept separate from the core ranking since they're a different acquisition
    shape (real estate/facility-based vs. mobile in-home staffing). Care Connect,
    LLC remains lowest-confidence - only one source (a hiring Facebook post), not
    independently re-verified. The Obsidian ledger
    (`C:\Users\adamp\ObsidianVault\silver-generation-guam-ledger.md`, 20 entries)
    was checked and confirmed NOT to overlap - it catalogs GovGuam senior-services
    procurement/contracts (Mayors' Council of Guam, GHURA, GMHA RFPs), a different
    opportunity type entirely, not private acquisition targets.
  - **Ranking (outreach-priority, not a financial ranking - no real financials
    exist yet for any of these):** 1) Live Well Home Care of Guam LLC (clear SBA
    eligibility + a real named contact to call + active operations) 2) Guam
    Visiting Nurses (longest track record, 18+ yrs licensed, but no named contact
    yet) 3) Guam Home Care (real and findable, unclear track record) 4) Care
    Connect LLC (needs independent verification first).
  - **Bank of Guam / Coast360 capacity, real numbers:** Bank of Guam has **$3.04B
    total assets (2025)**, so balance-sheet capacity is not the constraint for a
    multi-deal rollup - but their actual SBA volume is 15 loans / $15.3M across
    FY2022-FY2026 (~3/year, all purposes, source: sbapulse.com), confirming the
    thinness is about underwriting appetite/track record for this loan type, not
    an inability to lend. Coast360 FCU: ~$370M total assets (2018 figure, may be
    dated), was Guam's first credit-union SBA Preferred Lender (2014) and won "SBA
    Guam's Lender of the Year" in 2018 - a real positive signal of institutional
    SBA commitment despite low current volume. Conclusion: theoretically yes,
    either lender's balance sheet could support a serial rollup: the real
    unknown is underwriting appetite, only testable via an actual application -
    and deal #2/#3 with the same lender should get easier once a track record
    exists, which fits a rollup strategy well.
  - **Brad Jacobs deal counts, verified (McKinsey interview, Wikipedia, JPE.com,
    Business Roundtable, all consistent):** ~500 M&A transactions across his
    career. United Rentals: ~250 acquisitions in the 10 years he led it. United
    Waste Systems: "dozens" of smaller deals over ~8 years before its $2.5B sale.
    XPO (his later, larger-scale company): only **18** acquisitions in a decade -
    Jacobs draws this contrast himself. Takeaway for calibration: the
    high-volume, many-small-deals phase was early-career (Waste + Rentals =
    most of the ~500), not the later mega-company phase - the playbook that
    matches Adam's current stage is many small deals, not one perfect deal,
    which supports working a ranked list rather than fixating on a single target.

## 2026-08-05 (latest)

- **Sourcing monitors redirected from Hawaii to Guam.** Adam confirmed Guam-first
  after seeing the sourcing/financing comparison. Paused (not deleted - reversible)
  the 3 Hawaii monitors from earlier today. Created 4 Guam monitors, all daily
  9am Pacific/Guam, email to adamtpang@gmail.com, baseline checks run:
  1. `019fd134-3d5a-71bc-8d45-a4477bb840a1` - BizBuySell Guam businesses for sale
  2. `019fd134-6864-71b9-a01a-bec69323a5f1` - BusinessesForSale.com Guam
  3. `019fd135-57e9-7679-b085-0e29f8c58bda` - Guam Realty Finder business listings
  4. `019fd135-8dbd-75aa-a44e-67ae820f0d50` - **web monitor** (search-based, not a
     fixed page) watching for sale/ownership/retirement signals specifically
     naming Guam Visiting Nurses, Care Connect LLC, or Live Well Home Care of
     Guam, plus general "Guam non-medical home care for sale" results. Costs
     more (~810 credits/mo estimated vs. ~60/mo per page monitor) since it runs
     4 search queries daily - worth knowing if credit budget becomes a concern.
  Hawaii monitor IDs (paused, reactivatable): see 2026-08-05 later entry above.

## 2026-08-05 (yet even later)

- **Best-practice ETA playbook vs. Guam reality, researched.** Adam asked to see
  how the best self-funded searchers actually do this before picking a market.
  Findings, sourced:
  - **The playbook (self-funded search, not institutional two-stage search
    funds, matches Adam's solo/Miguel structure):** target smaller deals than
    traditional search funds, $500K-$2M EBITDA (vs. traditional search funds'
    larger targets). Capital stack: SBA 7(a) as primary leverage (up to ~90% of
    deal value on deals under $5M), seller note bridging part of the gap, 10-20%
    buyer equity injection, personal guarantee on the SBA debt. Real cited
    example: an operator bought a $2M-revenue service business with $150K down
    + SBA financing, ran it 3-5 years, grew it to $4-5M revenue, sold at 5-6x
    EBITDA for a $3-5M exit. Solo/self-funded searchers face fewer SBA
    affiliation-rule complications than institutional search funds. Stanford GSB
    Search Fund Study: 681 funds since 1984, 35.1% IRR / 4.5x average return,
    but ~43% never close a deal at all: sourcing, not financing, is the
    single biggest failure point industry-wide.
  - **Guam already has real, named, non-medical home care businesses
    operating**, unlike Hawaii, where no listing was found for sale. Found via
    search: **Guam Visiting Nurses** (Tamuning, licensed 18+ years, explicitly
    "a non-medical personal care agency, not a medical home health agency" -
    License #657006), **Care Connect, LLC**, and **Live Well Home Care of
    Guam** (both non-medical, found via a Guam caregiver-hiring Facebook post).
    None confirmed for sale - this is a target list, not a listings list, same
    caveat as the original Hawaii names.
  - **GEDA's SSBCI-funded Loan Guarantee Program does NOT solve the
    acquisition-financing gap** - checked directly against the program's own
    fact sheet
    (investguam.com SSBCI Fact Sheet PDF). It explicitly lists "Purchase any
    portion of the ownership interest of any owner of the business" as a
    PROHIBITED loan purpose (except employee-ownership-plan structures). So it
    cannot be used to buy out a retiring Guam owner - only for working capital,
    equipment, franchise fees, or eligible real estate, post-acquisition. Still
    worth knowing about for the post-close AI-automation buildout phase, just
    not as an acquisition bridge. (Earlier optimism about this was wrong -
    corrected here rather than left standing.)
  - **BankPacific** is a third local commercial lender (beyond Bank of Guam and
    Coast360 FCU) worth including in acquisition-financing outreach -
    self-described as focused on "island businesses" with local
    decision-making.
  - Net: Guam has a real, local sourcing pool (a genuine advantage over Hawaii
    where nothing surfaced), but the SBA financing thinness stands - no local
    program found that bridges it. The realistic path is direct outreach to
    Bank of Guam / Coast360 / BankPacific to test real acquisition-loan
    appetite, armed with a specific target business, rather than assuming the
    2-lender stat rules it out or that a workaround program exists.

## 2026-08-05 (even later)

- **Guam SBA 7(a) lending gap, quantified.** Adam pushed back on the Hawaii-first
  call ("i want to start with guam since its my home") and asked to verify the
  financing gap before overriding it. Researched (2026-08-05, sourced): Guam had
  only **2 active SBA 7(a) lenders in 2025** - Bank of Guam (4 loans, $2.0M, 9.25%
  avg rate) and Coast360 FCU (1 loan, $400K, 9.50% avg rate), $2.4M total across 5
  loans of any purpose, no visible acquisition-specific track record at that volume.
  Hawaii by contrast had **29 active lenders**, $53.4M funded across 231 businesses,
  including 10 business-acquisition loans worth $8.5M specifically (source:
  gosbaloans.com FOIA-derived 2025 rankings, both Guam and Hawaii pages). The Moylan
  bill (H.R. 7229, raising the guarantee to 90% for territorial businesses) was only
  introduced 2026-01-22 and is still sitting at "Referred to the House Committee on
  Small Business" with no further action (source: congress.gov bill tracker) - not
  close to passage, cannot be counted on for deal #1's timeline. The gap is real and
  now quantified, not just asserted. Bank of Guam is the one substantial local 7(a)
  lender (a 2020 contact on file: Janine Eustaquio, Credit Officer, 472-5349 -
  unverified current). Decision on how to proceed (research further vs. proceed with
  Guam sourcing anyway vs. explore non-SBA financing) still open - see
  open-questions.md.

## 2026-08-05 (later)

- **Silver-generation deal sourcing: automated via Firecrawl monitors, not manual checking.**
  Per the handoff's own first concrete actions, stood up 3 standing Firecrawl page
  monitors (daily 9am Pacific/Guam, email to adamtpang@gmail.com, AI change-judge
  goal tuned to flag non-medical vs Medicare-certified/SNF/hospice since only
  non-medical home care is SBA 7(a) financeable per the thesis):
  1. `019fd121-5c9f-72af-b4a0-65035aa8f974` - BizBuySell Hawaii health care & fitness
  2. `019fd121-6ddb-71db-aa0b-dbbd7c2440d5` - BizQuest Hawaii home health care
  3. `019fd122-84fb-720c-855c-c61849b5340b` - BizBuySell Hawaii owner-financed (the
     deal structure this whole thesis depends on)
  All three ran an initial baseline check successfully; future checks alert only on
  genuinely new listings. Manage via `firecrawl monitor list/get/checks/update/delete`
  (Firecrawl CLI). adamtpang@gmail.com will get a one-time confirmation email per
  monitor (external recipients must opt in) before alerts start flowing. The
  Visiting Angels corporate call and the site-integration question (open question #4
  in the rollup doc) are still unstarted, not automatable.

## 2026-08-05

- **New second business line: the silver-generation rollup thesis.** Adam handed off
  a Guam eldercare-acquisition thesis (SBA seller-financed rollup, Brad Jacobs-style,
  AI-automated back office) to Anchor Marianas, distinct from the existing AI-services
  wedge in `context/cofounder/business-brief.md`. Full writeup, financing research,
  and open questions in `context/claude/session-2026-08-05-silver-generation-rollup.md`.
  Explicitly NOT merged with the existing `.anchor/guam-leads/` 1067-business list:
  that list is for selling AI services to Guam SMBs (a different ICP and business
  model entirely); this is business acquisition. Do not conflate the two when either
  is referenced.

## 2026-07-05

- **Agent orchestrator: build Claude-native under Adam's own account, do not buy a hosted platform.** Adam wants his Claude Max subscription to fuel the work, which rules out every hosted agent SaaS (cofounder.co, Lindy, Relevance, Gumloop): Anthropic prohibits third-party products consuming subscription/OAuth credentials, and those tools are API-key or their own credits. The stack: the Claude Agent SDK / Claude Code as the reasoning brain, authored and driven from interactive Claude Code (the one guaranteed-subscription-free surface), scheduled via headless `claude -p` for batch runs (draws from the subscription in the current paused-June-15-billing state). Real tools attach as MCP servers. HARD LINE: the subscription may fuel only Adam's own automation under his own account. Any client-facing or resold surface must use an Anthropic API key (`ANTHROPIC_API_KEY`) under the Commercial Terms; the Agent SDK run as a standalone always-on app is not subscription-eligible even for himself. Runners-up if he outgrows v1: Mastra + Trigger.dev v4 (self-hosted durable) for code, or Activepieces (MIT, resale-safe) for visual. Avoid n8n for anything resold (its license forbids client-triggered/white-labeled use without a ~$50K/yr embed license).

- **AnchorScan v1 built as that self-run loop.** `scripts/anchorscan/`: a swappable read-only reviews fetcher (`fetch-reviews.mjs`: google Places / serpapi / outscraper / manual), the diagnosis method (`diagnose.md`), the typed report schema (`report.schema.json`), a renderer (`render.mjs`), and a headless batch runner (`scan.mjs` via `claude -p`). Plus an interactive `/anchorscan` command (`.claude/commands/anchorscan.md`) that runs in Claude Code so it is subscription-fuelled. Diagnostic, not prescriptive (observations + questions + focus, evidence-backed from real reviews, no invented dollar figures), consistent with the live `/scan`. Plain Node `.mjs` (no build coupling; scripts parse clean).

## 2026-06-01 (later)

- **AnchorScan is diagnostic, not prescriptive.** Adam: "anchor scan should be diagnostic." The live `/scan` tool was prescriptive (returned AI-workflow `opportunities` with invented `annualValue`, a "tackle this first" `topRecommendation`, and a `readyForReception` sales flag). Rewrote the system prompt and JSON schema to surface `observations` (evidence-backed patterns), `questions` (demand-led discovery), and a `focus` framed as a question. No invented dollar values, ROI, or percentages; no product prescription. This matches Cofounder's 2026-05-18 demand-led decision. Code: `app/api/scan/route.ts`, `app/scan/page.tsx`, `app/scan/layout.tsx`. Model left as `claude-opus-4-5` (Cofounder's choice).

- **Deployment of record is the existing Vercel `anchormarianas.com` on `main`.** Adam: "use the existing vercel anchormarianas.com one." Dropped the cofounder.ai-managed `anchor-bbb827` / `prod` branch and the cofounder.co repo-migration. Production deploys from GitHub `main` via the existing Vercel GitHub integration (the "Vercel" PR check confirms it).

- **No new CI added; existing CI is sufficient.** Adam: "sure add a minimal CI." On inspection `origin/main` already has it (`.github/workflows/`: frontend-type-check, nextjs-build, frontend-tests as a Biome check, package-security-check). Adding another would be redundant, so none was added. Note: the Biome config currently scopes `files.includes` to `biome.json` only, so the Biome gate does not actually lint app code yet; the real gates are tsc and the Next build.

## 2026-06-01

- **Design-system skill is the single brand source, standardized against production.** Installed `.claude/skills/anchor-marianas-design/` and made it conform to the live token system rather than inventing a second one. The app's shadcn HSL tokens stay authoritative (every `components/ui/*` depends on them, so no token was renamed). The skill keeps its hex `--bg/--fg/--accent` vocabulary (30 files inside the skill consume it, and hex is correct for standalone artifacts that have no Tailwind), now bridged to production via a documented crosswalk plus `.font-display-italic` / `.font-mono-anchor` class aliases. The semantic type scale (`.t-hero`, `.t-h1`, `.t-eyebrow`, `.t-coord`, etc.) was lifted into `app/globals.css` as additive utilities so both surfaces share one type vocabulary. `globals.css` change is purely additive (0 removed lines).

- **No em dashes, ever, enforced in the brand kit itself.** The imported README literally instructed "em-dashes are everywhere," the opposite of Adam's standing rule. Flipped the rule and swept every em and en dash out of all 56 skill files. Also corrected brand-integrity errors found while in there: dead clients (Prospera, Network School, IDI) removed in favor of Hilton-only, and a contradictory `#0b3b5c` accent hex fixed.

- **Shipped safe parts only after a cross-tool collision.** A keyframe.agency-inspired homepage pass (floating CTA, comparison panel, copy cuts) was built this session on the AI Reception Pilot homepage, left uncommitted, and wiped by a working-directory re-clone. Meanwhile Cofounder rebranded production on `origin/main` (PR #19 business-first rebrand, revnu-style single-action layout, Review-to-Revenue Sprint), superseding that homepage. Decision (Adam): ship only the additive, non-conflicting survivors (design-system skill + type scale) off current `origin/main`; do not reconstruct the keyframe visuals onto the new rebrand without a deliberate direction call.

## 2026-05-18

- **Claude lane initialized.** Adopted the shared `/context/` cross-tool memory pattern alongside Cofounder. Read `context/cofounder/` (business brief, decisions, open questions, session summaries) before writing. Convention going forward: read both lanes before substantive work, append a session summary after, and commit context updates with the related code change.

- **Anchor Scan v1 architecture.** Built as a separate module, not a rewrite of the existing `/scan` website-audit. Single-file core (`lib/anchor-scan/core.ts`) so the Next route and the CLI share one source of truth with no internal-import or extension friction. Swappable `ReviewsSource` interface: Google Places API v1 default (reliable, returns ~5 reviews), Apify and SerpAPI behind env keys for volume, manual-paste fallback. One Claude call returns structured JSON; Markdown and branded printable HTML are rendered deterministically so branding stays in code, not the model. JSON-on-disk store (`data/anchor-scan/`) because there is no database in the repo. CLI runs via `tsx` (`npm run scan`). Code paths: `lib/anchor-scan/core.ts`, `scripts/anchor-scan.ts`, `app/api/anchor-scan/route.ts`, `components/anchor-scan/console.tsx`, `app/anchor-scan/page.tsx`.

- **Model is Claude Haiku 4.5, not Opus.** Both `/scan` (`app/api/scan/route.ts`) and Anchor Scan (`lib/anchor-scan/core.ts`) use `claude-haiku-4-5-20251001`, overridable for Anchor Scan via `ANCHOR_SCAN_MODEL`. Logged explicitly because the lane-seed text claimed "Claude Opus for /scan"; corrected to match the code.
