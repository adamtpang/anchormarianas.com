---
description: Run AnchorScan on a Guam business. Pull its Google reviews and produce a diagnostic report (observations + questions), read-only.
argument-hint: <business name + city, Place ID, or Google Maps URL>
---
Run AnchorScan for: **$ARGUMENTS**

You are running inside interactive Claude Code, so this is fuelled by the user's Claude subscription. Stay read-only: fetch and diagnose reviews, never take an action on any external system.

Steps:

1. **Fetch the reviews.** Run `node scripts/anchorscan/fetch-reviews.mjs "$ARGUMENTS" --source google` (swap `--source serpapi|outscraper|manual` based on which key is set). If no reviews API key is configured, tell the user and offer the manual path: ask them to paste the reviews into a file, then run `--source manual --file <path>`.

2. **Read the method and schema.** Read `scripts/anchorscan/diagnose.md` (the diagnosis rules) and `scripts/anchorscan/report.schema.json` (the output shape).

3. **Diagnose.** Produce a report object that matches the schema exactly: 3 to 4 `observations`, each with a real quote from the fetched reviews as `evidence`; 3 to 5 genuinely diagnostic `questions`; and one `focus` framed as a question. Follow diagnose.md strictly: diagnostic not prescriptive, never invent dollar figures or ROI, Anchor voice, no em dashes, no emoji.

4. **Save and show.** Write the JSON to `reports/anchorscan/<slug>-<date>.json`, then render it with `node scripts/anchorscan/render.mjs <that file>` and show the Markdown to the user.

For unattended batch scans of many businesses, use `node scripts/anchorscan/scan.mjs --batch scripts/anchorscan/leads.example.csv` (headless `claude -p`). For any client-facing or resold use, switch to an Anthropic API key. Your subscription fuels your own diagnosis and prospecting only.
