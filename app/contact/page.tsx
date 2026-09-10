import Link from "next/link"
import site from "@/content/site.json"
import { AgencyHero } from "@/components/agency"
export const metadata = { title: "Start a Website or Webapp Project | Anchor Marianas", description: "Tell Anchor about the website or webapp your business needs. Start by email, prepare a brief, or book a conversation.", alternates: { canonical: "/contact" } }
export default function ContactPage() {
  return <div className="agency-page"><AgencyHero title="Let’s build." body="Tell Adam what you need and when." /><section className="agency-shell agency-section agency-section-short agency-contact"><a className="agency-button break-all" href={`mailto:${site.email}`}>Email Adam</a><p className="agency-small">{site.email}</p><div className="agency-contact-options"><Link href="/survey" className="agency-text-link">Prepare a brief →</Link><a className="agency-text-link" href={site.discoveryCal}>Book a free call ↗</a></div><p className="agency-small">Scope, price and delivery agreed before work starts.</p></section></div>
}
