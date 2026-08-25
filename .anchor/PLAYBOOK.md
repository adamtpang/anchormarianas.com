# THE PLAYBOOK: scan first, send second

Updated 2026-08-24 from Adam's explicit operating decision.

## The order

1. Run AnchorScan on a real business.
2. Find only problems supported by the site, listing, or reviews.
3. Match each problem to a solution Anchor can deliver.
4. Research the current market rate for that implementation.
5. Build and human-check the report.
6. Send the report and contact the business after Adam authorizes outbound.

No step may be reordered to make a service easier to sell.

## Phase 1: build the reference report

- [ ] Select one real Guam business with fresh, accessible source data.
- [ ] Run the website diagnostic.
- [ ] Fetch real listing and review data through SerpAPI, Google Places,
      Outscraper, Apify, or a manual verified file.
- [ ] Save the raw source and retrieval date.
- [ ] List observed problems. Each problem must cite its source.
- [ ] Record questions that need the operator's answer.
- [ ] Match only deliverable solutions from `content/services.json`.
- [ ] Research a current market-rate range for every matched solution.
- [ ] State Anchor's price or `research required`.
- [ ] Human-check every claim, link, price, and business detail.
- [ ] Approve one reference report format.

## Phase 2: batch ten

- [ ] Run a dry batch before using paid quota.
- [ ] Produce ten fresh reports using the approved format.
- [ ] Skip any business with thin or conflicting evidence.
- [ ] Re-check names, websites, phones, and owners on the day of delivery.
- [ ] Log passed and rejected reports separately.

## Phase 3: outbound, currently paused

Adam has not authorized this phase yet.

- [ ] Adam reviews the ten-report batch and opens outbound.
- [ ] Send the report before or with the first contact.
- [ ] Log the time, channel, recipient, report URL, and reply.
- [ ] Reply quickly and answer questions from the evidence.
- [ ] Offer the matched implementation only if the operator agrees the problem
      is real and worth solving.

Older lead batches are private operating data and may be stale. Re-verify every
identity and contact channel from a current source before any authorized send.

## Report acceptance checklist

A report passes only if all are true:

- Business identity and contact details were checked today.
- Every problem has an exact source.
- Review findings came from real reviews, not a listing or model guess.
- Unknowns are written as questions, not conclusions.
- Every proposed solution is deliverable by Anchor.
- Every market-rate range has dated links.
- Anchor's price is labeled separately from the market range.
- No invented ROI, savings, ranking lift, or revenue projection appears.
- A human read the final report before delivery.

## Scoreboard

| Date | Fresh scans | Reports passed QA | Reports sent | Replies |
| --- | ---: | ---: | ---: | ---: |
| 2026-08-24 | 0 | 0 | 0 | 0 |

## Kill and change rules

- Do not judge the message before 20 delivered reports produce real reply data.
- Do not count a generated report as delivered.
- Stop a source if it produces conflicting identity data.
- Change the solution map when delivery evidence disproves it.
- Re-research rates before a price rise or a new service is made buyable.
