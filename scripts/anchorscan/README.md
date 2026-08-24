# AnchorScan operator pipeline

AnchorScan reads a business's real Google Maps reviews and produces a diagnostic
report: evidence-backed observations, questions worth answering, and one focus.
It does not invent financial value or prescribe an implementation.

## Single-business run

```bash
node scripts/anchorscan/scan.mjs "Business Name, Guam" --source serpapi
node scripts/anchorscan/scan.mjs "Business Name" --source manual --file C:/private/reviews.txt
```

The runner uses the locally authenticated Claude CLI with tools and slash
commands disabled. Output is validated before JSON and Markdown are written to
the ignored `reports/anchorscan/` directory.

## Quota-safe batch to published read

Keep the real lead file outside this public repository. Start with the bundled
non-real example:

```bash
node scripts/anchorscan/batch-scan.mjs --leads scripts/anchorscan/leads.example.json --limit 1 --dry-run
```

Then run a private batch and publish directly from its saved evidence:

```bash
node scripts/anchorscan/batch-scan.mjs --leads C:/private/guam-leads.json --tier HOT --limit 10 --source serpapi
node scripts/anchorscan/publish-read.mjs --raw .anchor/scan-raw/business-guam.json
```

The batch runner:

- enforces a 125-business ceiling and an exclusive batch lock;
- rejects duplicate slugs before using provider quota;
- skips current published reports and fresh complete or thin checkpoints;
- validates returned business identity;
- writes raw evidence atomically under the ignored `.anchor/scan-raw/` path;
- exits nonzero if no publishable evidence was produced.

Raw checkpoints expire after 30 days for deduplication. Invalid, incomplete,
stale, or wrong-business evidence never suppresses a fresh provider fetch.

The publisher treats review text as untrusted, disables Claude tools, ignores
model-supplied identity and counts, validates the diagnostic contract, and
refuses to replace an existing published read without `--overwrite`.

## Files

| File | Purpose |
| --- | --- |
| `fetch-reviews.mjs` | Normalizes Google Places, SerpAPI, Outscraper, Apify, or manual evidence. |
| `diagnose.md` | Read-only diagnostic method. |
| `report.schema.json` | Diagnostic output shape. |
| `report-validation.mjs` | Rejects unsafe model output and builds trusted records. |
| `scan.mjs` | Single-business or CSV operator runner. |
| `batch-scan.mjs` | Quota-capped raw-evidence fetcher for a private JSON lead file. |
| `publish-read.mjs` | Creates a checked public read from fresh or saved evidence. |
| `render.mjs` | Renders a private diagnostic as Markdown. |

## Environment keys

- `GOOGLE_PLACES_API_KEY`
- `SERPAPI_API_KEY`
- `OUTSCRAPER_API_KEY`
- `APIFY_API_TOKEN`
- `DISCOVERY_CALL_URL` to override the rendered booking link

Manual review files need no provider key. SerpAPI name lookup normally uses one
search to select a matching place and another to retrieve reviews. A direct
Place ID removes the name-selection step and its ambiguity.

Follow the current Anthropic terms for the account and surface you use. The
local operator scripts may use the locally authenticated CLI. Customer-facing
hosted traffic must use `ANTHROPIC_API_KEY`, never an interactive credential.

## Human gate

Generated is not approved. Before publication or delivery, a human must verify
the business identity, retrieval date, source, and every factual or quoted
claim. Outreach remains a separate authorized step.
