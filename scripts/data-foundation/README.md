# Anchor data foundation

This pipeline turns local lead metadata, recovered historical Apify review
rows, and existing derived Anchor reads into separate canonical files. Private
outputs must live outside the public repository.

## Canonical grains

- `businesses.jsonl`: one provisional entity record per source business, pending Place ID and duplicate QA.
- `reviews.jsonl`: one raw customer-review record per provider item.
- `diagnostics.jsonl`: one derived Anchor read per business.
- `problem-pattern.schema.json`: downstream contract for evidence-backed
  patterns, deliverable services, and dated market-rate sources.

Facts, heuristics, customer evidence, derived summaries, and market research
remain separate. A HOT lead is not proof of urgency. A derived observation is
not a raw review. A proposed service is not owner-confirmed demand.

## Run

```powershell
node scripts/data-foundation/build.mjs `
  --leads C:\private\guam-leads.json `
  --transcript C:\private\claude-session.jsonl `
  --reads content\reads `
  --output C:\private\anchormarianas-data
```

Outputs include raw recovered Apify datasets, canonical JSONL files, suspected
duplicate identity groups, a source manifest, a data-quality report, the exact
source leads grouped by vertical, and the reconciled canonical businesses
grouped by vertical.

## Pattern-recognition gate

A vertical-level problem should not be published unless raw evidence covers at
least ten distinct businesses in the vertical and each stated pattern cites at
least three distinct businesses. Owner confirmation and willingness to pay
remain separate later gates.
