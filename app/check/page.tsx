import { BuyReportForm } from "./buy-report-form"

export const metadata = {
  title: "Check a business before you buy it | Anchor",
  description:
    "Free buyer report from a business's public Google reviews: rating trend by year, recurring complaints with real quotes, signs of an ownership change, and the questions to ask the seller.",
  alternates: { canonical: "/check" },
}

export default function BuyPage() {
  return (
    <div className="agency-page">
      <section className="agency-shell agency-heading">
        <p className="agency-small">Free for buyers</p>
        <h1>Hear the customers before you hear the seller.</h1>
        <p className="agency-lead">
          Type the name of a restaurant, salon, or shop you are thinking of buying. Anchor reads up
          to 150 of its newest Google reviews and tells you what customers keep saying, whether
          it is getting better or worse, and what to ask before you sign anything.
        </p>
      </section>

      <section className="agency-shell agency-section agency-section-short">
        <BuyReportForm />
      </section>

      <section className="agency-shell agency-section">
        <div className="agency-section-heading">
          <h2>What the report is, and is not</h2>
        </div>
        <div className="agency-grid">
          <article className="agency-card agency-package">
            <h3>Counted, not guessed</h3>
            <p>
              Every number comes from review rows, and every quote is a real excerpt. Nothing is
              projected, scored by a model, or estimated.
            </p>
          </article>
          <article className="agency-card agency-package">
            <h3>Questions, not verdicts</h3>
            <p>
              Reviews are opinions. The report tells you what to ask the seller and what to check
              in the books, so you walk into the call prepared.
            </p>
          </article>
          <article className="agency-card agency-package">
            <h3>Public listings only</h3>
            <p>
              It reads the business's public Google listing. If a listing is anonymous, run it
              after the broker tells you the name under NDA.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}
