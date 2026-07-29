# Anchor Marianas: Website UI kit

High-fidelity recreation of [anchormarianas.com](https://anchormarianas.com), built as a click-thru React + Babel prototype that loads from a single `index.html`. Drop-in components for assembling new pages in the same visual language.

## What's here

| File | What it is |
|---|---|
| `index.html` | The entry. Sets `<html class="dark">`, mounts `<App />`. Loads `colors_and_type.css` + `styles.css`. |
| `styles.css` | UI-kit-scoped CSS (header chrome, section rhythm, buttons, empty state, footer). Sits on top of the project-root `colors_and_type.css`. |
| `App.jsx` | Composes the kit. Holds `theme` + `route` state. Theme toggle swaps `<html>` class between `light` and `dark`. |
| `Header.jsx` | Sticky 56px blurred header. Wordmark + nav + theme toggle + Book CTA. |
| `Hero.jsx` | Eyebrow / bilevel headline / lede / pill CTA + secondary text link. |
| `OfferSection.jsx` | Step 1 untangling call + Step 2 the 5-day build, 2-up. |
| `SprintRun.jsx` | The `01 / 02 / 03` ordered list in mono numerals. |
| `Audience.jsx` | Who this is for + What you bring, 2-up. |
| `FinalCTA.jsx` | Centered closing panel. |
| `Footer.jsx` | Hairline footer with brand block + nav + socials. Inline lucide-equivalent SVGs (Twitter / Github / Mail). |
| `TrustStrip.jsx` | Client logo + wordmark row. Hilton Guam lives here as the proof point. |
| `CaseStudyCard.jsx` | Reusable case-study unit: logo / client / knot / cure / after-read / status. Used inline on home + listed on `/work`. |
| `Testimonial.jsx` | Big italic pull-quote with attribution chip. Default is the verified chovin quote. |
| `AboutView.jsx` | The `/about` page recreated as a route. |
| `WorkView.jsx` | The `/work` page recreated as a route. |
| `Sonar.jsx` | The sonar-pulse mark, reusable. |

## Click-thru behavior

- The header **Work** and **About** links swap the visible view in-place (no URL change: this is a prototype).
- The **theme toggle** swaps light ↔ dark. Default is dark, matching production.
- **Book the call** and external social links open in a new tab to `cal.com/adampang/discovery` (the real URL from `content/site.json`).
- The hero secondary link and the footer **Work** link both navigate to the Work view.

## Mapped to source

Component-by-component, this is the live site:

| Kit component | Source file in repo |
|---|---|
| `Header.jsx` | `components/header.tsx` |
| `Footer.jsx` | `components/footer.tsx` |
| `Hero.jsx` + `OfferSection.jsx` + `SprintRun.jsx` + `Audience.jsx` + `CaseStudyCard.jsx` + `Testimonial.jsx` + `TrustStrip.jsx` + `FinalCTA.jsx` | `app/page.tsx` |
| `AboutView.jsx` | `app/about/page.tsx` |
| `WorkView.jsx` | `app/work/page.tsx` |
| `styles.css` | `app/globals.css` + `tailwind.config.js` |

## What's intentionally **not** recreated

- `/scan`: the AnchorScan diagnostic flow has its own page and a server route. Out of scope for the marketing kit.
- shadcn/ui primitives: the live site imports a wide set of Radix-based components but uses very few. Re-implementing them as static UI here would add noise. The four primitives the marketing site actually uses (button, badge, card, divider) are inlined into `styles.css`.
- Mobile-nav drawer: the production site has a sheet-based mobile nav at `<md`. The kit collapses to a single row at all sizes for clarity.
- Framer Motion + `motion-wrapper.tsx`: production uses minimal scroll-in motion. Replaced here with a simple `fadeInUp` CSS keyframe on first section render.

## Sizing

`<html class="dark">` is the default. The site is single-column up to `max-w-3xl` (768px) for prose and `max-w-5xl` (1024px) for the header/footer rail. Hero is `pt-32 pb-24` on desktop. There is no breakpoint above `sm:` (640px), so the layout reads identically up to ultra-wide.
