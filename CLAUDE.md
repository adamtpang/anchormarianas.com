# CLAUDE.md - anchormarianas.com

Context for Claude Code, Codex, and humans working in this folder.

## What this is

This handoff was generated on 2026-07-07 so every top-level Codex project under
`C:\Users\adamp\OneDrive\Aether` has both `CLAUDE.md` and `AGENTS.md`.

No richer Claude handoff was found here during the workspace sync. Treat this file
as a starting point, then inspect the actual code and docs before making changes.

## Detected project facts

- Workspace folder: `anchormarianas.com`
- Git repository: yes
- `package.json`: yes
- Detected stack: Next.js, React, Tailwind, TypeScript, package "my-v0-project"
- Existing context-like files: claude.txt, README.md, readme.md
- Notable top-level files: .env.example, .gitignore, claude.txt, next-env.d.ts, next.config.js, package-lock.json, package.json, postcss.config.js, README.md, tailwind.config.js, tsconfig.json, tsconfig.tsbuildinfo

## 2026-07-07 Vercel Shipyard context

This context was transferred from the `vercel` estate workspace after Adam audited
his Vercel account and explored a domain/name for a Vercel-facing proof-of-work
hub.

### Strategic direction

- Use Anchor Marianas as the parent brand and create a shipyard-themed hub for
  Adam's Vercel-built tools.
- Preferred canonical home: `shipyard.anchormarianas.com`.
- Good fallback route if subdomain setup is annoying: `anchormarianas.com/shipyard`.
- Page/product name: **Vercel Shipyard**.
- Avoid `vercel.anchormarianas.com` as the canonical host because it can look too
  official/confusing. Keep "Vercel" in the page title and copy instead.
- Hero positioning:
  - "44 internet tools shipped on Vercel from Guam, APAC, and Network School."
  - Alternative: "A living proof-of-work portfolio by Adam Pang / Anchor
    Marianas."
- This should support Adam's goal of getting a remote job with Vercel, showing
  APAC/Network School presence, and creating a natural reason to befriend/work
  with Guillermo Rauch and Peter Steinberger.

### Vercel estate snapshot to import

- Source snapshot date: 2026-07-07.
- Vercel team: `adamtpangs-projects`.
- Snapshot counts from `C:\Users\adamp\OneDrive\Aether\vercel\vercel-estate.html`:
  94 projects, 64 domains, 44 live projects, 46 scratch projects, 3 broken
  projects, 45 live domains, 18 dead domains, 1 wrong-domain item.
- The actual dashboard HTML has been copied into this repo at
  `context/claude/vercel-estate-dashboard.html`.
- The action checklist for getting down domains back up lives at
  `context/claude/vercel-resurrection-list.md`.
- Cost warning from the audit: 12 dead auto-renewing domains cost about
  `$309.48/year`.
- `300words.app` was reportedly reattached after the snapshot and verified live
  at HTTP 200, so the HTML estate snapshot may be stale for that one domain until
  refreshed.

### Hub content concept

- Build a dense, polished directory of the 44 live tools rather than a generic
  portfolio page.
- Group tools by intent:
  - Network School / APAC civic tools: `nslist.app`, `nsmarket.app`,
    `townhall.town`, `conjecture.school`, `wonderhall.live`, `interneta.world`.
  - Shipping / business / growth tools: `sitefast.pro`, `sellsniper.com`,
    `asap.deals`, `vitals.run`, `8020.best`, `archimedes.life`.
  - Markets / capital / talent: `moneymeta.fun`, `darktalent.tech`,
    `skillmarketcap.com`, `countriesmarketcap.com`, `iron.credit`.
  - Culture / media / personal internet: `pangaea.blog`, `strummer.fun`,
    `summon.guide`, `pokedex.life`, `sprite.email`, `youchop.app`.
- The page should feel like a working shipyard: shipped tools, live links, status
  badges, project cards, proof metrics, and a clear "talk to me / hire me /
  Vercel should hire me" path.

### Relevant owned domains for redirects/sections

