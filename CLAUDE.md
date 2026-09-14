# CLAUDE.md: Anchor Marianas live handoff

Updated 2026-08-25. This file is the source of truth for Claude, Codex, and
humans working in this repository.

## Current local task, 2026-09-05

Adam requested 100/100 audit scores first, then customer-journey and design-system
improvements. The score fixes are prepared in this isolated worktree and verified
locally. See EVIDENCE.md for the prediction versus live-score boundary. Deployment
and a public rescan remain pending before the redesign. Do not mistake this work
for approval of either paid offer or permission to send messages.

## What Anchor is

Anchor Marianas is Adam Pangelinan's Guam-based AI implementation company. The
site is not primarily a portfolio. It is a scan-to-report-to-implementation
business for real local operators.

## Current operating decision

Adam set the order on 2026-08-24:

1. AnchorScan first.
2. Find problems from real evidence.
3. Find solutions Anchor can deliver.
4. Research the current market rate for those AI services or implementations.
5. Produce and quality-check the reports.
6. Send the reports and contact real businesses as soon as Adam opens outbound.

**Dentists PAUSED by Adam on 2026-09-14, later the same day.** Do not send, draft
further, or deploy anything for dentists until Adam restarts it. Reason given:
he is not passionate about the space, and is using optimism.fun to choose what
to work on next. All dentist work is preserved as-is (brief and drafts in
`context/prospects/`, BAA template, HIPAA docs, `scripts/retell/`).

The notes below describe the paused plan. Outbound was opened, per Adam on 2026-09-14. Dentists are the first buyer, ahead
of the salon, barber and plumbing prospects. Six Guam dental practices had
reviews pulled on 2026-09-14 into `.anchor/scan-raw/`. Adam still sends each
message himself or gives a per-message go; open outbound is not standing
permission for an agent to send. The separate eldercare acquisition thesis is
still paused for this workstream.

Dentist offer, approved by Adam on 2026-09-14: the lead is phone coverage
(missed-call text-back plus after-hours AI answering), priced at $500 setup plus
$300 a month for a single-location practice, with a free 30-day pilot for the
first three. The Review Responder is an add-on only for dentists, because public
review replies are a HIPAA risk. Do not add this price to `content/services.json`
or sell it live until Anchor has a business associate agreement template and
BAA-covered SMS and model vendors. Brief and drafts:
`context/prospects/dentists-2026-09-14.md` (gitignored). BAA template:
`legal/BAA-TEMPLATE.md`, pending lawyer review. Vendor stack and setup
checklist: `context/claude/HIPAA-VENDOR-SETUP.md` (gitignored). The chosen
stack routes all patient data through one vendor, Retell AI.

## Current state

- Production host: `https://anchormarianas.com`, Vercel project
  `anchormarianas.com`.
- Production branch: GitHub `main` through the Vercel Git integration.
- The self-serve `/scan` route is intentionally diagnostic. It reads the site,
  returns observations and questions, and does not invent financial claims or
  recommend products.
- The deeper operator-run AnchorScan pipeline can pull reviews from Google
  Places, SerpAPI, Outscraper, Apify, or a manual file.
- A batch fetcher exists at `scripts/anchorscan/batch-scan.mjs`. It skips thin
  or failed sources instead of padding results, enforces a 125-business hard
  ceiling, and exits nonzero when every provider request fails.
- Saved evidence can flow directly into `publish-read.mjs --raw` without a
  second provider call. Wrong-business and stale evidence stops the pipeline.
- The local suite has 49 provider-free tests. Measured line coverage for the
  tested modules is 86.67% as of 2026-08-24.
- Public paid-AI routes fail closed in every environment until
  `AI_PUBLIC_ENDPOINTS_ENABLED=true`. Production and Preview must also keep the
  Vercel WAF rate-limit rule enabled.
- Private lead files, prospect dossiers, outbound drafts, and runway notes do
  not belong in this public repository. The relevant paths are ignored.
- A reproducible private data foundation now separates business entities, raw
  reviews, derived diagnostics, legacy heuristics, and future problem patterns.
  The 2026-08-25 build reconciles the exact 1,067 source leads to 1,070
  provisional entities because three review-backed businesses were absent.
- Historical local session evidence recovered 22 Apify review rows across two
  businesses. There are no fresh review rows, no Place IDs, and 44 same-name
  identity groups still require Place ID or human resolution.
- The current Apify account is blocked at $5.52 of a $5 free limit until
  2026-09-07. Starter is the only justified paid tier for the planned data run;
  Scale is not economical at this volume. No subscription change has been made.
- A Direction A landing-page redesign is implemented on
  `codex/beautify-direction-a`. It uses an outcome-first hero, immediate proof,
  one connected Read/Find/Ship model, and the existing verified offer data.
  It has not been pushed or deployed.

## Doctrine, local only

If `HANDOFF_FROM_MONEYMETA_DOCTRINE.md` exists in this checkout (it is
gitignored, so it may not), read it once. It is Naval's *How to Get Rich* and
*The Book of Elon* quoted verbatim, distilled to the rules both agree on, and
mapped row by row onto this repo. It does not change the operating decision
above; it explains what the pause is waiting on.

`HANDOFF_FROM_MONEYMETA_FORBES_ORIGINS.md`, also local only: all 3,000 Forbes
billionaires' origins (2026-09-14 pull), with the services fortunes that
productized (HCL, Paychex, Allegis, Infosys) as the pattern for this menu.

## Binding constraint

There is not yet one verified end-to-end report that starts with fresh business
data and ends with sourced problems, deliverable solutions, current market-rate
comparisons, and a human quality check. Building and approving that reference
report is the next product milestone. Sending begins after Adam authorizes it.

## Commands

```bash
npm ci
npm test
npm run test:coverage
npm run typecheck
npm run lint
npm run verify:next-entrypoints
npm run build
node scripts/anchorscan/batch-scan.mjs --leads scripts/anchorscan/leads.example.json --limit 1 --dry-run
```

## Testing

- Framework: Node's built-in test runner with `tsx` for TypeScript modules.
- Command: `npm test`.
- Coverage: `npm run test:coverage`.
- Provider tests mock every network request. They do not spend API quota.

See `RUNTIME.md` for keys, deployment, and production verification.

## Evidence rules

- A drafted message is not a send.
- A generated report is not delivered until a human checks every claim.
- A listing fact is not a review finding.
- A proposed implementation is not market-priced until live sources are dated
  and linked.
- A test or self-payment is not stranger revenue.
- After each meaningful ship or customer action, update `EVIDENCE.md`.
