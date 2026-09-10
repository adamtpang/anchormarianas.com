import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Code2, Globe, Wrench } from "lucide-react"
import services from "@/content/services.json"

export function AgencyActions() {
  return <div className="agency-actions"><Link className="agency-button" href="/contact">Start a project <ArrowRight size={18} aria-hidden /></Link><Link className="agency-button agency-secondary" href="/pricing">View pricing</Link></div>
}
export function AgencyHero({ title, body }: { eyebrow?: string; title: string; body?: string }) {
  return <section className="agency-shell agency-heading"><h1>{title}</h1>{body && <p className="agency-lead">{body}</p>}</section>
}
export function ProjectShowcase() {
  return <div className="agency-showcase"><div className="agency-browser-bar"><span /><span /><span /><p>Built by Anchor · IDI</p></div><Image src="/work/idi/homepage.png" alt="International Distributors, Inc. website built by Anchor" width={1440} height={900} priority className="agency-project-image" /><div className="agency-showcase-note"><span>Business website</span><Link href="/work">View work <ArrowRight size={16} aria-hidden /></Link></div></div>
}
export function AgencyServices() {
  const cards = [
    { icon: Globe, title: "Websites", body: "Help customers find you and get in touch.", label: "Business websites" },
    { icon: Code2, title: "Webapps", body: "Bookings, customer portals and tools for your team.", label: "Business webapps" },
    { icon: Wrench, title: "Care", body: "Updates, hosting and support. Scoped separately.", label: "Ongoing care" },
  ]
  return <div className="agency-grid">{cards.map(c => <article className="agency-card" key={c.label}><c.icon className="agency-icon" size={28} aria-hidden /><h3>{c.title}</h3><p>{c.body}</p></article>)}</div>
}
export function AgencyProcess() {
  return <section className="agency-tint"><div className="agency-shell agency-section"><div className="agency-section-heading"><h2>How it works</h2></div><ol className="agency-grid agency-process">{[
    ["Tell us the goal", "What should your website or app help you do?"],
    ["Agree the scope", "Set the deliverables, price and launch date."],
    ["Review and launch", "Approve the build. Get the code and handoff."],
  ].map(([title, body], i) => <li key={title}><span className="agency-step">0{i + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></section>
}
export function AgencyPackages() {
  const landing = services.find(s => s.slug === "landing-page-5-day")
  const app = services.find(s => s.slug === "mvp-5-day")
  if (!landing || !app) throw new Error("Missing website or MVP package in service catalogue")
  const packages = [
    { title: "Quick website", price: landing.price, detail: "One page. One clear next step.", points: ["Copy, design, build and deployment", "Mobile layout and basic SEO", "Your existing booking or checkout link", "Domain and source-code ownership"], note: "Five-day package, subject to agreed scope and terms." },
    { title: "Business website", price: "Fixed quote", detail: "Room for the whole business.", points: ["Multiple service and company pages", "Design around your customer journey", "Content and integrations scoped together", "Launch checks and ownership handoff"], note: "Price and delivery date agreed before work starts." },
    { title: "Webapp MVP", price: app.price, detail: "The first version of one useful workflow.", points: ["One core workflow, built end to end", "Authentication, database and deployment", "Source code and walkthrough", "One round of revisions in week one"], note: "Five-day package for an agreed MVP scope. Larger apps are quoted separately." },
  ]
  return <div className="agency-grid">{packages.map((p, i) => <article className={`agency-card agency-package ${i === 1 ? "agency-package-featured" : ""}`} key={p.title}><h3>{p.title}</h3><p>{p.detail}</p><div className="agency-price">{p.price}</div><ul>{p.points.map(point => <li key={point}><Check size={17} aria-hidden /><span>{point}</span></li>)}</ul><Link href="/contact" className="agency-button">Start a project <ArrowRight size={16} aria-hidden /></Link><p className="agency-small">{p.note}</p></article>)}</div>
}
export function AgencyFAQ() {
  return <div className="agency-faq">{[
    ["Do I need to know exactly what to build?", "No. Tell us the goal. We’ll help define the scope."],
    ["Can you work with my existing website?", "Yes. We can redesign it or improve specific parts."],
    ["How long does a project take?", "Five days for the agreed landing-page or MVP package, subject to our terms. Larger projects get a separate timeline."],
    ["Do I own the website or app?", "You get the source code. We agree domain ownership and third-party accounts before building."],
    ["Are hosting and updates included?", "They are scoped separately. Manage it yourself or add a care plan."],
    ["Do we have to start with a call?", "No. Email or a short brief works too."],
  ].map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
}
export function AgencyCTA() {
  return <section className="agency-shell agency-section"><div className="agency-cta"><h2>What do you want to build?</h2><div className="agency-actions"><Link href="/contact" className="agency-button">Start a project <ArrowRight size={18} aria-hidden /></Link></div></div></section>
}
