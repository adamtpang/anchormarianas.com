/* Hero.jsx: the eyebrow + bilevel headline + lede + CTA pair. */
function Hero({ bookUrl, onSeeWork }) {
  return (
    <section className="am-section hero" data-screen-label="hero">
      <div className="prose-narrow">
        <p className="eyebrow">Anchor Marianas</p>
        <h1 className="headline">
          We sit with you for 30 minutes, find the knot,
          <span className="ghost">then ship the AI piece that unties it in 5 days.</span>
        </h1>
        <p className="lede">
          Anchor Marianas builds with founders, creators, and operators whose work we respect.
          One at a time. The call is the work, not a sales qualifier.
        </p>
        <div className="cta-cluster">
          <a className="btn-pill lg" href={bookUrl} target="_blank" rel="noopener noreferrer">
            Book the free 30-min untangling call
          </a>
          <span className="small">
            Or read the{" "}
            <a className="link" href="#work" onClick={(e) => { e.preventDefault(); onSeeWork(); }}>
              case studies →
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
