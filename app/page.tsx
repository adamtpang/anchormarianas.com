import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import servicesData from "@/content/services.json"
import siteConfig from "@/content/site.json"
import workData from "@/content/work.json"
import { publishedReads } from "@/lib/anchorscan/published-reads"

const reads = publishedReads()
const idi = workData.caseStudies[0]

const operatingModel = [
  {
    label: "Read",
    title: "Start with what is already visible",
    body: "AnchorScan reads your website in about a minute. For a deeper read, we inspect the public customer evidence with you. No signup, no sales qualifier, no invented numbers.",
  },
  {
    label: "Find",
    title: "Name the recurring knot",
    body: "We separate observations from questions, then choose the smallest problem worth solving. Sometimes the answer is not AI. We say that plainly.",
  },
  {
    label: "Ship",
    title: "Build the cure, if there is one",
    body: "The person who scopes the work builds the system and stays on it after launch. Fixed scope, visible price, no handoff between a sales team and a delivery team.",
  },
]

const bySlug = (slug: string) => servicesData.find((service) => service.slug === slug)
type Service = (typeof servicesData)[number]

const introPrice = (service: Service) =>
  "introPrice" in service ? service.introPrice : undefined

const introNote = (service: Service) =>
  "introNote" in service ? service.introNote : undefined

const flagship = bySlug("ai-review-responder")
const offerSlugs = ["landing-page-5-day", "mvp-5-day"]
const offers = servicesData.filter((service) => offerSlugs.includes(service.slug))

const whenToCall = [
  { pain: "Nobody ever replies to my reviews.", slug: "ai-review-responder" },
  { pain: "Customers keep no-showing.", slug: "ai-appointment-reminders" },
  { pain: "I am losing customers to missed calls.", slug: "ai-reception-pilot" },
  { pain: "I do not have a website that sells.", slug: "landing-page-5-day" },
  { pain: "I need AI work every week.", slug: "fractional-ai-engineer" },
  { pain: "I am not sure what the real problem is yet.", slug: "anchorscan" },
]
  .map((item) => ({ ...item, service: bySlug(item.slug) }))
  .filter(
    (item): item is typeof item & { service: NonNullable<typeof item.service> } =>
      Boolean(item.service)
  )

const bookUrl = siteConfig.discoveryCal
const whatsappUrl = siteConfig.whatsappLink

export const metadata = {
  title: "Anchor Marianas - find the knot, ship the cure",
  description:
    "Anchor Marianas reads the evidence already around your business, finds the recurring problem, and ships the smallest AI system that fixes it.",
}

const quietLink =
  "underline underline-offset-4 decoration-border transition hover:text-foreground hover:decoration-foreground"

