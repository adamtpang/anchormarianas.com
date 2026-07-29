/* Testimonial.jsx: large pull-quote with attribution.
   Uses the real chovin quote by default (verified, on file in content/testimonials.json). */
function Testimonial({ quote, author, context, source }) {
  return (
    <section className="am-section" data-screen-label="testimonial">
      <div className="prose-narrow">
        <p className="eyebrow">What people say</p>
        <blockquote className="pull-quote">
          <span className="qm">&ldquo;</span>{quote}<span className="qm">&rdquo;</span>
        </blockquote>
        <div className="attr">
          <div className="who">
            <b>{author}</b>
            {context ? <span>{context}</span> : null}
          </div>
          {source ? <span className="src">{source}</span> : null}
        </div>
      </div>
    </section>
  );
}

window.Testimonial = Testimonial;
