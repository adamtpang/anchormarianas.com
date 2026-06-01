/* OfferSection.jsx: Step 1 untangling call · Step 2 the 5-day build. */
function OfferSection() {
  return (
    <section className="am-section" data-screen-label="offer">
      <div className="prose-narrow">
        <p className="eyebrow">The offer</p>
        <div className="grid-2">
          <div>
            <h3 className="h3">Step 1: The untangling call</h3>
            <p className="body" style={{ marginTop: "0.75rem" }}>
              Free. 30 minutes. Not a sales call. We sit with the problem.
              You walk us through your week. We ask the questions that surface the one knot
              quietly tangling the other twelve. You leave with the knot named and an honest
              read on whether 5 days can untie it.
            </p>
            <p className="small" style={{ marginTop: "0.75rem" }}>
              If it&rsquo;s not a fit, we say so on the call. No follow-up. No nurture sequence.
            </p>
          </div>
          <div>
            <h3 className="h3">Step 2: The 5-day AI build</h3>
            <p className="body" style={{ marginTop: "0.75rem" }}>
              Day 1 we lock the scope of the cure. Days 2 to 4 we build it: a daily Loom,
              ~3 minutes, so you watch it take shape. Day 5 you have a working artifact and a
              one-page run doc your team can use without us.
            </p>
            <p className="small" style={{ marginTop: "0.75rem" }}>
              First pilots are free in exchange for permission to publish the case study.
              After that, $500 flat. Refund if it doesn&rsquo;t work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

window.OfferSection = OfferSection;
