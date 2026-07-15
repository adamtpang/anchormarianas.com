import Image from "next/image"
import Link from "next/link"
import siteConfig from "@/content/site.json"
import work from "@/content/work.json"

const bookUrl = siteConfig.discoveryCal

export const metadata = {
  title: "Work - Anchor Marianas",
  description:
    "Real client engagements from Anchor Marianas: retained software engineering and AI for island businesses. Verified facts, live links, no invented numbers.",
}

const quietLink =
  "underline underline-offset-4 decoration-border transition hover:text-foreground hover:decoration-foreground"

export default function WorkPage() {
  return (
    <div>
      {/* Hero */}
      <section className="depth-veil">
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-14 sm:pt-32 sm:pb-16">
          <p className="t-coord">Anchor Marianas · work</p>
          <h1 className="t-hero-serif mt-8">
            Built for <span className="font-display-italic text-accent">island businesses.</span>
          </h1>
          <p className="t-body-lg mt-6 max-w-xl text-muted-foreground">{work.intro}</p>
        </div>
      </section>

      {/* Case studies */}
      {work.caseStudies.map((cs) => (
        <section key={cs.slug} className="border-t border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
            <p className="t-eyebrow">Case study · {cs.location}</p>
            <h2 className="font-display mt-4 text-3xl leading-tight tracking-tight sm:text-4xl">
              {cs.client}
            </h2>
            <p className="t-body-lg mt-2 text-accent">{cs.tagline}</p>
            <p className="t-body mt-5 max-w-2xl text-muted-foreground">{cs.summary}</p>

            {/* Engagement + footprint */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                <p className="t-eyebrow">The engagement</p>
                <p className="font-display mt-3 text-2xl tracking-tight">{cs.engagement}</p>
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-small mt-3 inline-block text-accent transition hover:opacity-80"
                >
                  {cs.liveUrl.replace("https://", "")} &rarr;
                </a>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="t-eyebrow">Footprint</p>
                <ul className="mt-3 space-y-1.5">
                  {cs.footprint.map((f) => (
                    <li key={f.label} className="t-small text-muted-foreground">
                      <span className="font-mono-anchor text-foreground">{f.value}</span> · {f.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Deliverables */}
            <div className="mt-10">
              <p className="t-eyebrow">What shipped</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {cs.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 t-small text-muted-foreground">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proof images */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {cs.images.map((img) => (
                <figure
                  key={img.src}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1280}
                    height={800}
                    className="h-auto w-full"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                  <figcaption className="t-small border-t border-border px-4 py-2.5 text-muted-foreground">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Pending */}
      {work.pending.length > 0 && (
        <section className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-4xl px-6 py-14">
            <p className="t-eyebrow">Also in the shop</p>
            <div className="mt-4 space-y-3">
              {work.pending.map((p) => (
                <div key={p.client} className="rounded-2xl border border-dashed border-border p-6">
                  <h3 className="t-h3">{p.client}</h3>
                  <p className="t-small mt-1 text-muted-foreground">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            Your business could be next.
          </h2>
          <p className="t-body mt-4 text-muted-foreground">
            Start with the free scan, or{" "}
            <a href={bookUrl} className={quietLink}>
              book a call
            </a>
            .
          </p>
          <div className="mt-7">
            <Link
              href="/audit"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Run the free scan &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
