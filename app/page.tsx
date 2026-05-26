import siteConfig from "@/content/site.json"

const scanMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "Free Anchor Scan for my business"
)}&body=${encodeURIComponent(
  "Hi Adam,\n\nI'd like a Free Anchor Scan for my business.\n\nBusiness name:\nGoogle Maps link:\nContact name:\nBest phone/email:\n\nThanks."
)}`

const scanBullets = [
  "We read your public Google Maps reviews.",
  "You get the top 3 fixable problems, with example quotes.",
  "A 15-minute walkthrough on Zoom or in person on Guam.",
]

const sprintBullets = [
  "One AI workflow, shipped in 7 days, fixed $750.",
  "Built around the #1 issue from your Anchor Scan.",
  "Short walkthrough video, plus two cleanup passes.",
]

const audience = [
  "Hotels and inns",
  "Tour and dive operators",
  "Restaurants",
  "Local services and retail",
]

function CTA({ label = "Get a Free Anchor Scan" }: { label?: string }) {
  return (
    <a
      href={scanMailto}
      className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:bg-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 sm:text-lg"
    >
      {label}
    </a>
  )
}

export default function HomePage() {
  return (
    <div
      className="bg-[var(--paper)] text-[var(--ink)]"
      style={
        {
          // Local CSS variables so this page is self-contained and unaffected by
          // any global theme. Mostly white/off-white, near-black text, one accent.
          ["--paper" as string]: "#FBFAF6",
          ["--ink" as string]: "#0B1F33",
          ["--muted" as string]: "#4B5563",
          ["--rule" as string]: "#E6E4DC",
          ["--accent" as string]: "#0E6E7A",
        } as React.CSSProperties
      }
    >
      {/* HERO */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto w-full max-w-3xl px-6 pb-16 pt-16 sm:pt-24">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            Anchor Marianas · Built on Guam
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Free AI diagnostic for your business, from your customer reviews.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
            Anchor Scan reads your public Google Maps reviews and tells you the top 3 things customers
            actually want fixed. Free. 15 minutes. No pitch deck.
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <CTA />
            <span className="text-sm text-[var(--muted)]">
              No signup. Replies within 1 business day.
            </span>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto w-full max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What you get with a Free Anchor Scan
          </h2>
          <ul className="mt-8 space-y-5">
            {scanBullets.map((b, i) => (
              <li key={b} className="flex gap-4 text-base sm:text-lg">
                <span
                  aria-hidden
                  className="mt-[0.55rem] inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
                />
                <span className="leading-relaxed text-[var(--ink)]">
                  <span className="mr-2 font-mono text-sm text-[var(--muted)]">0{i + 1}</span>
                  {b}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <CTA />
          </div>
        </div>
      </section>

      {/* SPRINT */}
      <section className="border-b border-[var(--rule)] bg-white">
        <div className="mx-auto w-full max-w-3xl px-6 py-16">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            After the scan, if it makes sense
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            The $750 Review-to-Revenue Sprint
          </h2>
          <ul className="mt-8 space-y-5">
            {sprintBullets.map((b, i) => (
              <li key={b} className="flex gap-4 text-base sm:text-lg">
                <span
                  aria-hidden
                  className="mt-[0.55rem] inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--ink)]"
                />
                <span className="leading-relaxed text-[var(--ink)]">
                  <span className="mr-2 font-mono text-sm text-[var(--muted)]">0{i + 1}</span>
                  {b}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <CTA label="Start with a Free Anchor Scan" />
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto w-full max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Who it&apos;s for</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Small and medium businesses in Guam, the CNMI, and the wider Pacific that have public
            customer reviews and want one practical AI workflow live this month.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {audience.map((a) => (
              <li
                key={a}
                className="rounded-md border border-[var(--rule)] bg-white px-4 py-3 text-base text-[var(--ink)]"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOUNDER + CONTACT */}
      <section>
        <div className="mx-auto w-full max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Run by Adam, on Guam.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {siteConfig.founder} builds the scan and ships the sprint. No agency, no junior team. If
            it&apos;s not useful, you don&apos;t pay anything.
          </p>
          <dl className="mt-8 space-y-3 text-base">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <dt className="w-24 text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
                Email
              </dt>
              <dd>
                <a
                  className="underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent)]"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <dt className="w-24 text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
                Phone
              </dt>
              <dd>
                <a
                  className="underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent)]"
                  href={`tel:${siteConfig.phone}`}
                >
                  {siteConfig.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <dt className="w-24 text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
                WhatsApp
              </dt>
              <dd>
                <a
                  className="underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent)]"
                  href={siteConfig.whatsappLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {siteConfig.whatsappLink.replace("https://", "")}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-10">
            <CTA />
          </div>
        </div>
      </section>
    </div>
  )
}
