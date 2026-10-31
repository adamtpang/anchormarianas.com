# Anchor Buy Platform: Ideal vs Today

> Strategy and product spec. Last updated Oct 31, 2026. Owner: Cofounder (strategy). Builders: Engineering, Design, QA.
> Not legal, tax or lending advice. Items marked (verify) are uncertain and must be checked before anyone relies on them.

## Contents

1. [The rule this spec obeys](#1-the-rule-this-spec-obeys)
2. [Where PR #65 stands](#2-where-pr-65-stands)
3. [The ideal platform, stage by stage](#3-the-ideal-platform-stage-by-stage)
4. [Gap table: ideal vs PR #65](#4-gap-table-ideal-vs-pr-65)
5. [Legal data sources](#5-legal-data-sources)
6. [Phases and unlock gates](#6-phases-and-unlock-gates)
7. [Phase 1 build list](#7-phase-1-build-list)
8. [What the real players do](#8-what-the-real-players-do)
9. [Risks and open questions](#9-risks-and-open-questions)
10. [Sources](#10-sources)

## 1. The rule this spec obeys

Nothing gets built past PR #65 until 10 owner conversations are logged. So the platform is split into phases. Phase 1 contains only the work that directly produces owner conversations within 2 weeks. Every later phase unlocks at a real milestone: conversations, NDAs, an LOI, or a close.

Other fixed rules:

- Adam sends every message and places every call himself. The platform drafts. It never sends, dials, texts or emails.
- Only legal data sources. No BizBuySell scraping (their terms ban robots, spiders and data extraction). No scraping of any site whose terms forbid it.
- SBA 7(a) under SOP 50 10 8.1 (effective Oct 1, 2026) is the financing frame: 10% equity injection, 1.25x DSCR on historical cash flow, no earnouts, seller notes only count toward equity on full standby.

## 2. Where PR #65 stands

Facts read from GitHub on Oct 31, 2026 (read-only, nothing changed):

- PR #65 "Add a private buy desk for acquisition targets", branch `cursor/buy-platform-8c44` into `main`. Open, not a draft, mergeable. 1 commit (d7d65fc), +3,075 / -71 lines across 40 files. Opened Oct 30, 2026, 8:49 PM CDT by a Cursor cloud agent.
- No reviews. Only check is a successful Vercel preview deploy. Only comment is the Vercel bot. The PR text says the desk "is not deployed"; that means not in production. A preview build exists.
- Stack (main): Next.js 15.5, React 18, Tailwind 3, Radix/shadcn, `@anthropic-ai/sdk`, PostHog, Vercel Analytics, Biome, Node test runner with tsx. `supabase/migrations` holds only `.gitkeep`, so no database yet.

What PR #65 builds:

| Area | What exists |
|---|---|
| Routes | `/buy` target browser (search, filters, 9 sorts); `/buy/queue` daily call queue with due-today toggle and `tel:` links; `/buy/targets/new`; `/buy/targets/[id]` edit plus call log; `/buy/import` CSV import/export with column help and a sample file; `/buy-gate` passcode page; `/api/buy-gate` unlock/logout. The old public Google-review report moved from `/buy` to `/check` (`/api/buy` unchanged). |
| Data model (`lib/buy/model.ts`) | Target: name, industry, city, website, phone, revenue, profit, years in business, owner name, owner age (text band like "60-65"), successor (yes/no/unknown), per-field source URLs (11 fields), notes, status, calls, sample flag, timestamps. Statuses: New, Contacted, Talking, Interested, NDA, LOI, Passed. CallLog: date, outcome (no answer, voicemail, talked, not selling, interested, follow up), notes, follow-up date. Starter industries: Texas bookkeeping and tax firms, commercial insurance agencies, B2B distributors. |
| Queue logic | Buckets ranked overdue, today, new, waiting, later. Passed targets excluded. Call outcome suggests the next status (interested to Interested, not selling to Passed, talked to Talking, first call moves New to Contacted). |
| Storage | Browser `localStorage` key `anchor-buy-desk-v1`, JSON `{version: 1, targets}`, sanitizer drops malformed records. Single device. No sync, no server copy. |
| CSV | 24 columns including `source_*`. Max 500 rows. Import appends with no dedupe. Call logs are not exported. Sample file has 5 fake rows (555 numbers, example.com). |
| Auth | Single shared passcode in server env `BUY_PASSCODE`; fails closed if unset. SHA-256 constant-time compare, then HMAC-SHA256 session cookie `anchor_buy_session` (httpOnly, SameSite=Lax, Path=/buy, 7 days). Same-origin POST check. In-memory rate limit of 8 failures per 15 minutes per IP. Enforced in `app/buy/layout.tsx`. noindex, X-Robots-Tag, private no-store, robots.txt disallow, not in sitemap. |
| Tests | csv 5, filter 4, gate 7, queue 2, storage 2, visibility 3. |
| Not present | Scoring, enrichment, any AI, outreach drafting, conversation counter, dedupe, multi-device sync, diligence, deal model, LOI. No real targets loaded. |

Other things on `main` worth knowing:

- `lib/buy/fetch-place.ts` and `analyze.ts` pull Google Maps place data and reviews through an Apify actor (`APIFY_API_TOKEN`, capped at $0.50 a run). Useful later for enrichment, but see the Google terms note in section 5.
- `scripts/anchorscan`, `scripts/data-foundation`, `scripts/retell` (voice AI config) exist from the Guam agency work.
- `NORTH_STAR.md` and `.anchor/PLAYBOOK.md` still describe the Guam AnchorScan agency (progress 3/10, outbound paused) and say "No eldercare acquisition work in this workstream". Nothing on main describes the holdco acquisition strategy. These docs should be updated so every bot works from the same goal.

## 3. The ideal platform, stage by stage

What a one-person searcher who becomes a holdco would want, end to end. This is the north star, not the Phase 1 build.

| # | Stage | Ideal capability |
|---|---|---|
| 1 | Sourcing | Pull every candidate firm in a radius from public registries (IRS PTIN FOIA list, Comptroller franchise taxpayers, TSBPA firm lookup, SOS filings), merge into one record per firm, exclude chains and franchises, refresh on a schedule. |
| 2 | Enrichment | Add owner name, owner age band, years in business, headcount proxy, website, reviews, software stack, client mix. Every field keeps a source URL and a date. Paid enrichment (Apollo, Clay) only for firms that pass the first score. |
| 3 | Scoring | Transparent fit score (rules first, learned weights later) for succession likelihood, size fit for SBA, non-attest status, recurring revenue signals, distance. Explains itself in one line. |
| 4 | Outreach drafting | Per-target call opener, voicemail, handwritten-style letter and email drafts, written by AI from the record. Adam reviews and sends. Every send is logged by Adam, not automated. |
| 5 | Conversation CRM | Timeline of calls, letters and meetings per owner. AI summary after each call, next step and follow-up date, relationship temperature, objections heard. Counter toward the 10-conversation gate. |
| 6 | Diligence | NDA tracking, request list tuned to bookkeeping and tax firms (client list and concentration, recurring vs seasonal revenue, retention, staff and credentials, software, engagement letters, e-file history), secure uploads, AI extraction of P&L and tax returns into a normalized trailing-twelve-month view with add-backs. |
| 7 | Deal modeling (SBA 7(a), SOP 50 10 8.1) | Price, sources and uses, 10% injection, seller full-standby note (with minority equity, standby note plus minority equity capped at half of the 10%), 1.25x DSCR on historical cash flow only, no earnouts (buyer rebate as an alternative, verify wording with lender), independent valuation ceiling (gap paid in cash), QoE flag at $3M and up, seller post-close role as consultant up to 24 months. |
| 8 | LOI drafting | Generate a non-binding LOI from the model: fixed price, structure, seller note terms, transition, exclusivity, contingencies. Attorney reviews before Adam sends. |
| 9 | Post-close AI ops | Client intake and document chase, transaction categorization, tax season workload planning, client retention watch, KPI dashboard, then a holdco view across several firms. |

## 4. Gap table: ideal vs PR #65

| Stage | Ideal | PR #65 today | Gap | Phase |
|---|---|---|---|---|
| Sourcing | Registry pulls merged into one record per firm, chains excluded | Manual entry and CSV import (500 rows, no dedupe), 5 fake sample rows | No real data, no seed script, no dedupe | 1 (seed script plus dedupe) |
| Enrichment | Owner, age band, tenure, size, reviews, with sources | Fields exist with per-field source URLs; all filled by hand | No automated enrichment | 1 (registry fields only), 2 (Apollo, Clay, Places) |
| Scoring | Transparent fit score with reasons | Filters and 9 sorts, no score | No score | 1 (rules v0), 2 (learned v1) |
| Outreach drafting | AI drafts per target, Adam sends | `tel:` links only | No scripts, letters or drafts | 1 (scripts and letter drafts, copy only) |
| Conversation CRM | Timeline, AI call summaries, next steps, 10-conversation counter | Status pipeline, call log with outcome, notes, follow-up date; daily queue | No counter, no "spoke with owner" flag, no summaries, no meetings or letters log | 1 (counter and flag), 2 (full CRM) |
| Storage and auth | Server database, per-user login, multi-device, backups | localStorage on one device, shared passcode | Data loss risk, phone and laptop do not sync, call logs not exported | 1 (JSON backup and restore), 2 (Supabase) |
| Diligence | NDA tracking, request list, uploads, AI extraction to TTM | NDA is only a status | Everything | 3 |
| Deal modeling | SBA 8.1 calculator with DSCR, injection, standby note, valuation gap | Revenue and profit fields only | Everything | 3 |
| LOI drafting | LOI generated from the model, attorney review | LOI is only a status | Everything | 4 |
| Post-close AI ops | Ops agents and KPI dashboard per firm, holdco rollup | None | Everything | 5 |

## 5. Legal data sources

Checked on Oct 31, 2026.

| Source | What it gives | Access and cost | Legal notes | Phase |
|---|---|---|---|---|
| IRS PTIN FOIA list (Texas file) | Every PTIN holder: name, business name (DBA), business address, phone, website, credential (CPA, EA, attorney, etc.), AFSP flag | Free CSV download, updated twice a year (current list Aug 2026, Texas file posted Oct 23, 2026) | Released by IRS under FOIA; holders cannot opt out. Best Phase 1 source. | 1 |
| Texas Comptroller Active Franchise Taxpayers (data.texas.gov `9cir-efmm`) | Entity name, address, county, org type, SOS file number, SOS charter date (tenure proxy), right-to-transact status, NAICS code | Free, open data, Socrata API and CSV, about 3.5M rows | Public open data. NAICS is sparse (about 19% of New Braunfels entities have one), so treat it as a bonus filter, not the universe. | 1 |
| TSBPA CPA Firm Lookup | Whether a firm holds a Texas CPA firm license (search by name, city, county, ZIP) | Free web lookup; bulk list via Public Information Act request to the TSBPA Public Information Officer | Read the lookup's Terms of Use before any automation (verify). Manual checks or a PIA request are safe. Licensed CPA firms raise Occ. Code 901.354 ownership limits if they do attest work. | 1 (manual flag), 2 (PIA bulk list) |
| Texas SOS business filings (SOSPortal) | Registered agent, officers or managers, formation and status history | $1 per entity search; bulk: Master Unload $1,350, weekly update $20, daily $60 | Official public records. Use per-entity lookups on shortlisted firms only. | 2 |
| Google Places API (New) | Place ID, rating, review count, hours, website | Pay per call | Only `place_id` may be stored indefinitely. Lat/long up to 30 days. Other details must be fetched live with attribution, not stored. The existing Apify Google Maps actor on main is a scraper; its fit with Google terms is uncertain (verify), so the buy desk should use the official API. | 2 |
| Apollo | Owner email, LinkedIn, title, headcount | Connector available; paid credits | Licensed data. Coverage of 2 to 10 person local firms is often thin (verify on a sample). | 2 |
| Clay | Waterfall enrichment across providers | Connector available; paid credits | Licensed data. Use only on firms scoring above the cut line. | 2 |
| County assumed name (DBA) records | Sole proprietors and DBAs not in the franchise file | Varies by county (Comal, Guadalupe, Hays) | Public records; method and cost vary by county (verify). | 2 |
| BizBuySell | Brokered listings | Browse manually only | Terms ban scraping, robots, data extraction and copying into a database. Never automate. | Never automated |

Outreach compliance (verify with counsel, not legal advice): manual calls placed by Adam to business lines are the low-risk channel; avoid autodialers, prerecorded messages and texts to mobile numbers without consent (TCPA); emails need CAN-SPAM basics (real identity, physical address, opt-out). Physical letters carry the least compliance risk.

Quick sanity pull done today (read-only, nothing stored in the repo):

- IRS PTIN Texas file: 78,366 preparers statewide. In 12 ZIPs around New Braunfels, Seguin, San Marcos, Schertz, Boerne and Canyon Lake: 753 preparers, about 536 distinct business names, 210 CPAs and 59 EAs, 624 with a phone, 179 with a website. 34 business names have 2 or more preparers, 14 have 3 or more (a rough size proxy, includes chains).
- Comptroller file: 117 entities with accounting NAICS codes (541211, 541213, 541214, 541219) across New Braunfels, San Marcos, Seguin, Canyon Lake, Schertz, Bulverde, Kyle and Boerne. Charter dates go back to the early 1990s, which helps spot long-tenured owners.

Conclusion: the free registries alone can fill the queue for Phase 1. No paid data is needed to reach 10 conversations.

## 6. Phases and unlock gates

Effort is rough engineering time for one bot working with Adam's review. All estimates are guesses (verify as work starts).

### Phase 1: Conversations (now, 2 weeks, gate: none)

Goal: 10 logged owner conversations. Builds only on PR #65.

| Feature | Data sources | Effort | Owner bot |
|---|---|---|---|
| QA and merge PR #65, set `BUY_PASSCODE` in Vercel production | None | 0.5 day | QA tests, Engineering merges (with Adam's OK) |
| Seed script: PTIN plus Comptroller join to a PR #65 CSV with `source_*` URLs | IRS PTIN FOIA, Comptroller open data | 2 days | Engineering |
| Chain and franchise filter, import dedupe on normalized name plus phone | Same | 0.5 day | Engineering |
| Fit score v0 (rules, one-line reason, new sort) | Seed fields | 1 day | Cofounder sets rules, Engineering builds |
| TSBPA firm flag (manual check field: licensed CPA firm yes/no/unknown) | TSBPA lookup by hand | 0.25 day | Engineering field, Adam or Cofounder checks |
| Call opener, voicemail and letter drafts per target (copy button, never sends) | Target record, `@anthropic-ai/sdk` already in deps, or plain templates first | 1 day | Cofounder writes scripts, Engineering builds |
| "Spoke with owner" flag on call log and a 10-conversation counter on `/buy` and `/buy/queue` | Call logs | 0.5 day | Engineering, Design for placement |
| Full JSON backup and restore (targets plus call logs) | localStorage | 0.5 day | Engineering |
| Mobile check of queue and call log (Adam calls from a phone) | None | 0.25 day | QA, Design |

Total: about 6.5 days of build, leaving a week of calling inside the 2 weeks.

### Phase 2: Pipeline (unlocks at 10 logged owner conversations)

| Feature | Data sources | Effort | Owner bot |
|---|---|---|---|
| Supabase Postgres with RLS, single-user login, migrate localStorage data | Supabase | 3 days | Engineering |
| Conversation CRM: timeline of calls, letters, meetings; AI call summary from Adam's notes; objections log | Call logs | 3 days | Engineering, Design |
| Enrichment on shortlisted firms only, with source and date per field | Apollo, Clay, Google Places API (place_id stored), SOSPortal per-entity lookups | 4 days | Engineering, Cofounder picks fields |
| Email drafts placed as Gmail drafts for Adam to send (never auto-send) | Gmail connector | 1 day | Engineering |
| Score v1 tuned on outcomes from the first conversations | Call outcomes | 1 day | Cofounder |
| TSBPA bulk list via PIA request | TSBPA | Adam files request | Cofounder drafts, Adam sends |

### Phase 3: Diligence and model (unlocks at first signed NDA, or 3 owners marked Interested)

| Feature | Data sources | Effort | Owner bot |
|---|---|---|---|
| NDA tracker and bookkeeping-firm request list | Templates | 1 day | Cofounder content, Engineering |
| Private uploads (Supabase Storage, per-deal folders) | Seller docs | 1.5 days | Engineering |
| AI extraction of P&L, tax returns and client lists into TTM with add-backs | Seller docs | 3 days | Engineering, QA checks against hand totals |
| SBA 7(a) SOP 8.1 deal model: sources and uses, 10% injection, full-standby seller note, minority equity cap, 1.25x historical DSCR, valuation gap in cash, QoE flag at $3M, no earnout | Extracted TTM, lender terms | 2 days | Cofounder formulas, Engineering, QA |

### Phase 4: LOI and close (unlocks when a deal clears 1.25x DSCR on historical numbers and a lender says the stack works)

| Feature | Data sources | Effort | Owner bot |
|---|---|---|---|
| LOI generator from the model (non-binding, attorney reviews) | Deal model | 1.5 days | Cofounder template, Engineering |
| Closing checklist (APA, consulting agreement, standby note, valuation, licensing check under Occ. Code 901.354 and 22 TAC 513) | Templates | 1 day | Cofounder, Engineering |
| Lender package export | Model and docs | 1 day | Engineering |

### Phase 5: Post-close AI ops (unlocks at first close)

| Feature | Data sources | Effort | Owner bot |
|---|---|---|---|
| Client intake and document chase agent | Firm's practice software (verify which) | 1 to 2 weeks | Engineering |
| Bookkeeping categorization assist and tax season workload board | QBO or similar | 2 weeks | Engineering, QA |
| KPI and retention dashboard, then holdco rollup across firms | Firm data | 1 week | Engineering, Design |

## 7. Phase 1 build list

In order. Each item lands as a small PR on top of PR #65 once Adam approves merging it.

1. QA PR #65 on the Vercel preview, then merge and set `BUY_PASSCODE` in production. (QA, Engineering)
2. `scripts/buy-seed`: download the IRS PTIN Texas file and query Comptroller `9cir-efmm`; filter by a ZIP list around New Braunfels; group preparers by business name; join to Comptroller on normalized name and ZIP for charter date and SOS file number; write a CSV in the PR #65 import format with `source_*` URLs. Runs locally, no scraping. (Engineering)
3. Exclude H&R Block, Jackson Hewitt, Liberty Tax and similar chains; dedupe on normalized name plus phone at import; lift or chunk the 500-row cap. (Engineering)
4. Fit score v0 shown on cards with a one-line reason. Starting rules (Cofounder will tune): tenure 15+ years from charter date; 2 to 10 preparers; CPA or EA present; not a licensed CPA firm doing attest (or unknown); has a phone; inside the radius. (Cofounder, Engineering)
5. Manual TSBPA flag field (licensed CPA firm: yes, no, unknown) with a link to the lookup. (Engineering)
6. Outreach drafts: call opener, voicemail and letter per target, with a copy button and no send path. (Cofounder scripts, Engineering)
7. "Spoke with owner" checkbox on each call log, and a counter "Owner conversations: N of 10" on `/buy` and `/buy/queue`. (Engineering, Design)
8. JSON backup and restore of all targets and call logs. (Engineering)
9. Phone-sized check of the queue and call log screens. (QA, Design)

Done means: 100 or more real, deduped targets in the desk, a scored queue, scripts ready, and the counter visible. Then Adam calls.

## 8. What the real players do

| Player | What it is | Price (third-party estimates, verify) | Lesson for Anchor |
|---|---|---|---|
| DealCloud (Intapp) | Enterprise deal CRM for PE and banks | Not published; enterprise contracts | Relationship and pipeline model is the gold standard, but far too heavy for one searcher |
| Grata (Datasite) | Private company search from website text; Datasite also bought SourceScrub in Aug 2025 and is merging it into Grata | About $15K a year basic, higher tiers more | Keyword search over the web misses tiny local firms; registries beat it for this niche |
| SourceScrub (Datasite) | Lists from conferences, directories and associations with human checks | About $20K to $60K a year | Association and directory lists matter for founder-owned firms; for Texas the IRS and state registries do this for free |
| Inven | Natural-language screening, 28M companies, one-pagers and slides | About $10K to $50K a year | Plain-language briefs and auto one-pagers are a good UX pattern for scoring explanations |
| Searcher OS and DealFlow OS type tools | Searcher-focused pipeline, CIM analysis, SBA tools | Searcher OS reported at $79 a month | Proof that a lightweight searcher stack is enough; Anchor's edge is registry sourcing plus AI ops after close |
| Affinity, Attio, HubSpot free | General relationship CRMs | Affinity about $2K per user a year; HubSpot free tier | A server CRM only matters once there are real conversations (Phase 2) |
| Long Lake, Thrive Holdings (Current), Teamshares | AI or programmatic holdcos | Not applicable | Their tooling is private. Public lesson: one niche first, one shared AI platform across every acquired firm, and retiring owners without successors as the steady source |

## 9. Risks and open questions

- Data loss: until Phase 2, all data sits in one browser. If Adam calls from his phone and edits on his laptop, they will not match. Mitigation: pick one device and use the JSON backup daily.
- PTIN business names include employers and chains, so "preparers per business" is only a rough size proxy (verify by hand on the top 30).
- Comptroller NAICS codes are sparse, so many real firms will only appear in the PTIN list.
- Sole proprietors may not appear in the franchise file at all (verify), which is another reason PTIN is the primary source.
- Owner age is not in any public registry used here. Tenure from charter date and PTIN credential age are proxies only.
- TSBPA lookup terms of use not yet read; keep checks manual until they are.
- SBA details (buyer rebate wording, consulting period, minority equity rules) must be confirmed with a lender and an SBA attorney before any LOI.
- `NORTH_STAR.md` and `.anchor/PLAYBOOK.md` are out of date for the holdco strategy and should be updated by Engineering on Adam's go-ahead.
- `crashcourse.md` is saved on the box at `/workspace/anchor/crashcourse.md` and is not yet committed to the repo (this work was read-only on GitHub).

## 10. Sources

- [PR #65 on GitHub](https://github.com/adamtpang/anchormarianas.com/pull/65)
- [IRS: PTIN information and the Freedom of Information Act](https://www.irs.gov/tax-professionals/ptin-information-and-the-freedom-of-information-act)
- [IRS: FOIA awareness for PTIN holders](https://www.irs.gov/tax-professionals/foia-awareness-for-ptin-holders)
- [Texas Comptroller: Active Franchise Taxpayers (data.texas.gov)](https://data.texas.gov/dataset/Active-Franchise-Taxpayers/9cir-efmm)
- [TSBPA License Lookup](https://www.tsbpa.texas.gov/license-lookup/)
- [TSBPA CPA Firm Lookup](https://portal.tsbpa.texas.gov/php/fpl/frmlookup.php)
- [TSBPA Public Information Act requests](https://www.tsbpa.texas.gov/pia/)
- [Texas SOS: Business Filings Bulk Order](https://www.sos.texas.gov/corp/bulk-order.shtml)
- [Texas SOS: SOSDirect and SOSPortal](https://www.sos.texas.gov/corp/sosda/index.shtml)
- [Google: Places API (New) policies](https://developers.google.com/maps/documentation/places/web-service/policies)
- [BizBuySell Terms of Use](https://www.bizbuysell.com/terms-of-use/)
- [Polsky Center: What the October 1 SBA changes mean for searchers](https://polsky.uchicago.edu/2026/10/21/what-the-october-1-sba-changes-mean-for-searchers/)
- [Prospeo: Deal sourcing platforms and pricing (third party)](https://prospeo.io/s/deal-sourcing-platforms)
- [Prospeo: Grata vs SourceScrub (third party)](https://prospeo.io/s/grata-vs-sourcescrub)
- [Inven: Inven vs Grata](https://www.inven.ai/articles/deal-sourcing-platform-comparison-inven-vs-grata)
- [Inven: Inven vs SourceScrub](https://www.inven.ai/articles/deal-sourcing-platform-comparison-inven-vs-sourcescrub)
- [Searcher OS: business acquisition software compared](https://searcheros.ai/best-business-acquisition-software)
- [DealFlow OS: DealCloud alternative for independent buyers](https://dealflow-os.com/blog/dealcloud-alternative)
- Strategy background (Long Lake, Thrive, SBA details, Texas licensing): see `crashcourse.md`.