- `sitefast.pro` - strongest existing "I ship fast" domain.
- `crucible.camp` - builder arena / proof-of-work energy.
- `vitals.run` - serious ops/tooling suite energy.
- `iscout.tools` - already a tools-oriented proof point.
- `themain.quest` - good narrative wrapper for the career mission.
- Orphan/dead domains that could be resurrected as themed entrances to the hub:
  `thedojo.fun`, `worthy.quest`, `legends.guide`, `thegreats.fun`,
  `problemindex.fun`, `nskpi.com`.

### Naming decisions already explored

- Adam liked "Ship or Die", but `ship-or-die.com` and `shipordie.com` were not
  available on Vercel.
- Good available paid options found earlier: `shipordie.tools`,
  `ship-or-die.tools`, `ships.tools`, each `$17.99` for 1 year.
- Under-`$10` options with Vercel in the name were available, including
  `madewithvercel.dev`, `shipwithvercel.dev`, `builtwithvercel.dev`,
  `vercelfoundry.dev`, and `vercelshipyard.dev`, all `$9.99` for 1 year.
- Current preference: do not buy a new domain yet; put the concept under
  `anchormarianas.com` as `shipyard.anchormarianas.com`.

### Immediate implementation notes

- Inspect the existing Next.js app before changing UI. This repo already had a
  "personal holding company / 100 apps" direction, so the shipyard should extend
  that rather than replace it blindly.
- Good likely implementation path:
  1. Add a `/shipyard` route or page section.
  2. Create/update Vercel domain config so `shipyard.anchormarianas.com` routes
     to that page.
  3. Import the live-project list from the Vercel estate snapshot or regenerate it
     from Vercel before launch.
  4. Attach/redirect resurrected orphan domains into relevant sections once the
     hub exists.

## How to keep this useful

- If you learn the product purpose, stack, run commands, deployment target, or open
  tasks, update this file.
- Keep `AGENTS.md` synchronized with this file so Codex sessions have the same
  context inline.
- Prefer concrete project facts over generic instructions.

## Imported existing context

Source: `claude.txt`

```markdown
# AnchorMarianas.com Context - Session 2025-11-04

## Project Goal
Reach the "platonic ideal" of a personal holding company website - a **money-making machine** that converts visitors into customers through three revenue streams:
1. **Buy my products** (indie apps/media)
2. **Hire me** (client work/services)
3. **Invest in me** (partnerships/equity deals)

### Core Purpose
The site exists to make money for the shareholder (Adam). Every element optimized for conversion through proof, credibility, and clear CTAs.

## Research Findings: What Makes a Great Personal Holding Company Site

### Key Principles (from Indie Hackers, WPMinds, etc.)
1. **Identity Hierarchy**: YOU are the brand, not just the company name
2. **Dual Credibility**:
   - Indie projects → creativity, speed, modern tech
   - Client work → reliability, professional delivery, trust
3. **Live Proof**: Real apps people can use, not just screenshots
4. **Essential Elements**:
   - Clear hero statement (who you are, what you do)
   - Portfolio with LIVE links and context
   - About page with your story
   - Testimonials/proof with recognizable names
   - Simple navigation (<10 sec to find anything)
   - Your personality throughout

### Examples Referenced
- Pieter Levels (levels.io): $210K+/mo from laptop, portfolio of 70+ startups
- Patrick McKenzie (kalzumeus.com): Personal brand → multiple properties
- Jason Fried/37signals: Multi-product strategy (Basecamp, HEY, Once)
- **Warplabs HQ (warplabshq.com)**: Dark glassmorphic design, card-based portfolio with status badges, hover animations

## Current Site Analysis (app/page.tsx)

### What's Working ✅
- Clear value prop: "Apps & services that ship"
- 100 apps concept with visual progress indicator
- Trust strip (Network School, IDI)
- Live GitHub integration (auto-pulls projects)
- Clean, fast design matching "performance obsessed" messaging
- Good trust indicators (Lighthouse scores, delivery time)

### The Gap to Platonic Ideal ❌

1. **Identity Problem**
   - Current: "AnchorMarianas" is front and center
   - Missing: Adam Pangelinan as the personal brand
   - Fix: Add "About Adam" section or make creator more prominent

2. **Client Work Missing**
   - Current: Only Network School & IDI in trust strip
   - **MISSING: Prospera, Hilton Guam** (huge credibility!)
   - Need: Dedicated "Client Work" section with case studies
   - Need: Results, before/after, live links if possible

3. **Old Projects Not Showcased**
   - Current: Just 6 recent GitHub repos
   - Missing: Curated, deployed, LIVE apps people can use
   - Need: Mix of old classics + new experiments showing sustained execution

4. **Only Showing Indie Track**
   - Missing the professional/client work credibility track
   - Platonic ideal would show BOTH:
     * Indie Apps (100 concept) → "I ship fast and experiment"
     * Client Work (Prospera, Hilton) → "I deliver for serious clients"

## Proposed Platonic Ideal Structure

```
┌─────────────────────────────────┐
│  Adam Pangelinan               │ ← YOU are the brand
│  Building: AnchorMarianas       │ ← Studio is the vehicle
└─────────────────────────────────┘
          │
          ├─ Indie Apps (100 concept)
          │  ├─ Live demos people can try
          │  └─ GitHub repos
          │
          └─ Client Work
             ├─ Prospera (what was built)
             ├─ Hilton Guam (what was delivered)
             └─ Results/testimonials if available