export default function HomePage() {
  const proofMetrics = [
    {
      value: String(reads.length),
      label: "published business reads",
      note: "Diagnostic examples, not projected outcomes",
    },
    {
      value: "Live",
      label: "client site in production",
      note: "idiguam.vercel.app, built and maintained by Anchor",
    },
    {
      value: "1",
      label: "operator from scope to production",
      note: "No account-manager handoff",
    },
  ]

  return (
    <div>
      <section className="depth-veil">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-24 sm:pb-28 sm:pt-36">
          <div className="max-w-3xl">
            <p className="t-coord">
              Anchor Marianas &middot; Guam &middot; 11&deg;22&prime;N 142&deg;35&prime;E
            </p>

            <h1 className="t-hero-serif mt-8 max-w-3xl">
              Find the knot.
              <span className="mt-1 block font-display-italic text-accent">
                Ship the cure.
              </span>
            </h1>

            <p className="t-body-lg mt-8 max-w-2xl text-muted-foreground sm:text-xl">
              We read what your customers and systems already tell you, find the
              recurring loop, then ship the smallest AI piece that unties it.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="btn-primary h-12 rounded-full bg-accent px-7 text-[0.95rem] font-semibold text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/scan">Run the free AnchorScan &rarr;</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 rounded-full px-6 text-[0.95rem] text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Link href="/work">See shipped work &rarr;</Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border/70 pt-6">
              <span className="sonar" aria-hidden>
                <span />
              </span>
              <span className="t-eyebrow">taking work now</span>
              <span className="t-small text-muted-foreground">
                Start free. Pay only when there is a clear build.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Verified operating proof" className="border-y border-border">
        <div className="mx-auto grid max-w-5xl divide-y divide-border px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {proofMetrics.map((metric) => (
            <div
              key={metric.label}
              className="metric py-7 sm:px-7 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="value font-mono-anchor text-3xl tabular-nums text-foreground">
                {metric.value}
              </p>
              <p className="label t-small mt-2 font-semibold text-foreground">{metric.label}</p>
              <p className="t-small mt-1 text-muted-foreground">{metric.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-end">
            <div>
              <p className="t-eyebrow">One operator</p>
              <h2 className="t-h2 mt-4 max-w-xl">
                The person who scopes it builds it.
              </h2>
              <p className="t-body-lg mt-5 max-w-xl text-muted-foreground">
                Anchor is Adam Pangelinan, based on Guam. No associates, no junior
                delivery team, no account manager between the problem and the code.
              </p>
            </div>
            <div className="border-l border-accent/40 pl-5">
              <p className="t-eyebrow">In production</p>
              <p className="t-body mt-3 text-foreground">{idi.client}</p>
              <p className="t-small mt-2 text-muted-foreground">{idi.engagement}</p>
              <Link
                href="/work"
                className="t-small mt-4 inline-flex min-h-6 items-center font-semibold text-accent"
              >
                Read the case study &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <p className="t-eyebrow">From problem to production</p>
          <h2 className="t-h2 mt-4 max-w-xl">
            One connected way of working.
          </h2>

          <ol className="mt-12 border-y border-border">
            {operatingModel.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-4 border-b border-border py-7 last:border-b-0 sm:grid-cols-[6rem_minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-7"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono-anchor text-sm tabular-nums text-accent">
                    0{index + 1}
                  </span>
                  <span className="t-eyebrow text-[0.65rem]">{step.label}</span>
                </div>
                <h3 className="t-h3 text-[1.05rem]">{step.title}</h3>
                <p className="t-body text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {reads.length > 0 && (
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <div className="max-w-2xl">
              <p className="t-eyebrow">The evidence ledger</p>
              <h2 className="t-h2 mt-4">
                {reads.length} businesses. {reads.length} written reads.
              </h2>
              <p className="t-body-lg mt-5 text-muted-foreground">
                Each read records what was visible at the time and the questions
                worth asking next. It is a diagnostic, not a promise of revenue.
              </p>
            </div>

            <div className="mt-10 border-y border-border">
              {reads.map((read) => (
                <Link
                  key={read.slug}
                  href={`/scan/${read.slug}`}
                  className="group grid gap-3 border-b border-border py-6 last:border-b-0 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:grid-cols-[12rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                >
                  <div>
                    <p className="t-small font-semibold text-foreground">
                      {read.business}
                    </p>
                    {read.rating != null && (
                      <p className="font-mono-anchor mt-1 text-xs tabular-nums text-muted-foreground">
                        {read.rating.toFixed(1)} stars
                        {read.reviewCount != null ? ` · ${read.reviewCount} reviews` : ""}
                      </p>
                    )}
                  </div>
                  <p className="t-body text-muted-foreground group-hover:text-foreground">
                    {read.headline}
                  </p>
                  <span className="t-small font-semibold text-accent">Read &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {flagship && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
            <div className="grid gap-10 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:items-start">
              <div>
                <p className="t-eyebrow">A small first cure</p>
                <h2 className="t-h2 mt-4">
                  A drafted reply to every review.
                </h2>
                <p className="t-body mt-5 text-muted-foreground">
                  Start with one visible, recurring job. You approve every reply
                  before anything posts.
                </p>
              </div>

              <Card className="card rounded-xl border-accent/35 bg-card shadow-none">
                <CardHeader className="gap-4 p-7 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="border border-accent/30 bg-accent/10 text-accent hover:bg-accent/10">
                        {introPrice(flagship) ?? flagship.price}
                      </Badge>
                      <CardTitle className="t-h3 mt-4">{flagship.name}</CardTitle>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl leading-none text-accent">
                        {flagship.price}
                      </p>
                      <p className="t-small mt-1 text-muted-foreground">after the pilot</p>
                    </div>
                  </div>
                  <CardDescription className="card-desc t-body text-muted-foreground">
                    {`${flagship.timeline}. ${introNote(flagship)}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-7 pb-0 sm:px-8">
                  <ul className="border-y border-border">
                    {flagship.deliverables.slice(0, 4).map((deliverable) => (
                      <li
                        key={deliverable}
                        className="t-small border-b border-border py-3 text-foreground last:border-b-0"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-wrap gap-3 p-7 sm:p-8">
                  <Button
                    asChild
                    className="rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
                  >
                    <a href={whatsappUrl}>Claim a free spot &rarr;</a>
                  </Button>
                  <Button asChild variant="ghost" className="rounded-full text-muted-foreground">
                    <a href={bookUrl}>Book 15 minutes &rarr;</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <p className="t-eyebrow">Bring the recurring problem</p>
          <h2 className="t-h2 mt-4 max-w-xl">
            Start with the sentence you keep repeating.
          </h2>

          <div className="mt-10 grid border-y border-border sm:grid-cols-2">
            {whenToCall.map((item, index) => (
              <a
                key={item.slug}
                href={item.service.ctaUrl}
                className={`group flex min-w-0 flex-col justify-between gap-5 border-border py-6 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-6 ${
                  index % 2 === 0 ? "sm:border-r" : ""
                } ${index < whenToCall.length - 1 ? "border-b" : ""} ${
                  index >= whenToCall.length - 2 ? "sm:border-b-0" : ""
                }`}
              >
                <p className="t-body text-foreground">&ldquo;{item.pain}&rdquo;</p>
                <div className="flex items-end justify-between gap-4">
                  <span className="t-small font-semibold text-muted-foreground group-hover:text-foreground">
                    {item.service.name}
                  </span>
                  <span className="font-mono-anchor shrink-0 text-xs tabular-nums text-accent">
                    {introPrice(item.service)
                      ? `${introPrice(item.service)}, then ${item.service.price}`
                      : item.service.price}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <p className="t-eyebrow">Two fixed-price builds</p>
          <h2 className="t-h2 mt-4 max-w-xl">
            When the problem is clear, the price is too.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {offers.map((offer) => (
              <Card key={offer.slug} className="flex flex-col rounded-xl shadow-none">
                <CardHeader className="p-7">
                  <CardTitle className="t-h3">{offer.name}</CardTitle>
                  <p className="font-display mt-4 text-5xl leading-none tracking-tight">
                    {offer.price}
                  </p>
                  <CardDescription className="t-small mt-2 text-muted-foreground">
                    {offer.tagline}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto p-7 pt-0">
                  <Button asChild className="w-full rounded-full">
                    <a href={offer.ctaUrl}>{offer.ctaLabel} &rarr;</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <p className="t-small mt-6 text-muted-foreground">
            Prefer to talk first?{" "}
            <a href={bookUrl} className={quietLink}>
              Book an untangling call
            </a>{" "}
            or{" "}
            <a href={whatsappUrl} className={quietLink}>
              WhatsApp
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-28">
          <p className="t-eyebrow">Start with evidence</p>
          <h2 className="t-hero-serif mt-4 max-w-2xl">
            Bring us the problem that keeps coming back.
          </h2>
          <p className="t-body-lg mt-6 max-w-xl text-muted-foreground">
            AnchorScan reads your website and gives you the questions worth
            answering before you choose a fix. About one minute. No signup.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-9 h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/scan">Run it on your business &rarr;</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
