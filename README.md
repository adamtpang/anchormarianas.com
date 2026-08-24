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

## Hosted AI security

The public `/api/scan`, `/api/audit`, and `/api/build` routes fail closed in
hosted environments unless `AI_PUBLIC_ENDPOINTS_ENABLED=true`. Enable them only
after a durable WAF rate limit is active. These routes also use bounded request
bodies and caches, per-instance quotas, concurrency limits, and SSRF-safe site
fetching.

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
