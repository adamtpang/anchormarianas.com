import Image from "next/image"
import Link from "next/link"
import { AgencyHero, AgencyCTA } from "@/components/agency"
export const metadata = { title: "About Anchor Marianas", description: "Meet Adam Pangelinan, the independent builder behind Anchor Marianas. Websites and webapps for businesses, based in Guam and working remotely.", alternates: { canonical: "/about" } }
export default function AboutPage() {
  return <div className="agency-page"><AgencyHero eyebrow="About Anchor" title="Meet Adam." body="Independent designer and developer. Based in Guam, working remotely." /><section className="agency-shell agency-section agency-about"><Image src="/adam.jpg" alt="Adam Pangelinan, founder of Anchor Marianas" width={600} height={700} className="agency-founder" /><div><h2>Your builder, start to finish.</h2><p>I build websites that help customers find you, and webapps that make work easier.</p><p>You work directly with me on scope, design and launch.</p><Link href="/work" className="agency-text-link">See my work →</Link></div></section><AgencyCTA /></div>
}
