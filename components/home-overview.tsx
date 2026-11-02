import Link from "next/link"
import services from "@/content/services.json"
import site from "@/content/site.json"

// Server-rendered homepage overview. Every fact here mirrors copy already on
// the site (pricing packages, work.json, contact page) so crawlers and people
// read the same plain-language summary without running JavaScript.
export function HomeOverview() {
  const landing = services.find(s => s.slug === "landing-page-5-day")
  const app = services.find(s => s.slug === "mvp-5-day")
  if (!landing || !app) throw new Error("Missing website or MVP package in service catalogue")
  const landingPrice = landing.price.replace(/\s*flat$/, "")
  const appPrice = app.price.replace(/\s*flat$/, "")
  return <section className="agency-shell agency-section agency-overview">
    <div className="agency-overview-block">
      <h2>What Anchor Marianas does</h2>
      <p>Anchor Marianas is an independent web studio based in Guam, run by Adam Pangelinan and working with businesses remotely. The studio designs and builds websites and webapps, and every project starts with an agreed scope, price and launch date. Clients work directly with Adam from the first brief to the final handoff, and they receive the source code when the build is done.</p>
    </div>
    <div className="agency-overview-block">
      <h2>Packages and pricing</h2>
      <p>The Quick website package costs {landingPrice} flat and covers one page with copy, design, build and deployment, a mobile layout, basic SEO and your existing booking or checkout link. Anchor Marianas runs it as a five-day package, subject to the agreed scope and the <Link href="/terms">terms</Link>. Larger business websites with several service and company pages get a fixed quote before any work starts.</p>
      <p>The Webapp MVP package costs {appPrice} flat and delivers the first version of one useful workflow, built end to end with authentication, a database and deployment. Each MVP includes the source code, a walkthrough and one round of revisions in week one. Bigger applications are quoted separately, and hosting, updates and support can be scoped as an optional care plan. Full details are on the <Link href="/pricing">pricing page</Link>.</p>
    </div>
    <div className="agency-overview-block">
      <h2>Recent work</h2>
      <p>International Distributors, Inc. is a family wholesale food distributor that has served Guam, Rota, Tinian, Saipan and Majuro since 1980. Anchor Marianas built and maintains its production website, including a wholesale account sign-up flow, per-page SEO and a sitemap, as an unpaid engagement. Hilton Guam is a paid engagement covering website and gym app work. Both are described on the <Link href="/work">work page</Link>.</p>
    </div>
    <div className="agency-overview-block">
      <h2>How to start a project</h2>
      <p>Starting a project with Anchor Marianas does not require a call. Send a short brief by email to <a href={`mailto:${site.email}`}>{site.email}</a> or use the <Link href="/contact">contact page</Link>, and the deliverables, price and launch date are agreed before work begins. Businesses that already have a website can run a free <Link href="/scan">AnchorScan</Link> check first to see what is worth fixing.</p>
    </div>
  </section>
}
