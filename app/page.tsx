import Link from "next/link"
import { AgencyActions, AgencyServices, ProjectShowcase } from "@/components/agency"
export const metadata = { title: "Websites & Webapps for Businesses | Anchor Marianas", description: "Business websites and webapps, from idea to launch. Clear scope, fixed-price packages and direct support from Anchor Marianas.", alternates: { canonical: "/" } }
export default function HomePage() {
  return <div className="agency-page">
    <section className="agency-shell agency-home-hero"><div><h1><span>Websites & webapps</span><br />for businesses.</h1><AgencyActions /></div><ProjectShowcase /></section>
    <section className="agency-proof"><div className="agency-shell"><div><strong>Hilton Guam</strong><span>Paid website & gym app work</span></div><div><strong>International Distributors, Inc.</strong><span>Website build & maintenance · unpaid engagement</span></div></div></section>
    <section className="agency-shell agency-section"><div className="agency-section-heading"><h2>What we build</h2></div><AgencyServices /><Link href="/services" className="agency-text-link">All services →</Link></section>
    <section className="agency-shell agency-section agency-scan-callout"><div><h2>Already have a website?</h2><p>Check it for free with AnchorScan.</p></div><Link href="/scan" className="agency-button agency-secondary">Scan your website →</Link></section>
  </div>
}
