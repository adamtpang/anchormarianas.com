# Anchor Marianas design system

Last updated: 2026-08-25

## Design thesis

Anchor should feel like a calm technical operator from Guam, not a generic AI agency. The interface is editorial, evidence-led, and restrained. It gives the business problem more visual weight than the technology and makes the path from diagnosis to a paid build obvious.

The Direction A landing page borrows one structural lesson from realfast.ai: lead with the outcome, establish operating proof immediately, explain one connected delivery model, and only then present offers. The visual language, copy, proof standards, palette, and personality remain Anchor's own.

## Brand foundations

### Layout

- Use one centered reading column, usually `max-w-4xl`.
- Use `max-w-5xl` for the hero, proof rail, header, and footer.
- Separate sections with hairlines and generous vertical space.
- Prefer ledgers and rows to a wall of floating cards.
- Every grid track that contains copy must be allowed to shrink with `minmax(0, ...)`.

### Color

Dark mode is the default.

| Role | Dark | Light |
| --- | --- | --- |
| Background | Abyssal navy, `220 50% 4%` | Warm cream, `30 30% 97%` |
| Foreground | Cool white, `200 20% 96%` | Deep navy ink, `220 80% 8%` |
| Accent | Bioluminescent teal, `180 85% 55%` | Deep navy, `220 75% 22%` |

Use one accent per view. Gradients are reserved for the near-invisible depth veil. Borders should remain quiet until they carry interaction or meaning.

### Type

- Instrument Serif for outcome headlines and offer prices.
- Inter for body copy, navigation, and buttons.
- Geist Mono for coordinates, steps, evidence counts, and operational labels.
- Hero copy should read as two short lines whenever possible.
- Avoid em dashes, decorative quotation marks, and inflated marketing language.

### Shape and motion

- Base radius is `0.5rem`.
- Buttons may use a full pill shape.
- Cards use restrained `rounded-xl` corners and no decorative shadow.
- Motion should clarify state. Keep hover color shifts short and avoid ornamental animation.

## Landing-page anatomy

1. Outcome hero: "Find the knot. Ship the cure."
2. Verified proof rail: published reads, shipped commits, and one-operator delivery.
3. Operator promise: the person who scopes the work builds it.
4. Operating model: Read, Find, Ship.
5. Evidence ledger: published AnchorScan examples presented as diagnostics.
6. Small first cure: the review responder as a concrete entry service.
7. Problem router: common owner sentences mapped to the existing service menu.
8. Fixed-price builds: existing prices and guarantees, unchanged.
9. Evidence-first close: run AnchorScan before choosing a build.

## Components

The project now has a standard `components.json` registry configuration for shadcn. Reuse the existing local `Button`, `Badge`, and `Card` primitives, then apply Anchor tokens through `className`. Do not import a preset theme or font system over the established Anchor foundations.

Use cards only when an offer needs a bounded decision surface. Proof, process, and navigation should normally use hairline rows.

## Copy and evidence rules

- Start with the business outcome or recurring owner sentence.
- Name AI only when it helps explain the mechanism.
- Distinguish observation, question, recommendation, and verified result.
- Never convert a diagnostic observation into a revenue claim.
- Do not publish client logos, testimonials, outcomes, or metrics unless the source is verified and publication is authorized.
- Source service names, prices, timelines, and guarantees from `content/services.json`.
- Source company identity and contact links from `content/site.json`.
- Source client work from `content/work.json`.

## Verification baseline

The Direction A page was checked in a real Chromium render at 1440px and 375px in dark mode, plus 1440px in light mode. It has one H1, no horizontal overflow, no duplicate IDs, no leftover skeletons, tabular metric numerals, and WCAG AA contrast for the measured body, card, metric, and primary-button pairs.
