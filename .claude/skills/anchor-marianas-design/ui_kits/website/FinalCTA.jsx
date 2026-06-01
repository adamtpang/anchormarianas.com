/* FinalCTA.jsx. Closing pull-the-trigger panel. */
function FinalCTA({ bookUrl }) {
  return (
    <section className="am-section tall" data-screen-label="final-cta">
      <div className="prose-narrow" style={{ textAlign: "center" }}>
        <h2 className="h2" style={{ fontSize: "clamp(1.75rem, 3vw + 1rem, 2.5rem)" }}>
          Book the untangling call.
        </h2>
        <p className="small" style={{ marginTop: "1rem", color: "var(--fg-soft)" }}>
          30 minutes. Free. The call is the work.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <a className="btn-pill lg" href={bookUrl} target="_blank" rel="noopener noreferrer">
            Book the call →
          </a>
        </div>
      </div>
    </section>
  );
}

window.FinalCTA = FinalCTA;
