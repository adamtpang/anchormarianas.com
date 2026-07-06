# AnchorScan v1

Reads a Guam business's real Google Maps reviews and produces a **diagnostic** report: observations (each backed by a real quote), the questions worth answering, and one focus. Diagnostic, not prescriptive. No invented dollar figures.

Built as a self-run Claude agent loop so it is fuelled by your own Claude subscription, not a hosted tool's usage credits. It is the top-of-funnel for Anchor's diagnose-and-cure motion on Guam.

## The two ways to run it

**Interactive (one business, fuelled by your subscription):**
In Claude Code, type `/anchorscan Dusit Beach Resort Guam, Tumon`. It runs inside your session, so your Max plan covers it. Best surface for one-off scans and demos.

**Headless batch (many businesses, scheduled):**
```
node scripts/anchorscan/scan.mjs "Dusit Beach Resort Guam, Tumon" --source google
node scripts/anchorscan/scan.mjs --batch scripts/anchorscan/leads.example.csv
node scripts/anchorscan/scan.mjs "Some Cafe" --source manual --file reviews.txt
```
`scan.mjs` shells out to the `claude` CLI (`claude -p`), so it draws from the plan you are logged into. Schedule it with Windows Task Scheduler (or cron) to scan a leads list overnight.

## Pieces

| File | What it does |
|---|---|
| `fetch-reviews.mjs` | Swappable reviews source: `google` (Places API New, ~5 reviews), `serpapi` (needs a Place ID), `outscraper` (by name), `manual` (paste). Read-only. |
| `diagnose.md` | The read-only diagnosis method (the prompt). |
| `report.schema.json` | The typed report shape. |
| `render.mjs` | Report JSON to branded Markdown. |
| `scan.mjs` | Headless batch runner (`claude -p`). |
| `leads.example.csv` | Example batch list (`name,location,place_id,source`). |

## Keys (env, all optional)

- `GOOGLE_PLACES_API_KEY` for `--source google` (default; enable "Places API (New)").
- `SERPAPI_API_KEY` for `--source serpapi` (free tier ~250 searches/mo).
- `OUTSCRAPER_API_KEY` for `--source outscraper` (first ~500 records free).
- `DISCOVERY_CALL_URL` to override the booking link in the rendered report.

No key is needed for `--source manual`. Reports land in `reports/anchorscan/` (gitignore that folder if you want to keep client data local).

## The subscription vs API-key line (important)

Your Claude subscription may fuel only **your own** work under **your own** account: interactive `/anchorscan`, and (in the current paused-billing state) your own headless `scan.mjs` runs. The instant AnchorScan is **resold** or run **on behalf of a paying client**, that surface must use an Anthropic API key (`ANTHROPIC_API_KEY`) under the Commercial Terms. Never point a client-facing service at your subscription. See `context/claude/decisions-log.md` for the full orchestrator decision.

## Next steps (when you outgrow v1)

- Wrap `fetch-reviews.mjs` as an MCP server so the agent calls it as a tool (and a write-capable "cure" subagent can be added alongside the read-only diagnostician).
- Graduate the batch runner to a durable engine (Trigger.dev v4 self-hosted) once runs get long or need a human-approval gate before a cure fires.