```

### Recommended Page Structure
1. **Hero**: "I'm Adam. I build digital products, for myself and for clients."
2. **Trust Strip**: ADD Prospera + Hilton Guam to existing Network School/IDI
3. **Two Portfolio Sections**:
   - "Studio Apps" (100 apps concept with live, clickable demos)
   - "Client Work" (Prospera, Hilton, others with case studies)
4. **About**: Your story, why you build both indie + client work
5. **Services**: Keep current CTA structure (it's good)

## Questions to Answer Before Proceeding

1. **Prospera & Hilton Guam Details**
   - What did you build for each?
   - Any metrics/results to share?
   - Live links available?
   - Can we get testimonials?

2. **Old Projects to Revive**
   - List top 3-5 you're most proud of
   - Do they need hosting or just linking?
   - Are they still functional/deployable?

3. **Personal Brand Strategy**
   - "Adam Pangelinan / AnchorMarianas" (personal brand first?)
   - Or keep AnchorMarianas as primary with you in background?

4. **Client Work Tone**
   - Humble case studies approach?
   - Or bold "Here's what I shipped" energy?

## Current Site Config (content/site.json)
```json
{
  "studioName": "AnchorMarianas",
  "tagline": "Minimum-effective studio for internet products",
  "email": "adam@anchormarianas.com",
  "personalSite": "https://adampang.com",
  "socials": {
    "x": "https://x.com/adamtpang",
    "github": "https://github.com/adamtpang"
  },
  "trust": [
    { "name": "Network School", ... },
    { "name": "IDI", ... }
  ]
}
```

**TODO**: Add Prospera, Hilton Guam to trust array

## COMPLETED (Session 2025-11-04)
✅ Added `status` field to schema (active/beta/archived/sunset/building)
✅ Created Warplabs-inspired AppCard component with:
   - Glassmorphic backdrop effects
   - Hover animations (lift, glow, scale)
   - Status badges with color coding
   - Hero images/logos
   - Featured stats display
   - Tech topic badges
✅ Updated apps-overrides.json with rich data for all 5 apps
✅ Created placeholder SVG logos in public/apps/
✅ Enhanced homepage to use new card system

### Reference: adamtomas.fun
User's personal site is at **adamtomas.fun** (not adamtpang.com in config)

### Client Work Confirmed
- **Prospera** (need details)
- **Hilton Guam** (need details)
- **Network School (ns.com)** (already listed)
- **adapt.school** (need details)
- **weewee.com** (need details)
- **IDI** (already listed)

[truncated for handoff; inspect the source file for the full text]
```
