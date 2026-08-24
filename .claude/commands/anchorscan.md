---
description: Run AnchorScan on a Guam business. Pull its Google reviews and produce a diagnostic report (observations + questions), read-only.
argument-hint: <business name + city, Place ID, or Google Maps URL>
---
Run AnchorScan for: **$ARGUMENTS**

Stay read-only: fetch and diagnose reviews, never contact the business or change
an external system.

Steps:

1. **Choose the source.** Prefer a direct Google Place ID when available. Select
   `google`, `serpapi`, `outscraper`, `apify`, or a verified manual review file.

2. **Read the method and schema.** Read `scripts/anchorscan/diagnose.md` and
   `scripts/anchorscan/report.schema.json`.

3. **Run the guarded CLI.** Use
   `node scripts/anchorscan/scan.mjs "$ARGUMENTS" --source <source>`. For a
   manual source, add `--file <private-path>`. The runner disables Claude tools,
   treats review text as untrusted, validates the model output, and writes the
   private report under `reports/anchorscan/`.

4. **Human-check and show.** Verify the business identity, source, and every
   evidence statement before showing the report. Do not publish or send it.

For quota-safe batch fetching, use `batch-scan.mjs` with a private JSON lead
file, then pass each saved raw file to `publish-read.mjs --raw`. Follow the
current Anthropic terms for the account and surface you use. Hosted customer
traffic must use `ANTHROPIC_API_KEY`, never an interactive account credential.
