/* SprintRun.jsx: How a sprint runs. 01/02/03 ordered list. */
function SprintRun() {
  return (
    <section className="am-section alt" data-screen-label="sprint">
      <div className="prose-narrow">
        <p className="eyebrow">How a sprint runs</p>
        <ol className="run">
          <li>
            <span className="n">01</span>
            <p><b>Day 1: Lock the cure.</b>{" "}
              We agree on the smallest version of the build that still unties the knot.
            </p>
          </li>
          <li>
            <span className="n">02</span>
            <p><b>Days 2 to 4: Build.</b>{" "}
              ~3-minute Loom each day. You watch it take shape. You answer one or two questions.
            </p>
          </li>
          <li>
            <span className="n">03</span>
            <p><b>Day 5: Handoff.</b>{" "}
              You get a working artifact and a one-page run doc. Most of it is in your hands
              and running within 2 hours of the Day 5 call.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}

window.SprintRun = SprintRun;
