/* AboutView.jsx: /about page recreation. */
function AboutView({ site, onNavigate, bookUrl }) {
  return (
    <React.Fragment>
      <section className="am-section hero" data-screen-label="about-hero">
        <div className="prose-narrow" style={{ maxWidth: "36rem" }}>
          <p className="eyebrow">About</p>
          <h1 className="headline" style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3rem)" }}>
            Anchor Marianas is one person, one sprint at a time.
          </h1>
        </div>
      </section>
      <section className="am-section" style={{ borderTop: 0 }}>
        <div className="prose-narrow" style={{ maxWidth: "36rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <p className="body">
            Anchor exists because most operators don&rsquo;t need a strategy or another tool.
            They need someone to sit next to them, ask the right questions, find the thing
            that&rsquo;s quietly tangling everything else, and then actually build the piece of
            software that unties it.
          </p>
          <p className="body">
            That&rsquo;s the work. A 30-minute untangling call. Then, if it&rsquo;s a fit, a
            5-day build that ends in a working artifact and a one-page run doc.
          </p>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <p className="eyebrow">The operator</p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
              <img
                src="../../assets/adam.jpg"
                alt="Adam Pang"
                style={{ width: 72, height: 72, borderRadius: 9999, objectFit: "cover", objectPosition: "30% 30%", border: "1px solid var(--border)" }}
              />
              <div>
                <div className="font-display" style={{ fontSize: "1.5rem", lineHeight: 1.1 }}>Adam Tomas Pangelinan</div>
                <div className="coord" style={{ marginTop: 4 }}>{site.origin}</div>
              </div>
            </div>
            <p className="body">
              Anchor is operated by{" "}
              <a href={site.socials.x} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>Adam Pang</a>.
              He&rsquo;s the founder, not the brand. One client at a time, full attention,
              the Rick Rubin model: sit with the artist, find the thing, then ship.
            </p>
            <p className="small" style={{ marginTop: "0.75rem" }}>
              adampang.com redirects here. The work happens under Anchor.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <p className="eyebrow">The thesis</p>
            <p className="body">
              Positive-sum, craft-respecting, optimistic capitalism, a small nod to{" "}
              <a href="https://optimism.fun" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>optimism.fun</a>.
              We work with founders, creators, and operators whose work we respect.
              We&rsquo;d rather build one thing that actually unties a knot than ten things
              that don&rsquo;t.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <p className="eyebrow">Contact</p>
            <p className="body" style={{ marginBottom: "1.25rem" }}>
              <a href={`mailto:${site.email}`} style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                {site.email}
              </a>
            </p>
            <a className="btn-pill" href={bookUrl} target="_blank" rel="noopener noreferrer">
              Book the untangling call →
            </a>
          </div>

          <p className="small">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
              style={{ textDecoration: "underline", textUnderlineOffset: 4, color: "var(--fg)" }}
            >
              ← Back to anchormarianas.com
            </a>
          </p>
        </div>
      </section>
    </React.Fragment>
  );
}

window.AboutView = AboutView;
