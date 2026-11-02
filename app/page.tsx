import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import site from "@/content/site.json"

const title = "Anchor Marianas | An AI-first home for small businesses"
const description =
  "Anchor Marianas buys successful, non-technical small businesses and runs them with AI. We are in the search stage. Texas bookkeeping and tax-prep firms are first."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anchormarianas.com",
    title,
    description,
    siteName: "Anchor Marianas",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@adamtpang",
  },
}

const sellerMail = `mailto:${site.email}?subject=${encodeURIComponent("Selling your firm")}`

const criteria = [
  {
    title: "Recurring client base",
    detail: "A book of clients that comes back, which is the core of a bookkeeping or tax-prep firm.",
  },
  {
    title: "Owner ready to retire or step back",
    detail: "Someone who wants a successor and is ready to leave the day-to-day work.",
  },
  {
    title: "Texas bookkeeping and tax prep first",
    detail: "Firms around New Braunfels and central Texas. Guam comes later.",
  },
  {
    title: "The team and the name stay",
    detail: "We keep the people, and the firm keeps its name.",
  },
  {
    title: "A permanent home, not a flip",
    detail: "We buy to hold the company and operate it.",
  },
] as const

const steps = [
  {
    title: "Intro call",
    detail: "A conversation about the firm and what you want next.",
  },
  {
    title: "Confidential look at the business",
    detail: "A private review of how the firm works and what it would take to own it.",
  },
  {
    title: "Offer",
    detail: "If the firm fits, we make an offer.",
  },
  {
    title: "Transition plan with the owner",
    detail: "A handoff written with you, so the team and the clients know what happens next.",
  },
] as const

export default function HomePage() {
  return (
    <div className="hold-home">
      <section className="journey-wrap pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-4xl">
          <p className="t-eyebrow">AI-first holding company</p>
          <h1 className="mt-6">
            An AI-first permanent home for small businesses whose owners are ready to retire.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We buy successful, non-technical firms and run them for the long term. The current focus is Texas bookkeeping and tax-prep firms, around New Braunfels and central Texas. Guam comes later.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <a href="#contact">Selling your firm?</a>
            </Button>
            <Button asChild className="w-full border-muted-foreground text-foreground sm:w-auto" size="lg" variant="outline">
              <a href="#how-it-works">How it works</a>
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="thesis-heading" className="border-t border-border">
        <div className="journey-wrap py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 id="thesis-heading">Owners are ready to step back.</h2>
            <div className="mt-8 max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Many owners are nearing retirement without a successor. People call that shift the silver tsunami. The firms still have clients and a way of working. What they often lack is a next owner.
              </p>
              <p>
                AI-run back-office operations can improve margins and the service a firm gives its clients. A permanent owner can put that way of working in place and stay with it.
              </p>
            </div>
            <p className="mt-10 max-w-2xl border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
              The model is inspired by the playbooks of operators such as Brad Jacobs, Thrive Holdings, and Long Lake. That is inspiration only. Anchor Marianas is not affiliated with them, endorsed by them, or in any relationship with them.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="buy-heading" className="border-t border-border">
        <div className="journey-wrap py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 id="buy-heading">What we buy</h2>
            <ul className="mt-10 border-t border-border">
              {criteria.map((item) => (
                <li
                  className="grid gap-2 border-b border-border py-6 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] sm:items-baseline sm:gap-12"
                  key={item.title}
                >
                  <h3>{item.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="scroll-mt-28 border-t border-border" id="how-it-works">
        <div className="journey-wrap py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 id="how-heading">How it works for sellers</h2>
            <ol className="mt-10 border-t border-border">
              {steps.map((step, index) => (
                <li
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-b border-border py-6 sm:gap-8"
                  key={step.title}
                >
                  <span className="font-mono-anchor pt-1 text-sm text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="status-heading" className="border-y border-border bg-secondary">
        <div className="journey-wrap py-14 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 id="status-heading">We are in the search stage.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              There are no acquired firms to list.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="scroll-mt-28" id="contact">
        <div className="journey-wrap py-16 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 id="contact-heading">Selling your firm?</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Send a note to Adam. This is the same email already published on this site.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <Button asChild size="lg">
                <a href={sellerMail}>Email Adam</a>
              </Button>
              <a
                className="text-base text-foreground underline underline-offset-4"
                href={sellerMail}
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
