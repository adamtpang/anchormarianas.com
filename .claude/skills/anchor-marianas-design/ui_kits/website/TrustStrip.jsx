/* TrustStrip.jsx: preselection signal. Hilton lives here. */
function TrustStrip({ partners, eyebrow }) {
  return (
    <section className="am-section" data-screen-label="trust-strip">
      <div className="prose-narrow">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <div className="trust-strip">
          {partners.map((p, i) => (
            p.kind === "logo" ? (
              <img
                key={p.name}
                className="trust-logo"
                src={p.src}
                alt={p.name}
                title={p.name}
              />
            ) : (
              <span
                key={p.name}
                className={p.bold ? "trust-wordmark bold" : "trust-wordmark"}
              >{p.name}</span>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

window.TrustStrip = TrustStrip;
