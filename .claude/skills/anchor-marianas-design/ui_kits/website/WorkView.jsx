/* WorkView.jsx: /work page recreation. Now renders real case-study cards. */
function WorkView({ onNavigate, bookUrl, cases = [] }) {
  const hasCases = cases.length > 0;
  return (
    <React.Fragment>
      <section className="am-section hero" data-screen-label="work-hero">
        <div className="prose-narrow">
          <p className="eyebrow">Work</p>
          <h1 className="headline" style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3rem)" }}>
            Case studies, written honestly.
          </h1>
          <p className="lede">
            Each Anchor sprint ends with one artifact and one short write-up: the knot we found,
            the cure we built, what worked, what didn&rsquo;t. The public record is how the
            next right person finds us.
          </p>
        </div>
      </section>

      <section className="am-section alt" data-screen-label="work-list">
        <div className="prose-narrow">
          {hasCases ? (
            <React.Fragment>
              <p className="eyebrow">Shipped</p>
              {cases.map((c) => <CaseStudyCard key={c.clientName} {...c} />)}
              <div className="empty" style={{ marginTop: "2.5rem" }}>
                <p className="eb">Pipeline</p>
                <h3>Next pilot starts when we find the next right knot.</h3>
                <p>
                  We work with one client at a time. Trade for pilot pricing is permission to
                  publish the writeup.
                </p>
                <div className="more">
                  <a className="btn-pill" href={bookUrl} target="_blank" rel="noopener noreferrer">
                    Book the untangling call →
                  </a>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="empty">
              <p className="eb">In progress</p>
              <h3>First case study shipping soon.</h3>
              <p>
                Pilot #1 is mid-sprint. The trade is permission to publish: knot, build, and
                the honest after-read of whether it actually moved the loop.
              </p>
              <div className="more">
                <a className="btn-pill" href={bookUrl} target="_blank" rel="noopener noreferrer">
                  Want to be case study #2? Book the call →
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="am-section">
        <div className="prose-narrow">
          <p className="eyebrow">What every case study contains</p>
          <ul style={{ listStyle: "none", margin: "1.5rem 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li className="body">The knot: the recurring loop we found on the call, in plain words.</li>
            <li className="body">The cure: what we built in 5 days and why it was the smallest version that worked.</li>
            <li className="body">The honest after-read: what shipped, what we&rsquo;d do differently, and whether the loop is actually quieter now.</li>
          </ul>
          <p className="small" style={{ marginTop: "2.5rem" }}>
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
              style={{ textDecoration: "underline", textUnderlineOffset: 4, color: "var(--fg)" }}
            >
              ← Back to the offer
            </a>
          </p>
        </div>
      </section>
    </React.Fragment>
  );
}

window.WorkView = WorkView;
