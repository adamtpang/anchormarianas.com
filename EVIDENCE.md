# EVIDENCE: Anchor Marianas

Updated 2026-08-25. Record only claims that can be checked from public product
artifacts or a dated private receipt.

## Baseline

| Metric | Value | Source | As of |
| --- | --- | --- | --- |
| Published example reads | 5 | `content/reads/` | 2026-08-24 |
| Live production routes checked | 5 of 5 returned HTTP 200 | Homepage, `/scan`, `/pricing`, `/audit`, `/build` | 2026-08-24 |
| Verified paid client engagements | 1 (Hilton Guam: website + gym app) | `EVIDENCE.md` client engagements | 2026-09-04 |
| Verified paid AI-implementation revenue | $0 | `OFFER.md` proof state | 2026-09-04 |
| Top constraint | No verified end-to-end scan-to-priced-report artifact | `NORTH_STAR.md` | 2026-08-24 |
| Outbound authorization | Paused | `NORTH_STAR.md` scope guard | 2026-08-24 |

## Verified results log

| Date | Change | Before | After | Evidence |
| --- | --- | --- | --- | --- |
| 2026-08-24 | Production health checked before release | Unknown current health | Five public routes returned HTTP 200 | `RUNTIME.md` verification list |
| 2026-08-24 | Local release verification | No test command, lint blocked, 17 dependency advisories | 46 tests pass with 86.67% measured line coverage; lint, type, build, entrypoint, dry-run, and dependency-audit checks pass | `package.json`, `npm run test:coverage`, `npm audit --omit=dev` |
| 2026-08-24 | Public AI route protection | Result cache only | SSRF-safe bounded fetches, bounded caches and bodies, local quotas, explicit all-environment enable flag, and Vercel WAF at 3 requests per IP per hour | `lib/server/`, Vercel rule `Protect public AI endpoints` |
| 2026-08-25 | Private Guam evidence foundation | One 1,067-row directory lead file, empty market shard folder, and scattered historical review results | 1,070 provisional business entities, exact 1,067-lead vertical report, 22 recovered raw review rows across 2 businesses, 5 separate derived reads, and 44 same-name groups flagged for resolution | Dated private `manifest.json`, `data-quality.md`, and `scripts/data-foundation/` |

## Client engagements

Recorded so that true claims stop being deleted as unsourced. This section
exists because the Hilton Guam relationship was real but undocumented, so an
audit flagged it as unverifiable and it was briefly removed from the public
site on 2026-09-04 before Adam corrected the record.

| Client | What was delivered | Paid | Public naming | Date | Confirmed by |
| --- | --- | --- | --- | --- | --- |
| Hilton Guam | A website and a gym app | Yes | Authorized by Adam | Not yet recorded | Adam, directly, 2026-09-04 |
| International Distributors, Inc. | Production website, live at `idiguam.vercel.app`, plus ongoing maintenance | No, unpaid | Authorized, named in `content/work.json` | Ongoing | `content/work.json`, live URL |

Open on this table: the Hilton engagement date, and whether payment went to
Anchor Marianas LLC or to Adam personally. Both are needed before this counts
as a fully dated receipt.

### What this does and does not prove

- Hilton was **real, paid client work**, so the public claim is accurate and
  should stay.
- It was a **website and an app**, not an AI implementation. `OFFER.md`'s
  statement that no independently verified paid Anchor *AI implementation*
  exists is therefore still accurate and is not contradicted by this row.
- Verified paid revenue **on the AI services line remains $0**. Do not merge
  these two figures.
- The gym app is currently **not mentioned anywhere on the public site**. It
  is real delivered work that is presently invisible.

## Evidence rules

- Drafted is not sent. Generated is not delivered.
- A report does not pass QA unless each factual finding has a source.
- Market-rate claims need a dated source link and a stated range.
- Proposed savings, rankings, or revenue lift are hypotheses until measured.
- Private receipts and customer records stay outside this public repository.
- After each meaningful ship, report delivery, conversation, or sale, add one
  row above.
