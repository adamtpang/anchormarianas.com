import Link from "next/link"
import siteConfig from "@/content/site.json"

const bookUrl = siteConfig.discoveryCal

export const metadata = {
  title: "Anchor Marianas — 5-day AI builds for founders, creators, and operators",
  description:
    "Sit with us for 30 minutes. We find the knot in your work and ship the AI piece that unties it in 5 days.",
}

export default function HomePage() {
  return (
    <div className="bg-white text-neutral-900">
      <style>{`:root{--ink:#0b3b5c}`}</style>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 sm:pt-32 sm:pb-24">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          Anchor Marianas
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          We sit with you for 30 minutes, find the knot,
          <span className="block text-neutral-500">
            then ship the AI piece that unties it in 5 days.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
          Anchor Marianas builds with founders, creators, and operators whose work we respect.
          One at a time. The call is the work — not a sales qualifier.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={bookUrl}
            className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
          >
            Book the free 30-min untangling call
          </a>
          <p className="text-sm text-neutral-600">
            Or read the{" "}
            <Link href="/work" className="underline underline-offset-4 hover:text-neutral-900">
              case studies →
            </Link>
          </p>
        </div>
      </section>

      {/* Offer */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            The offer
          </h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Step 1 — The untangling call
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-700">
                Free. 30 minutes. Not a sales call — we sit with the problem.
                You walk us through your week. We ask the questions that surface the one knot
                quietly tangling the other twelve. You leave with the knot named and an honest
                read on whether 5 days can untie it.
              </p>
              <p className="mt-3 text-sm text-neutral-600">
                If it&rsquo;s not a fit, we say so on the call. No follow-up. No nurture sequence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Step 2 — The 5-day AI build
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-700">
                Day 1 we lock the scope of the cure. Days 2–4 we build it — a daily Loom,
                ~3 minutes, so you watch it take shape. Day 5 you have a working artifact and a
                one-page run doc your team can use without us.
              </p>
              <p className="mt-3 text-sm text-neutral-600">
                First pilots are free in exchange for permission to publish the case study.
                After that, $500 flat. Refund if it doesn&rsquo;t work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            How a sprint runs
          </h2>
          <ol className="mt-8 space-y-6 text-base leading-relaxed text-neutral-800">
            <li className="flex gap-4">
              <span className="font-mono text-sm text-neutral-500 pt-0.5">01</span>
              <p>
                <strong className="text-neutral-900">Day 1 — Lock the cure.</strong>{" "}
                We agree on the smallest version of the build that still unties the knot.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-sm text-neutral-500 pt-0.5">02</span>
              <p>
                <strong className="text-neutral-900">Days 2–4 — Build.</strong>{" "}
                ~3-minute Loom each day. You watch it take shape. You answer one or two questions.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-sm text-neutral-500 pt-0.5">03</span>
              <p>
                <strong className="text-neutral-900">Day 5 — Handoff.</strong>{" "}
                You get a working artifact and a one-page run doc. Most of it is in your hands
                and running within 2 hours of the Day 5 call.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Who this is for */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Who this is for
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-700">
              Founders, creators, indie hackers, podcasters, and operators whose work we already
              respect. People we&rsquo;d want to learn from on the call regardless.
            </p>
            <p className="mt-3 text-base leading-relaxed text-neutral-700">
              If you&rsquo;re on our Dream 25 list, you know. If not, this page is mostly here
              so the people we&rsquo;re working with have something to point at.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              What you bring
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-neutral-700">
              <li>One real recurring loop on the call. Not &ldquo;explore AI.&rdquo; A specific knot.</li>
              <li>Access to the tools or data the cure would touch. Read-only is fine.</li>
              <li>Yourself. You&rsquo;re the one who decides.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Proof / empty state */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Case studies
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-700">
            First case study shipping soon. The trade for pilot #1 is permission to write it up
            honestly — the knot, the build, what worked, what didn&rsquo;t.
          </p>
          <p className="mt-4">
            <Link
              href="/work"
              className="font-semibold underline underline-offset-4 hover:text-neutral-900"
            >
              See work →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Book the untangling call.
          </h2>
          <p className="mt-4 text-base text-neutral-600">30 minutes. Free. The call is the work.</p>
          <div className="mt-8">
            <a
              href={bookUrl}
              className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90"
            >
              Book the call →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
