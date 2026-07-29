# Vercel Shipyard Brief

Date: 2026-07-07

This brief transfers the Vercel estate / naming / career-pitch context from
`C:\Users\adamp\OneDrive\Aether\vercel` into the real Anchor Marianas project.

## Core Idea

Build a shipyard-themed proof-of-work hub under Anchor Marianas for Adam's
Vercel-built tools.

- Canonical URL: `shipyard.anchormarianas.com`
- Fallback route: `anchormarianas.com/shipyard`
- Page/product title: **Vercel Shipyard**
- Parent brand: Anchor Marianas
- Principal: Adam Pang / Adam Pangelinan

Do not use `vercel.anchormarianas.com` as the canonical hostname. It risks
looking official or trademark-confusing. Keep "Vercel" in the page title and
copy, and use the Anchor Marianas domain as the owned container.

## Why This Fits Anchor Marianas

The naming has a tight metaphor:

- Anchor Marianas: place, trust, APAC/Guam roots.
- Shipyard: a place where ships are built, repaired, launched.
- Vercel: the platform all of these internet ships launch from.

This is better than buying a new domain because it compounds the existing Anchor
Marianas brand and makes the APAC / Guam angle native to the project.

## Strategic Goal

Use the hub to support Adam's goal of getting a remote job with Vercel and
building real relationships with Vercel people including Guillermo Rauch and
Peter Steinberger.

The pitch is not "please hire me." The pitch is:

> I have already been living the Vercel worldview: prolific shipping, fast
> iteration, public internet tools, APAC reach, and real communities using what I
> build.

## Hero Copy

Primary:

> 44 internet tools shipped on Vercel from Guam, APAC, and Network School.

Supporting:

> A living proof-of-work portfolio by Adam Pang / Anchor Marianas.

Other usable lines:

- A shipyard for internet products.
- Built in the Marianas. Launched on Vercel.
- Every card is live. Every project is a shipped artifact.
- Useful internet tools for communities, markets, creators, and operators.

## Vercel Estate Snapshot

Source artifact:

- `C:\Users\adamp\OneDrive\Aether\vercel\vercel-estate.html`
- Local copy in this repo:
  `context/claude/vercel-estate-dashboard.html`
- Action checklist for getting down domains back up:
  `context/claude/vercel-resurrection-list.md`

Snapshot facts:

- Date: 2026-07-07
- Vercel team: `adamtpangs-projects`
- Projects: 94
- Domains: 64
- Live projects: 44
- Scratch projects: 46
- Broken projects: 3
- Live domains: 45
- Dead domains: 18
- Wrong-content domain: 1
- Dead auto-renewing domains: 12
- Estimated wasted renewal spend: `$309.48/year`

Important stale-snapshot note:

- `300words.app` was reportedly reattached after the snapshot and verified live
  at HTTP 200, so the estate dashboard may be stale for that domain until
  refreshed.

## Tool Categories for the Hub

### Network School / APAC Civic Tools

- `nslist.app`
- `nsmarket.app`
- `townhall.town`
- `conjecture.school`
- `wonderhall.live`
- `interneta.world`

Narrative: tools for Network School, network states, APAC communities, and civic
coordination.

### Shipping / Business / Growth Tools

- `sitefast.pro`
- `sellsniper.com`
- `asap.deals`
- `vitals.run`
- `8020.best`
- `archimedes.life`

Narrative: practical tools for operators, founders, sales, websites, and
leverage.

### Markets / Capital / Talent

- `moneymeta.fun`
- `darktalent.tech`
- `skillmarketcap.com`
- `countriesmarketcap.com`
- `iron.credit`

Narrative: market maps, capital tools, talent discovery, and economic
interfaces.

### Culture / Media / Personal Internet

- `pangaea.blog`
- `strummer.fun`
- `summon.guide`
- `pokedex.life`
- `sprite.email`
- `youchop.app`

Narrative: creative internet, media tooling, email, social graphs, and personal
knowledge.

## Existing Domains That Fit the Shipyard Story

Good existing domains to feature or redirect into sections:

- `sitefast.pro` - strongest "I ship fast" domain.
- `crucible.camp` - builder arena / proof-of-work energy.
- `vitals.run` - serious ops/tooling suite energy.
- `iscout.tools` - existing tools-oriented proof point.
- `themain.quest` - narrative wrapper for the career mission.

Orphan/dead domains that could be resurrected as entrances into hub sections:

- `thedojo.fun`
- `worthy.quest`
- `legends.guide`
- `thegreats.fun`
- `problemindex.fun`
- `nskpi.com`

## Domain Naming Work Already Explored

Adam liked "Ship or Die", but:

- `ship-or-die.com` is not available.
- `shipordie.com` is not available.

Available paid options checked earlier:

- `shipordie.tools` - `$17.99` for 1 year.
- `ship-or-die.tools` - `$17.99` for 1 year.
- `ships.tools` - `$17.99` for 1 year.

Under-`$10` Vercel-name options checked earlier:

- `madewithvercel.dev` - `$9.99`.
- `shipwithvercel.dev` - `$9.99`.
- `builtwithvercel.dev` - `$9.99`.
- `vercelfoundry.dev` - `$9.99`.
- `vercelshipyard.dev` - `$9.99`.

Current preference:

- Do not buy a new domain yet.
- Use `shipyard.anchormarianas.com`.
- Use "Vercel Shipyard" as the page title and narrative.

## Implementation Direction

This repo already has a personal holding company / 100 apps direction. The
shipyard should extend that strategy instead of replacing it blindly.

Recommended implementation order:

1. Inspect existing `app/page.tsx`, content config, and current card system.
2. Add a `/shipyard` route or section.
3. Build a dense, polished directory of live tools:
   - Status badges.
   - Live links.
   - Category filters.
   - Short descriptions.
   - Proof metrics where available.
   - Clear call to action for Vercel / hiring / partnerships.
4. Configure `shipyard.anchormarianas.com` to route to the hub.
5. Refresh the Vercel estate data from live Vercel state before launch.
6. Attach/redirect resurrected orphan domains into the relevant shipyard
   sections once the hub exists.
7. Use `context/claude/vercel-resurrection-list.md` as the operating checklist
   for which domains need Vercel attachment vs. external registrar DNS work.

## Design Notes

The page should feel like a working shipyard, not a marketing landing page:

- Dense but polished.
- Real tools above decorative copy.
- Cards should contain live URLs, status, purpose, and evidence.
- Use Anchor Marianas maritime semantics sparingly: docks, launches, fleet,
  vessels, yard, manifest.
- Avoid heavy novelty. The credibility comes from shipped artifacts.

## Risks / Guardrails

- Do not make the domain or page look like an official Vercel property.
- Avoid overusing "Vercel" in ways that imply affiliation. "Made with Vercel" and
  "shipped on Vercel" are cleaner than "Vercel tools" or `vercel.*` hostnames.
- Verify live project/domain state before publishing claims like "44 tools."
- Some domains in the estate snapshot are stale or dead; do not blindly present
  all 94 projects as successful shipped work.
