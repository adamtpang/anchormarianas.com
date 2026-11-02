import Link from "next/link"
import site from "@/content/site.json"

// Server-rendered homepage overview. The sentences match the visible
// homepage, so a crawler and a reader get the same plain-language account
// without running JavaScript.
export function HomeOverview() {
  return (
    <section className="agency-shell agency-section agency-overview">
      <div className="agency-overview-block">
        <h2>What Anchor Marianas does</h2>
        <p>
          Anchor Marianas is an AI-first holding company. It buys successful, non-technical small businesses and runs them for the long term. The company is in the search stage. The current focus is Texas bookkeeping and tax-prep firms, around New Braunfels and central Texas. Guam comes later.
        </p>
        <p>
          Many owners are nearing retirement without a successor. People call that shift the silver tsunami. The firms still have clients and a way of working. What they often lack is a next owner. AI-run back-office operations can improve margins and the service a firm gives its clients. A permanent owner can put that way of working in place and stay with it.
        </p>
      </div>
      <div className="agency-overview-block">
        <h2>What we buy</h2>
        <p>
          Anchor looks for a recurring client base and an owner who is ready to retire or leave the day-to-day work. Texas bookkeeping and tax-prep firms come first, around New Braunfels and central Texas. The team stays, and the firm keeps its name. The aim is a permanent home, not a flip. The company is bought to be held and operated.
        </p>
      </div>
      <div className="agency-overview-block">
        <h2>How it works for sellers</h2>
        <p>
          A seller starts with an intro call about the firm and what they want next. Next is a confidential look, a private review of how the firm works and what it would take to own it. If the firm fits, Anchor makes an offer. Then a transition plan is written with the owner, so the team and the clients know what happens next. This page does not state a timeline or a price.
        </p>
      </div>
      <div className="agency-overview-block">
        <h2>Free buyer check</h2>
        <p>
          If you are buying a business from someone else, the <Link href="/check">free check</Link> reads up to 150 of its newest public Google reviews. It returns the rating trend, recurring complaints with real quotes, signs of a change of owner, and questions to ask before you sign.
        </p>
      </div>
      <div className="agency-overview-block">
        <h2>Where things stand</h2>
        <p>
          We are in the search stage. There are no acquired firms to list. The model is inspired by the playbooks of operators such as Brad Jacobs, Thrive Holdings, and Long Lake. That is inspiration only. Anchor Marianas is not affiliated with them, endorsed by them, or in any relationship with them.
        </p>
      </div>
      <div className="agency-overview-block">
        <h2>Selling your firm</h2>
        <p>
          Send a note to Adam at <a href={`mailto:${site.email}?subject=${encodeURIComponent("Selling your firm")}`}>{site.email}</a>. This is the same email already published on this site. Website and webapp work remains on the <Link href="/services">services page</Link>.
        </p>
      </div>
    </section>
  )
}
