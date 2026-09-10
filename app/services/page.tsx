import { AgencyHero, AgencyServices, AgencyProcess, AgencyCTA } from "@/components/agency"
export const metadata = { title: "Website & Webapp Services | Anchor Marianas", description: "Business websites, focused web applications and ongoing care. Design and engineering from Anchor Marianas.", alternates: { canonical: "/services" } }
export default function ServicesPage() {
  return <div className="agency-page"><AgencyHero eyebrow="Our services" title="Websites. Webapps. Care." body="Design, build and support for your business." /><section className="agency-shell agency-section agency-section-short"><AgencyServices /></section><AgencyProcess /><AgencyCTA /></div>
}
