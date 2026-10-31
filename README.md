# Anchor Marianas

Anchor Marianas is a Guam-based AI implementation company. This repository
contains the public Next.js site, the self-serve AnchorScan diagnostic, and the
operator-run review-to-report pipeline.

The current operating sequence is:

`AnchorScan -> evidence-backed problems -> deliverable solutions -> current market rates -> quality-checked report -> authorized outreach`

The public `/scan` experience stays diagnostic. It reports observed website
patterns and useful questions without inventing ROI, prescribing a product, or
making unsupported financial claims.

## Stack

- Next.js 15, React 18, TypeScript, and Tailwind CSS
- Anthropic for hosted diagnostics
- Google Places, SerpAPI, Outscraper, Apify, or manual files for review evidence
- Vercel for production deployment
- Node's test runner and Biome for verification

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Keep `AI_PUBLIC_ENDPOINTS_ENABLED=false` unless
you intentionally want local requests to spend the configured Anthropic key.

## Verification

```bash
npm test
npm run test:coverage
npm run typecheck
npm run lint
npm run verify:next-entrypoints
npm run build
npm audit --omit=dev
```

Provider tests use mocks and do not spend external API quota.

## AnchorScan review pipeline

Dry-run the bundled sample before using a paid provider:

```bash
node scripts/anchorscan/batch-scan.mjs --leads scripts/anchorscan/leads.example.json --limit 1 --dry-run
```

Private lead files and fetched review evidence must live outside the public
repository. See `scripts/anchorscan/README.md` for the fetch, validation, and
publish workflow.

## Private buy desk

`/buy` is a private desk for sourcing acquisition targets and logging a daily
owner roll-call. It is not linked from the public navigation. Pages under
`/buy` send `noindex`, `X-Robots-Tag: noindex, nofollow`, and `robots.txt`
disallows `/buy`. The desk is also left out of the sitemap.

Set `BUY_PASSCODE` in the server environment (`.env.local` locally, or the
host's env for a preview). If that variable is missing or blank, the desk
stays closed. The passcode is checked on the server. A matching passcode sets
an httpOnly cookie signed with HMAC. The passcode is not a `NEXT_PUBLIC_`
variable and is not written into the client bundle.

Targets, call notes, and follow-up dates are stored in this browser's
`localStorage` under `anchor-buy-desk-v1`. They stay on this device. There is
no database behind the desk. Do not commit real owner data. The only rows in
the repository are fictional samples labeled `(FAKE)`, with 555 phone numbers
and example.com sites.

The public pre-purchase review report now lives at `/check`. Its API remains
`/api/buy`.

```bash
# Add a long passcode to .env.local, then:
npm run dev
```

Open `http://localhost:3000/buy`, enter the passcode, and use the sample rows
or import a CSV. Column names are listed on `/buy/import`. A sample file is at
`content/buy/sample-targets.csv`. Calls are placed only when you tap a `tel:`
link. The desk does not send calls, texts, or email.

## Hosted AI security

The public `/api/scan`, `/api/audit`, and `/api/build` routes fail closed in
every environment unless `AI_PUBLIC_ENDPOINTS_ENABLED=true`. In hosted
environments, enable them only after a durable WAF rate limit is active. These
routes also use bounded request bodies and caches, per-instance quotas,
concurrency limits, and SSRF-safe site fetching.

The separate `/api/anthropic` proxy is private. It requires both
`ANTHROPIC_API_KEY` and `ANTHROPIC_PROXY_SECRET`, plus a matching
`x-anchor-proxy-secret` request header. Leave the proxy secret unset to keep it
disabled.

## Operating documents

- `NORTH_STAR.md`: outcome, sequence, milestone, and scope guard
- `OFFER.md`: current offer ladder and proof state
- `RUNTIME.md`: keys, deployment, and production verification
- `EVIDENCE.md`: dated, checkable results only
- `company/ORGANIZATION.md`: ownership and department responsibilities
- `CLAUDE.md`: live provider-neutral handoff

Never commit prospect data, outbound drafts, customer records, reviewer text,
runway notes, or private application material to this public repository.
