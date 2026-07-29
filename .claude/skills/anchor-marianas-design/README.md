# Anchor Marianas Design System

> *We sit with you for 30 minutes, find the knot, then ship the AI piece that unties it in 5 days.*

Anchor Marianas is a one-person AI build studio operated by **Adam Tomas Pangelinan** from **Guam (11°22′N 142°35′E)**, closer to Challenger Deep, the deepest place on Earth, than to any continent. The brand identity is built around that fact: depth, dark water, sonar, the moment a single anchor finds the bottom of an otherwise bottomless thing.

This design system gives a design or coding agent everything it needs to produce on-brand interfaces, slides and marketing surfaces for Anchor Marianas, or to be downloaded and dropped into Claude Code as a portable skill.

---

## Source material

Everything here was derived from one repository. If the reader has access, browsing it directly will produce higher-fidelity work than this packet alone:

- **Site repo:** <https://github.com/adamtpang/anchormarianas.com>: Next.js 15 + Tailwind + shadcn/ui. Live at <https://anchormarianas.com>.
- **Founder hub:** <https://adampang.com> (redirects to anchormarianas.com).
- **Sister projects (same author, same aesthetic family):** <https://summon.guide>, <https://sellsniper.com>, <https://optimism.fun>, <https://pangaea.blog>.

Imported files from that repo are preserved verbatim under `reference/` and `content/`.

---

## Index: what's in this folder

| Path | What's there |
|---|---|
| `README.md` | This file. Brand context, fundamentals, motifs. |
| `SKILL.md` | Agent-Skills-compatible frontmatter so this whole folder can be dropped into Claude Code. |
| `colors_and_type.css` | All CSS variables: colors (light + dark), type scale, spacing, shadows, sonar keyframes. Import from anywhere. |
| `assets/` | `logo-anchor.png` (the brand mark: electric indigo on transparent), `adam.jpg` (founder portrait). |
| `content/` | Verbatim JSON from the live site: `site.json`, `services.json`, `products.json`, `testimonials.json`, `assets.json`. Single source of truth for copy. |
| `reference/source-globals.css` | Original Next.js globals.css from the repo, unedited. |
| `preview/` | Self-contained HTML cards that render in the Design System tab: type specimens, palette swatches, components, the brand mark. |
| `ui_kits/website/` | High-fidelity recreation of the marketing site (hero, offer, work, about). React + Babel, click-thru prototype. |

---

## Content fundamentals: how Anchor writes

**Voice is operator-to-operator.** Lowercase, declarative, allergic to startup mush. The tagline is literally `we ship.`, period, lowercase. Headlines drop the period; subheads use it. The brand never says "innovative," "transform," "leverage," "synergy," "platform" or "solutions."

