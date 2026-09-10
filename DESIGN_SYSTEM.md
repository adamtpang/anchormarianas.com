# Anchor design system 1.1

Anchor builds websites and webapps for businesses. AnchorScan supports discovery;
project contact is the main action. Source: app/design-system.css.

- Inter for all headings, copy and controls. Geist Mono for technical data.
- White and navy canvas, indigo accent, restrained tinted surfaces.
- Shared H1/H2/H3 sizes with responsive reflow. Narrow columns for reading/forms.
- 1120px marketing shell, 24px gutters, 20px compact gutters.
- 10px control radius, 16px cards, 24px large CTA panels.
- At least 44px form/button targets, visible focus, labels and native keyboard behavior.
- Actual light/dark themes and reduced-motion preference across CSS and Framer Motion.
- Loading, failure and recovery stay in the existing form and diagnostic components.
- Never fabricate customer proof or infer approval from an automated audit.

Every route inherits foundations through the root layout. Older class names are
compatibility aliases, not separate design systems. app/globals.css contains
layouts; app/design-system.css owns semantic foundations and shared behavior.

Verification: 19 existing routes, 390x844 and 1440x900 requested viewports, both
themes. Browser zoom may affect actual CSS viewport dimensions; receipts record
innerWidth. Include survey validation/review/recovery, menu and diagnostic error.
Public API success states and owner visual acceptance remain unmeasured unless
explicitly captured. The design is a reviewed local draft, not a production score.

## Minimal copy, September 10

Lead with the task. Use one primary action per section and one short sentence
where an explanation is needed. Remove repeated eyebrows, slogans and duplicate
proof blocks. Keep labels, errors, price limits and estimate assumptions visible.
Use progressive disclosure for FAQs. The project brief uses one 720px column;
estimates appear only when supported by the entered numbers. Sharing stays manual.
