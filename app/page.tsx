import Link from "next/link"
import siteConfig from "@/content/site.json"
import servicesData from "@/content/services.json"
import testimonials from "@/content/testimonials.json"

const bookUrl = siteConfig.discoveryCal
const whatsappUrl = siteConfig.whatsappLink

const offerSlugs = ["landing-page-5-day", "mvp-5-day"]
const offers = servicesData.filter((s) => offerSlugs.includes(s.slug))

const bySlug = (slug: string) => servicesData.find((s) => s.slug === slug)

const whenToCall = [
  { pain: "I don't have a website that sells.", slug: "landing-page-5-day" },
  { pain: "My idea needs to actually work, not just look good.", slug: "mvp-5-day" },
  { pain: "I'm losing customers to missed calls.", slug: "ai-reception-pilot" },
  { pain: "I need AI work every week, not one-off projects.", slug: "fractional-ai-engineer" },
  { pain: "Not sure any of this fits yet.", slug: "anchorscan" },
]
  .map((w) => ({ ...w, service: bySlug(w.slug) }))
  .filter((w) => w.service)

export const metadata = {
  title: "Anchor Marianas - the AI layer of your business",
  description:
    "We read what your customers already tell you, then build the fix. Free review scan and flat-price builds, from Guam. Free proof-of-value AI-automation work for International Distributors, Inc.",
}

const scanBtn =
  "inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-accent-foreground transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const buyBtn =
  "mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-[0.95rem] font-semibold text-background transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const quietLink =
  "underline underline-offset-4 decoration-border transition hover:text-foreground hover:decoration-foreground"

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="depth-veil">
        <div className="mx-auto max-w-4xl px-6 pt-28 pb-20 sm:pt-40 sm:pb-28">
          <p className="t-coord">Anchor Marianas · Guam · 11&deg;22&prime;N 142&deg;35&prime;E</p>

          <h1 className="t-hero-serif mt-8">
            The AI layer of{" "}
            <span className="font-display-italic text-accent">your business.</span>
          </h1>

          <p className="t-body-lg mt-7 max-w-lg text-muted-foreground">
            We read what your customers already tell you, then build the fix.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/scan" className={scanBtn}>
              Run the free scan &rarr;
            </Link>
            <a href={bookUrl} className={`text-[0.95rem] text-muted-foreground ${quietLink}`}>
              or book a call
            </a>
          </div>

          {/* Price and timeline, stated up front */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            <div className="bg-background p-5">
              <p className="font-display text-2xl tracking-tight">$497</p>
              <p className="t-small mt-1 text-muted-foreground">Landing page, live in 5 days</p>
            </div>
            <div className="bg-background p-5">
              <p className="font-display text-2xl tracking-tight">$1,997</p>
              <p className="t-small mt-1 text-muted-foreground">MVP web app, live in 5 days</p>
            </div>
            <div className="bg-background p-5">
              <p className="font-display text-2xl tracking-tight">$500/mo</p>
              <p className="t-small mt-1 text-muted-foreground">Care plan, cancel anytime</p>
            </div>
          </div>
          <p className="t-small mt-3 text-muted-foreground">
            Fixed prices, no quotes, and builds ship in 5 days or you get a
            refund.{" "}
            <Link href="/pricing" className={quietLink}>
              See the full menu
            </Link>
            .
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-border/60 pt-6">
            <span className="sonar" aria-hidden>
              <span />
            </span>
            <span className="t-eyebrow">taking work now</span>
            <span className="text-border" aria-hidden>
              /
            </span>
            <span className="t-small text-muted-foreground">
              free proof-of-value work for{" "}
              <Link
                href="/work"
                className="font-display text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
              >
                International Distributors, Inc.
              </Link>
            </span>
          </div>
        </div>
      </section>

      {/* Who this is for: one line per real problem, routed to one real tier */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="t-eyebrow">When to call</p>
          <p className="t-body-lg mt-4 max-w-xl text-muted-foreground">
            If one of these sounds like you, here&rsquo;s where to start.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whenToCall.map((w) => (
              <a
                key={w.slug}
                href={w.service!.ctaUrl}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-accent"
              >
                <p className="t-body text-foreground">&ldquo;{w.pain}&rdquo;</p>
                <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                  <span className="t-small font-semibold text-foreground">
                    {w.service!.name}
                  </span>
                  <span className="t-small text-accent">
                    {w.service!.price} &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Proof: verified numbers from the IDI engagement */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-12 sm:py-14">
          <p className="t-eyebrow">Client proof</p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: "$0 to start", l: "Free proof-of-value engagement" },
              { n: "46 years", l: "Client operating since 1980" },
              { n: "5 islands", l: "Distribution network served" },
              { n: "2,914", l: "Lines of first-party code" },
            ].map((m) => (
              <div key={m.l}>
                <p className="font-display text-2xl tracking-tight sm:text-3xl">{m.n}</p>
                <p className="t-small mt-1 text-muted-foreground">{m.l}</p>
              </div>
            ))}
          </div>
          <figure className="mt-10 border-l-2 border-accent/40 pl-5">
            <blockquote className="t-body text-foreground">
              &ldquo;{testimonials[0].quote}&rdquo;
            </blockquote>
            <figcaption className="t-small mt-2 text-muted-foreground">
              {testimonials[0].author} · {testimonials[0].organization}
            </figcaption>
          </figure>
          <p className="t-small mt-8 max-w-xl text-muted-foreground">
            No associates, no handoff, no junior team learning on your dime.
            Anchor Marianas LLC is one person, based on Guam: I scope it,
            I build it, I stay on it after launch.
          </p>
        </div>
      </section>

      {/* Offers */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <p className="t-eyebrow">Two builds &middot; flat price &middot; live in 5 days</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {offers.map((o) => (
              <div
                key={o.slug}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors duration-200 hover:border-accent"
              >
                <h2 className="t-h3">{o.name}</h2>
                <p className="font-display mt-5 text-5xl leading-none tracking-tight">
                  {o.price}
                </p>
                <p className="t-small mt-4 text-muted-foreground">{o.tagline}</p>
                <a href={o.ctaUrl} className={buyBtn}>
                  {o.ctaLabel} &rarr;
                </a>
              </div>
            ))}
          </div>

          <p className="t-small mt-6 text-muted-foreground">
            Add the $500/mo care plan after launch. Prefer to talk first?{" "}
            <a href={bookUrl} className={quietLink}>
              Book a call
            </a>{" "}
            or{" "}
            <a href={whatsappUrl} className={quietLink}>
              WhatsApp
            </a>
            .
          </p>
        </div>
      </section>

      {/* Selected work */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="t-eyebrow">Selected work</p>
          <Link
            href="/work"
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-7 transition-colors duration-200 hover:border-accent sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="t-h3">International Distributors, Inc.</h2>
              <p className="t-small mt-1 text-muted-foreground">
                Free proof-of-value AI-automation work for a 46-year Guam wholesaler.
                Production site, wholesale lead funnel, internal Company OS.
              </p>
            </div>
            <span className="t-small font-semibold text-accent">Case study &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Scan closer */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            Not sure where to start?
          </h2>
          <p className="t-body-lg mt-4 max-w-md text-muted-foreground">
            The free scan reads your Google reviews and your site, then shows
            what is quietly costing you customers. One minute, no signup.
          </p>
          <Link
            href="/scan"
            className="mt-8 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-accent transition hover:opacity-80"
          >
            Run it on your business &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}
