---
name: anchor-marianas-design
description: Use this skill to generate well-branded interfaces and assets for Anchor Marianas, the one-person AI build studio operated by Adam Tomas Pangelinan from Guam, for production or for throwaway prototypes, mocks, decks, and marketing surfaces. Contains the brand's tone-of-voice rules, color system (dual light/dark themes: warm cream + navy ink, abyssal + bioluminescent teal), Inter / Instrument Serif / Geist Mono type stack, logo and founder assets, verbatim site copy, and a high-fidelity React UI kit of the marketing site for assembling new pages.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Pull copy from `content/site.json` and `content/services.json`. They are the source of truth. Lift exact phrasing from the quoted "Content fundamentals" examples in the README rather than rewriting them.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand. The colors_and_type.css file is drop-in for any HTML/React project. The UI kit components under `ui_kits/website/` are JSX components ready to lift.

If the user invokes this skill without any other guidance, ask them what they want to build or design (a deck? a one-page landing? a case-study writeup? an interactive prototype?), ask some short follow-up questions about audience and length, and then act as an expert designer who outputs HTML artifacts *or* production code depending on the need.

The non-negotiables when designing for Anchor:
- Sentence case everywhere. The tagline is literally `we ship.` lowercase.
- One accent color per screen (teal in dark, navy ink in light).
- Single centered column, `max-w-3xl`, hairline dividers, not multi-card dashboards.
- No emoji, no gradients (except the near-invisible `depth-veil` radial), no bouncy motion.
- The anchor logo is electric indigo `#4301ff`, used at small sizes only, never as a decorative giant.
- Hero serifs are Instrument Serif. Body and UI are Inter. Numerals and coordinates are Geist Mono.
