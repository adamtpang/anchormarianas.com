import Link from "next/link"
import siteConfig from "@/content/site.json"
import servicesData from "@/content/services.json"

const bookUrl = siteConfig.discoveryCal
const whatsappUrl = siteConfig.whatsappLink

const offerSlugs = ["landing-page-5-day", "mvp-5-day"]
const offers = servicesData.filter((s) => offerSlugs.includes(s.slug))

export const metadata = {
  title: "Anchor Marianas - the AI layer of your business",
  description:
    "We read what your customers already tell you, then build the fix. Free review scan and flat-price builds, from Guam. Working with Hilton.",
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

          <div className="mt-16 flex items-center gap-3 border-t border-border/60 pt-6">
            <span className="sonar" aria-hidden>
              <span />
            </span>
            <span className="t-eyebrow">we ship</span>
            <span className="text-border" aria-hidden>
              /
            </span>
            <span className="t-small text-muted-foreground">
              working with{" "}
              <span className="font-display text-foreground">Hilton</span>
            </span>
          </div>
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
                Retained software engineering for a 46-year Guam wholesaler. Production
                site, wholesale lead funnel, internal Company OS.
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
