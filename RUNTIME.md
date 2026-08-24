# RUNTIME: Anchor Marianas

Updated 2026-08-24.

## Workspace

- Repository: `https://github.com/anchormarianas-com/anchormarianas.com`
- Framework: Next.js 15, React 18, TypeScript, Tailwind CSS
- Production: Vercel project `anchormarianas.com`
- Production branch: GitHub `main`
- Canonical URL: `https://anchormarianas.com`

## Local verification

```bash
npm ci
npm test
npm run test:coverage
npm run typecheck
npm run lint
npm run verify:next-entrypoints
npm run build
```

## AnchorScan surfaces

The public `/scan` route reads a website through the hosted Anthropic API and
returns a diagnostic. It needs `ANTHROPIC_API_KEY` in Vercel. Every hosted
environment also needs `AI_PUBLIC_ENDPOINTS_ENABLED=true`, but only after
durable Vercel WAF rate limits are active for `/api/scan`, `/api/audit`, and
`/api/build`. Without that opt-in, the paid AI routes fail closed with HTTP 503.

The route rejects private and reserved network targets, validates every
redirect, pins the checked public address for the request, accepts text pages
only, and stops reading after 64 KiB. It also applies a bounded request body,
cache, per-instance quota, and concurrency backstop. Vercel WAF is the durable
per-IP protection across serverless instances.

The operator-run review pipeline supports:

- `GOOGLE_PLACES_API_KEY`: limited Google Places review set.
- `SERPAPI_API_KEY`: business-name lookup plus review retrieval, about two
  searches per business.
- `OUTSCRAPER_API_KEY`: name-based review retrieval.
- `APIFY_API_TOKEN`: deeper Google review history.
- Manual review files: no external review key.

Use a dry run before spending quota:

```bash
node scripts/anchorscan/batch-scan.mjs --leads C:/private/guam-leads.json --tier HOT --limit 10 --dry-run
```

Then fetch and publish without paying for the same reviews twice:

```bash
node scripts/anchorscan/batch-scan.mjs --leads C:/private/guam-leads.json --tier HOT --limit 10 --source serpapi
node scripts/anchorscan/publish-read.mjs --raw .anchor/scan-raw/business-guam.json
```

The publisher disables every Claude Code tool, treats review text as untrusted,
discards model-supplied identity and source fields, validates the diagnostic,
and refuses to overwrite an existing report unless `--overwrite` is explicit.

Raw fetched data belongs in `.anchor/scan-raw/`. A human must check the source
and every report claim before publication or delivery. The raw directory is
ignored by Git because it can contain prospect data and reviewer text.

SerpAPI requires its key in the request query string. Keep the key scoped and
rotatable, do not log request URLs, and set provider-side usage limits.
Name lookup validates the returned business name and location. Ambiguous or
weak matches stop and require a direct Google Place ID.

## Deployment

Normal release path:

1. Create a feature branch from current `origin/main`.
2. Run all verification commands.
3. Open a pull request into `main`.
4. Merge only after required checks pass.
5. Vercel deploys `main` through the existing Git integration.

Emergency manual deployment is `vercel --prod`, but it is not the deployment
of record and should not replace merging the verified source into `main`.

## Production verification

After merge, confirm HTTP 200 and the expected release copy on:

- `https://anchormarianas.com/`
- `https://anchormarianas.com/scan`
- `https://anchormarianas.com/pricing`
- `https://anchormarianas.com/audit`
- `https://anchormarianas.com/build`

Record the commit, PR, deployment URL, route status, and date in `EVIDENCE.md`.

## Execution adapters

Claude Code and Codex are both supported. `CLAUDE.md` is the provider-neutral
handoff. `AGENTS.md` carries the operating constraints. No adapter may send
outbound messages or make public claims without Adam's authorization.
