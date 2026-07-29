/* Audience.jsx: Who this is for · What you bring. */
function Audience() {
  return (
    <section className="am-section" data-screen-label="audience">
      <div className="prose-narrow">
        <div className="grid-2" style={{ marginTop: 0 }}>
          <div>
            <p className="eyebrow">Who this is for</p>
            <p className="body">
              Founders, creators, indie hackers, podcasters, and operators whose work we
              already respect. People we&rsquo;d want to learn from on the call regardless.
            </p>
            <p className="body" style={{ marginTop: "0.75rem" }}>
              If you&rsquo;re on our Dream 25 list, you know. If not, this page is mostly here
              so the people we&rsquo;re working with have something to point at.
            </p>
          </div>
          <div>
            <p className="eyebrow">What you bring</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li className="body">One real recurring loop on the call. Not &ldquo;explore AI.&rdquo; A specific knot.</li>
              <li className="body">Access to the tools or data the cure would touch. Read-only is fine.</li>
              <li className="body">Yourself. You&rsquo;re the one who decides.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Audience = Audience;
