import fs from "node:fs"
import path from "node:path"
import Link from "next/link"
import { notFound } from "next/navigation"
import siteConfig from "@/content/site.json"

type Observation = { title: string; detail: string; evidence?: string }
type Read = {
  slug: string
  business: string
  location?: string
  generatedAt: string
  source?: string
  rating?: number
  reviewCount?: number
  reviewsRead?: number
  totalReviewCount?: number
  summary: string
  observations: Observation[]
  questions?: string[]
  focus?: string
}

const READS_DIR = path.join(process.cwd(), "content", "reads")

function allSlugs(): string[] {
  try {
    return fs
      .readdirSync(READS_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""))
  } catch {
    return []
  }
}

function getRead(slug: string): Read | null {
  try {
    return JSON.parse(fs.readFileSync(path.join(READS_DIR, `${slug}.json`), "utf8"))
  } catch {
    return null
  }
}

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const read = getRead(slug)
  if (!read) return { title: "Read not found - Anchor Marianas" }
  const title = `${read.business}: a free read from Anchor`
  const description = read.summary.slice(0, 155)
  return {
    title,
    description,
    openGraph: { title, description, url: `https://anchormarianas.com/scan/${read.slug}` },
  }
}

const quietLink =
  "underline underline-offset-4 decoration-border transition hover:text-foreground hover:decoration-foreground"

export default async function ReadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const read = getRead(slug)
  if (!read) notFound()
  const listedReviewCount = read.totalReviewCount ?? read.reviewCount

  return (
    <div>
      {/* Hero */}
      <section className="depth-veil">
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-12 sm:pt-32">
          <p className="t-coord">
            Free read · {read.location || "Guam"} · {read.generatedAt}
          </p>
          <h1 className="t-hero-serif mt-8">{read.business}</h1>
          <p className="t-body-lg mt-6 max-w-2xl text-muted-foreground">{read.summary}</p>

          {(read.rating || read.reviewsRead || listedReviewCount) && (
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {read.rating != null && (
                <div>
                  <p className="font-display text-2xl tracking-tight">{read.rating}</p>
                  <p className="t-small text-muted-foreground">Google rating</p>
                </div>
              )}
              {read.reviewsRead != null && (
                <div>
                  <p className="font-display text-2xl tracking-tight">{read.reviewsRead}</p>
                  <p className="t-small text-muted-foreground">Reviews read</p>
                </div>
              )}
              {listedReviewCount != null && listedReviewCount !== read.reviewsRead && (
                <div>
                  <p className="font-display text-2xl tracking-tight">{listedReviewCount}</p>
                  <p className="t-small text-muted-foreground">Google reviews</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Observations */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          <p className="t-eyebrow">What we noticed</p>
          <div className="mt-8 space-y-4">
            {read.observations.map((o, i) => (
              <div key={o.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <span className="font-mono-anchor t-small pt-1 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="t-h3">{o.title}</h2>
                    <p className="t-body mt-2 text-muted-foreground">{o.detail}</p>
                    {o.evidence && (
                      <p className="t-small mt-3 border-t border-border pt-3 text-muted-foreground">
                        <span className="font-mono-anchor text-accent">In the reviews</span>{" "}
                        {o.evidence}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      {read.questions && read.questions.length > 0 && (
        <section className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
            <p className="t-eyebrow">Questions worth answering</p>
            <ul className="mt-6 space-y-3">
              {read.questions.map((q) => (
                <li key={q} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span className="t-body text-muted-foreground">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Focus + CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          {read.focus && (
            <>
              <p className="t-eyebrow">Where we would start</p>
              <p className="font-display-italic mt-4 text-2xl leading-snug">{read.focus}</p>
            </>
          )}
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-accent-foreground transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Talk it through, 15 min &rarr;
            </a>
            <Link href="/pricing" className={`t-small text-muted-foreground ${quietLink}`}>
              or see what fixes cost
            </Link>
          </div>
          <p className="t-small mt-8 text-muted-foreground">
            {read.source ? `${read.source}. ` : ""}Diagnostic only, no invented numbers. Want one
            for your business?{" "}
            <Link href="/scan" className={quietLink}>
              Ask for a free read
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