**Pronouns:** `we` for the studio (even though it's one person, Adam plus tooling), `you` for the reader. Never `our customers`, never `users`. Adam is referred to in the third person on About pages ("operated by Adam Pang") but signs in the first person elsewhere.

**Signature metaphors:**
- **The knot**: the one recurring loop quietly tangling the other twelve. ("we find the knot")
- **The cure**: the smallest version of the build that actually unties the knot.
- **5 days**: the unit of work. Not "weeks," not "a sprint." 5 days.
- **Untangling call**: the 30-minute discovery. Never "discovery call." Never "intro."
- **The Rick Rubin model**: sit with the artist, find the thing, then ship.
- **Anchor / depth / Challenger Deep / sonar**: the place metaphor. Guam, 11°22′N 142°35′E, the trench.

**Casing:** Sentence case in body and headings. UPPERCASE-WITH-WIDE-LETTER-SPACING for eyebrows only. Title Case is avoided.

**Numbers:** Always with `$` and digits: `$500 flat`, `$5,000 + $500/mo`, `100 apps`, `5/5 stars or full refund`. Coordinates in monospaced numerals with the degree sign: `11°22′N 142°35′E`.

**Punctuation:** No em dashes, ever. This is an absolute brand rule and it overrides any older copy that still uses them. Replace an em dash with a period when it joins two separate micro-statements, a comma or parentheses for an aside, a colon before an explanation, and the word "to" for a numeric range. Periods at the end of micro-statements: `30 minutes. Free. The call is the work.`

**No emoji** in production marketing copy. (The repo's earlier `100 apps` iteration used emoji as project-completeness markers. That has been retired. Don't reintroduce emoji.) No icons-as-bullets. No exclamation marks.

**Specific examples, copy lifted verbatim from the live site:**

> "We sit with you for 30 minutes, find the knot, then ship the AI piece that unties it in 5 days."

> "Anchor Marianas builds with founders, creators, and operators whose work we respect. One at a time. The call is the work, not a sales qualifier."

> "If it's not a fit, we say so on the call. No follow-up. No nurture sequence."

> "First pilots are free in exchange for permission to publish the case study. After that, $500 flat. Refund if it doesn't work."

> "If you're on our Dream 25 list, you know. If not, this page is mostly here so the people we're working with have something to point at."

> "Closer to Challenger Deep, the deepest place on Earth, than to any continent."

**Anti-patterns to never produce:** "transform your business with AI," "10x your productivity," "AI-powered solutions," "join hundreds of forward-thinking founders," anything in title case ending in a colon, anything with the word "innovative."

---

## Visual foundations: the aesthetic in one paragraph

Editorial. Think **Stripe Press paperback** (light theme) and **bathysphere instrument panel** (dark theme), not generic SaaS. Generous whitespace, max content width capped around 768 to 960px, single column wherever possible, hairline borders instead of cards, monospaced coordinates as a brand signature. The serif (Instrument Serif) appears almost exclusively on hero H1s and in the wordmark, never on body. Italic serif is a *very* deliberate accent.

### Color palette: two modes, one structure

The repo defines two complete themes that share the same semantic variable names. **Dark is the default.** Light is the editorial alternate.

#### Light · "warm cream paper, deep navy ink"

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#fbf6ee` | Page background: warm cream paper |
| `--bg-elev` | `#fefbf5` | Cards, popovers |
| `--bg-soft` | `#f1ebde` | Secondary blocks, the `bg-neutral-50` sections |
| `--fg` | `#051a2f` | Body text: deep navy ink |
| `--fg-soft` | `#46556a` | Muted secondary copy |
| `--accent` | `#0e2d5c` | Primary buttons, links, deep navy ink. Production token `--accent`, HSL `220 75% 22%`. |
| `--border` | `#d6cebc` | Hairlines |

#### Dark · "abyssal water, bioluminescent teal"

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#060c19` | Page background: abyssal |
| `--bg-elev` | `#0a1322` | Card surface |
| `--bg-soft` | `#111b2d` | Secondary blocks |
| `--fg` | `#f1f5f7` | Foam-white body |
| `--fg-soft` | `#9bb1be` | Muted |
| `--accent` | `#21e3f0` | Bioluminescent teal: links, focus rings, the sonar pulse. Use sparingly; it should feel like the only color glowing below the photic zone. |
| `--border` | `#1d2a40` | Hairlines |

#### Brand mark: the literal logo color

The anchor mark is **`#4301ff` electric indigo** on transparent. This is the literal hex of the PNG and it appears nowhere else in the UI. Treat it as a mascot color, not a palette color. Do not pull buttons, links or backgrounds from it. (There is mild tension between the logo's electric indigo and the documented navy/teal palette; the team is aware. If asked, lean on the navy/teal system and let the anchor be the anchor.)

### Typography

| Family | Where it appears | Weight | Letter-spacing |
|---|---|---|---|
| **Inter** | Body, UI, almost all headings | 400 / 500 / 600 / 700 | `-0.025em` on display sizes |
| **Instrument Serif** | Wordmark, hero H1s, the occasional italic accent | 400 (normal + italic) | `-0.01em` |
| **Geist Mono** | Coordinates `11°22′N 142°35′E`, prices, ordered-list numerals (`01 / 02 / 03`), uppercase eyebrows are often Inter but mono is the fallback for anything numeric or coordinate-shaped | 400 / 500 | `0.05em` for coord style |

Hero copy is `clamp(2.5rem, 5vw + 1rem, 3.75rem)` Inter 600. The serif hero variant, used on About, runs slightly larger and tighter. The eyebrow above every hero is a Geist Mono-style 12px uppercase string with `letter-spacing: 0.2em` and `--fg-soft` color, e.g. `ANCHOR MARIANAS` or `ABOUT` or `WORK`.

### Spacing

Section vertical rhythm is generous: `py-20` to `py-32` between marketing sections, `pt-20 pb-16` on mobile, `pt-32 pb-24` on desktop. The horizontal gutter is `px-6` everywhere. Inner content is centered with `max-w-3xl mx-auto`. Cards use `p-6` (24px) internal padding. The spacing scale matches Tailwind defaults.

### Backgrounds

- **No gradients.** Anchor explicitly rejects the bluish-purple gradient SaaS trope. The only allowed gradient is `depth-veil`, an almost-invisible radial ellipse at the top of dark-theme sections that hints at depth.
- **Alternating cream and bg-soft** to break sections: `bg-white` then `bg-neutral-50` then back, separated by `border-t border-neutral-200` hairlines. In dark mode it's `--bg` and `--bg-soft` alternating, with `--border` hairlines.
- **No background images** in marketing sections. The `adam.jpg` portrait is the only photographic asset, used at small thumbnail size on the About page.
- **No hand-drawn illustrations, no repeating patterns, no textures.** The brand expresses depth through *negative* visual cues: emptiness, the cream paper, the dark water, not added ornament.

### Animation

- **Sonar pulse**: the signature. 2.6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite, two concentric rings (1.3s offset) emanating from a glowing teal dot. Sits next to the `we ship.` mark. Defined as `.sonar` in `colors_and_type.css`.
- **Theme transitions**: 200ms ease on `background-color`, `color`, `border-color`. No transform animations on theme toggle.
- **Hover transitions**: 150ms `ease-in-out` on color and opacity. Buttons darken to `90%` opacity; links underline. No scale-up, no lift, no glow on hover.
- **Page transitions**: `fadeInUp` at 0.6s ease-out for cards on first load, with `0.1s / 0.2s / 0.3s` staggered delays. No scroll-triggered parallax.
- **What we don't do:** bouncing, springs (the repo includes Framer Motion but uses it minimally), looping background videos, marquees, scroll-jacking.

### Hover and press states

- **Buttons (primary):** `hover:opacity-90`. No background-color shift. No transform.
- **Buttons (outline / ghost):** `hover:bg-accent hover:text-accent-foreground`, fills with the semantic accent.
- **Links:** `underline underline-offset-4` always visible, or appears on hover for body links. Color shift to `--fg` (from `--fg-soft`) on hover.
- **Press:** No active state styling beyond browser default. The brand resists "tactile" UI affordances.
- **Focus:** Always a 2px `--ring` outline with 2px offset: `focus-visible:ring-2 focus-visible:ring-offset-2`. In dark mode this is the bioluminescent teal, bright and unmistakable. Never remove focus rings.

### Borders, shadows, corners

- **Borders:** Always `1px solid var(--border)`, hairline. Used for section dividers (`border-t`), cards, inputs.
- **Shadows in light mode:** Almost never. `shadow-sm` on cards only when stacked over `bg-soft`.
- **Shadows in dark mode:** Almost never. Depth comes from the cream-versus-abyssal contrast itself. A `--glow-teal-sm` halo is permitted on a single hero element (the sonar dot, or a critical CTA), never more than one per screen.
- **Corner radii:** `--radius: 0.5rem` (8px) is the default; `--radius-sm: 0.375rem`; `--radius-xs: 0.25rem`. The primary CTA is the exception. It's a full `rounded-full` pill. Cards, inputs, badges (badges are `9999px` pill).

### Transparency and blur

- The site header uses `bg-background/70 backdrop-blur-xl`, a 70%-opaque blurred sticky header. This is the only blur in the system. Avoid frosted glass elsewhere.
- Inline color modifiers use the shadcn `hsl(var(--x) / 0.9)` pattern for hover dimming. No alpha on text.

### Imagery vibe

- **Warm and natural.** The one photograph in the system (Adam at the Singapore Merlion) is daylight, blue water, neutral skin tones. Reads as real life, not stock.
- No black-and-white treatments. No grain overlays. No duotones.
- When showing partner logos, currently Hilton Guam (the only real client), they appear as small monochrome marks in a single-row trust strip, never colorful, never large.

### Layout rules

- **Header:** sticky, blurred, 56px tall, max-width 5xl (1024px).
- **Sections:** alternating `--bg` and `--bg-soft`, separated by hairlines. No drop shadows between sections.
- **Content max-width:** `max-w-3xl` (768px) for prose; `max-w-5xl` (1024px) for navigation rails.
- **Footer:** single row on desktop with hairline top border, small column on mobile.
- **No sidebars.** No dashboards. No data tables. The site is essentially one long centered column.

---

## Iconography

The repo uses **lucide-react** (icons imported from `lucide-react@0.454`). Confirmed in-use icons: `Mail`, `Github`, `Twitter`. Sizes are `w-4 h-4` (16px) inline with footer text, occasionally `w-5 h-5` (20px) on standalone affordances. Stroke width is the lucide default (2px). Always currentColor-tinted, never filled, never colored independently of their surrounding text.

**To use lucide in this design system,** load it from CDN inside an HTML page:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
<i data-lucide="anchor" class="size-5"></i>
```

For React/JSX prototypes, the closest CDN equivalent is `lucide-static` SVG sprites, or you can re-implement the few icons used (Mail, Github, Twitter, Anchor) inline. The full list of icons matching the brand is small: **Anchor, Mail, Github, Twitter, ArrowRight, Check, X**. Avoid using more. The design vocabulary is intentionally word-first, icon-second.

**No emoji** in production marketing. (The older `100 apps` portfolio used emoji as completeness markers, now retired.) **No unicode icons** other than the degree/minute/second signs `° ′ ″` in coordinates and the rightward arrow `→` at the end of CTAs (`Book the call →`, `See work →`, `← Back`).

**The anchor mark** itself (`assets/logo-anchor.png`) is the one piece of pure iconography. Electric indigo `#4301ff`, 750×750, transparent background, simple outline anchor. Use it at small sizes: favicon, social card corner, About page lockup, never as a decorative giant.

---

## Font availability: substitution flag

All three fonts are **Google Fonts**, loaded via Next.js's `next/font/google` in production and via `@import url(...)` in `colors_and_type.css` here. No font files are bundled because none are needed:

- **Inter**: Google Fonts.
- **Instrument Serif**: Google Fonts.
- **Geist Mono**: Google Fonts (also distributed by Vercel under the `geist` npm package).

**No substitutions were needed.** If a deployment cannot reach Google Fonts CDN, the CSS falls back to: system-ui (Inter), Georgia (Instrument Serif), ui-monospace (Geist Mono). The fallback for Instrument Serif is the weakest of the three (Georgia is heavier and less elegant), so prioritize keeping Instrument Serif loading.

---

## Quick-start for an agent

When asked to produce a deliverable on Anchor Marianas brand:

1. **Read `content/site.json`**: it's the source of truth for studio name, tagline, contact info, social URLs, the founder name.
2. **Import `colors_and_type.css`**: gives you every variable. Default to dark theme; offer light as a toggle.
3. **Use only sentence-case prose.** Lift phrasing from `content/services.json` and the verbatim quotes in this README's *Content fundamentals* section.
4. **Default to a single centered column, `max-w-3xl`, hairline section dividers.** Resist building multi-column dashboards unless explicitly asked.
5. **Reach for the wordmark** ("Anchor Marianas" in Instrument Serif) before reaching for the anchor logo. The wordmark is the primary brand expression.
6. **One accent per screen.** In dark mode, that's the teal glow. In light mode, the deep navy ink CTA.
7. **End every CTA with `→`** unless there's a strong reason not to.
