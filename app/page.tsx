import Link from "next/link"
import siteConfig from "@/content/site.json"
import servicesData from "@/content/services.json"

const bookUrl = siteConfig.discoveryCal

const offerSlugs = ["landing-page-5-day", "mvp-5-day"]
const offers = servicesData.filter((s) => offerSlugs.includes(s.slug))

export const metadata = {
  title: "Anchor Marianas — Anchor Scan: turn your reviews into a growth plan",
  description:
    "We read what your customers are already telling you in your Google reviews, then find where AI can save you time and grow revenue. Built for Guam businesses. Working with Hilton.",
}

const steps = [
  {
    n: "01",
    title: "We analyze your Google reviews",
    body: "We pull and read what your own customers are already telling you — every review, every recurring complaint, every pattern you're too close to see.",
  },
  {
    n: "02",
    title: "We deliver the diagnostic",
    body: "A clear report of what's quietly costing you customers, and exactly where AI and software can save you time, cut cost, and grow revenue.",
  },
  {
    n: "03",
    title: "We work with you to fix it",
    body: "The scan is the starting point. From there we build and implement the fixes with you — not a slide deck, working software.",
  },
]

const deliverables = [
  "A ranked list of the recurring problems your customers name in their reviews.",
  "What each problem is likely costing you in lost repeat business and referrals.",
  "The specific AI and software opportunities that address them, ranked by dollar impact.",
  "A plain-English action plan you can run with — with us, or on your own.",
]

export default function HomePage() {
  return (
    <div className="bg-white text-neutral-900">
      <style>{`:root{--ink:#0b3b5c}`}</style>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 sm:pt-32 sm:pb-16">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          Anchor Marianas · Guam
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          We read what your customers are already telling you,
          <span className="block text-neutral-500">
            and find where AI can save you time and grow revenue.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
          Anchor Scan analyzes your Google reviews, surfaces the problems costing you
          customers, and shows you exactly where software and AI pay off. Built for Guam
          businesses that want to grow.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={bookUrl}
            className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
          >
            Book a free discovery call
          </a>
          <p className="text-sm text-neutral-600">
            30 minutes. No pitch. We tell you if a scan is worth it.
          </p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Working with
          </span>
          <span className="font-display text-2xl tracking-tight text-neutral-900">
            Hilton
          </span>
          <span className="text-sm text-neutral-600">
            and Guam operators who want to grow on what their customers already say.
          </span>
        </div>
      </section>

      {/* Flat-price builds */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Two flat-price builds, live in 5 days
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {offers.map((o) => (
            <div key={o.slug} className="flex flex-col rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-xl font-semibold tracking-tight">{o.name}</h3>
              <p className="mt-1 text-sm text-neutral-600">{o.tagline}</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">
                {o.price}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-700">
                {o.deliverables.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-[var(--ink)]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <a
                href={o.ctaUrl}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
              >
                {o.ctaLabel}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-neutral-600">
          Pay above and we start today. Prefer to talk first?{" "}
          <a href={bookUrl} className="underline underline-offset-4 hover:text-neutral-900">
            Book a free call
          </a>{" "}
          or{" "}
          <a href={siteConfig.whatsappLink} className="underline underline-offset-4 hover:text-neutral-900">
            WhatsApp us
          </a>
          .
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          Both builds can add the $500/mo care plan after launch: hosting, edits, and monitoring.
        </p>
      </section>

      {/* How Anchor Scan works */}
      <section className="border-t border-neutral-200 mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          How Anchor Scan works
        </h2>
        <div className="mt-8 space-y-8">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-5 sm:gap-6">
              <div className="font-mono text-sm text-neutral-400 pt-1">{s.n}</div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-700">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            What you get — the Anchor Scan report
          </h2>
          <ul className="mt-8 space-y-4">
            {deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-base leading-relaxed text-neutral-800">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--ink)]" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Who it&rsquo;s for
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700">
          Guam businesses with real customers and real reviews — hotels, restaurants, clinics,
          shops, services. If people are already talking about you online, there&rsquo;s a
          growth plan hiding in what they say. We find it.
        </p>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Start with a free discovery call.
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-neutral-600">
            30 minutes. We look at your business, talk through what a scan would surface, and
            tell you honestly whether it&rsquo;s worth doing.
          </p>
          <div className="mt-8">
            <a
              href={bookUrl}
              className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90"
            >
              Book a free discovery call →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
