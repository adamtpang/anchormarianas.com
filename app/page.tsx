import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AgencyServices } from "@/components/agency"
import { HomeOverview } from "@/components/home-overview"

export const metadata = {
  title: "Anchor Marianas | Check a business before you buy it",
  description:
    "Free pre-purchase check from a business's public Google reviews, plus websites, apps and AI tools for the Main Street businesses worth keeping.",
  alternates: { canonical: "/" },
}

// Figures come from the first /check test run on 2026-10-29 to 31: ten named
// Austin businesses, seven with a known change of owner, five of those caught
// from reviews alone. Update them only from a new, logged test run.
const proof = [
  { value: "10", label: "Austin businesses checked in our first test" },
  { value: "5 of 6", label: "confirmed owner changes caught from reviews alone" },
  { value: "$0", label: "for buyers. The check is free" },
]

const paths = [
  {
    title: "Buying a business",
    body: "Run the free check before you pay for an NDA, a broker call or a quality-of-earnings review. Know what customers already know.",
    href: "/check",
    cta: "Check a business",
  },
  {
    title: "Selling someday",
    body: "Run the same check on your own business to see what a buyer will see. Then talk to us about what a clean sale needs.",
    href: "/contact",
    cta: "Talk to us",
  },
  {
    title: "Keeping your business",
    body: "We build the websites, apps and AI tools that take repetitive work off your team. Fixed scope, fixed price, direct support.",
    href: "/services",
    cta: "See what we build",
  },
]

export default function HomePage() {
  return (
    <div className="agency-page">
      <section className="agency-shell agency-heading agency-mission-hero">
        <p className="agency-eyebrow">Timely tools for timeless businesses</p>
        <h1>Good businesses should outlive their owners.</h1>
        <p className="agency-lead">
          Thousands of profitable Main Street businesses will change hands as their owners retire.
          Anchor helps the next owner see what they are buying, and brings AI into the businesses
          worth keeping.
        </p>
        <div className="agency-actions">
          <Link className="agency-button" href="/check">
            Check a business for free <ArrowRight size={18} aria-hidden />
          </Link>
          <Link className="agency-button agency-secondary" href="/contact">
            Selling someday? Talk to us
          </Link>
        </div>
      </section>

      <section className="agency-shell agency-section agency-section-short">
        <div className="agency-section-heading">
          <h2>What a listing will not tell you</h2>
          <p className="agency-lead">
            Listings show the seller&apos;s numbers. Customers tell you the rest. The free check reads up
            to 150 of a business&apos;s newest Google reviews and returns the rating trend, recurring
            complaints with real quotes, signs of a change of owner, and the questions to ask before
            you sign.
          </p>
        </div>
        <dl className="agency-stats">
          {proof.map((p) => (
            <div key={p.label}>
              <dt>{p.value}</dt>
              <dd>{p.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="agency-shell agency-section">
        <div className="agency-grid">
          {paths.map((p) => (
            <article className="agency-card agency-package" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <Link href={p.href} className="agency-text-link">
                {p.cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="agency-shell agency-section agency-mission">
        <h2>Why we do this</h2>
        <p>
          The best business in a town is often decades old: the bakery, the tax office, the shop
          everyone knows. Most were built before today&apos;s tools existed, and many have no plan
          for the day the owner steps back.
        </p>
        <p>
          We think AI should make the people in these businesses faster and better paid, not fewer.
          Our long-term aim is to own and run a small number of them for decades, the way the best
          holding companies do. We start by helping buyers see clearly and owners run better.
        </p>
      </section>

      <section className="agency-proof">
        <div className="agency-shell">
          <div>
            <strong>Hilton Guam</strong>
            <span>Paid website & gym app work</span>
          </div>
          <div>
            <strong>International Distributors, Inc.</strong>
            <span>Website build & maintenance · unpaid engagement</span>
          </div>
        </div>
      </section>

      <HomeOverview />

      <section className="agency-shell agency-section">
        <div className="agency-section-heading">
          <h2>What we build</h2>
        </div>
        <AgencyServices />
        <Link href="/services" className="agency-text-link">
          All services →
        </Link>
      </section>

      <section className="agency-shell agency-section agency-scan-callout">
        <div>
          <h2>Already have a website?</h2>
          <p>Check it for free with AnchorScan.</p>
        </div>
        <Link href="/scan" className="agency-button agency-secondary">
          Scan your website →
        </Link>
      </section>
    </div>
  )
}
