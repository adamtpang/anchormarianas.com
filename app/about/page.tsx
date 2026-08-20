import Link from "next/link"
import siteConfig from "@/content/site.json"

const bookUrl = siteConfig.discoveryCal

export const metadata = {
  title: "About - Anchor Marianas",
  description:
    "Anchor Marianas is a productized AI studio in Guam. We read what your customers already tell you, then build the fix. Operated by Adam Pangelinan.",
}

const quietLink =
  "underline underline-offset-4 decoration-border transition hover:text-foreground hover:decoration-foreground"

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="depth-veil">
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-14 sm:pt-32 sm:pb-16">
          <p className="t-coord">Anchor Marianas · about</p>
          <h1 className="t-hero-serif mt-8">
            A Guam company that grows{" "}
            <span className="font-display-italic text-accent">Guam businesses.</span>
          </h1>
          <p className="t-body-lg mt-6 max-w-xl text-muted-foreground">
            Most operators are too busy running the business to read their own
            reviews as a system. We do that, then build the software and AI that
            fixes what we find.
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          <p className="t-eyebrow">How we work</p>
          <div className="mt-8 space-y-8">
            {[
              {
                n: "01",
                t: "Diagnose",
                d: "A free scan reads your Google reviews and your site, then shows what is quietly costing you customers. No pitch, no invented numbers.",
              },
              {
                n: "02",
                t: "Price it",
                d: "Every problem we find has a fixed price on the menu. No custom quotes, no scoping drag.",
              },
              {
                n: "03",
                t: "Build it",
                d: "The fix ships in days, not quarters. Then we keep it running if you want that.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-5">
                <span className="font-mono-anchor t-small pt-1 text-accent">{s.n}</span>
                <div>
                  <h2 className="t-h3">{s.t}</h2>
                  <p className="t-body mt-1 text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          <p className="t-eyebrow">The founder</p>
          <h2 className="font-display mt-4 text-3xl leading-tight tracking-tight">
            Adam Pangelinan
          </h2>
          <p className="t-body mt-4 max-w-2xl text-muted-foreground">
            Anchor is operated by one person who builds. Not a slide deck and a
            subcontractor: the work happens under Anchor, one business at a time,
            with full attention. Currently doing free proof-of-value AI-automation
            work for{" "}
            <Link href="/work" className={quietLink}>
              International Distributors, Inc.
            </Link>
            , a 46-year Guam wholesaler serving five islands.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={siteConfig.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className={`t-small text-muted-foreground ${quietLink}`}
            >
              X
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`t-small text-muted-foreground ${quietLink}`}
            >
              GitHub
            </a>
            <Link href="/work" className={`t-small text-muted-foreground ${quietLink}`}>
              Selected work
            </Link>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          <p className="t-eyebrow">Who we work with</p>
          <p className="t-body-lg mt-4 max-w-2xl text-muted-foreground">
            Guam businesses with real customers and real reviews: hotels,
            restaurants, clinics, trades, salons, shops. If people are already
            talking about you online, there is a growth plan in what they say.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          <p className="t-eyebrow">Contact</p>
          <p className="t-body mt-4 text-muted-foreground">
            <a href={`mailto:${siteConfig.email}`} className={quietLink}>
              {siteConfig.email}
            </a>
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-accent-foreground transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Run the free scan &rarr;
            </Link>
            <a href={bookUrl} className={`t-small text-muted-foreground ${quietLink}`}>
              or book a call
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
