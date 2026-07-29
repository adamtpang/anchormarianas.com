/* CaseStudyCard.jsx: preselection unit. Logo + knot/cure/after-read structure.
   Render N of these in a column to show "I am already solving problems for businesses like yours." */
function CaseStudyCard({
  logoSrc,
  clientName,
  industry,
  status = "Live",
  timeline = "5-day build",
  knot,
  cure,
  afterRead,
  href,
  onClick,
}) {
  return (
    <article className="case-card" data-screen-label={`case-${clientName}`}>
      <div className="cc-head">
        {logoSrc ? (
          <div className="cc-logo">
            <img src={logoSrc} alt="" />
          </div>
        ) : null}
        <div className="cc-name">
          <p className="eyebrow" style={{ margin: 0 }}>Case study</p>
          <h3>{clientName}</h3>
          <p className="cc-meta">{industry}</p>
        </div>
        <div className="cc-tags">
          <span className="cc-badge">{timeline}</span>
          <span className="cc-status">{status}</span>
        </div>
      </div>
      <dl className="cc-grid">
        <div>
          <dt>The knot</dt>
          <dd>{knot}</dd>
        </div>
        <div>
          <dt>The cure</dt>
          <dd>{cure}</dd>
        </div>
        <div>
          <dt>The after-read</dt>
          <dd>{afterRead}</dd>
        </div>
      </dl>
      {href ? (
        <a
          className="cc-more"
          href={href}
          onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
        >Read the full writeup →</a>
      ) : null}
    </article>
  );
}

window.CaseStudyCard = CaseStudyCard;
