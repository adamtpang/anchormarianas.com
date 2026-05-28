import Link from "next/link"
import siteConfig from "@/content/site.json"

const bookUrl = siteConfig.discoveryCal

export const metadata = {
  title: "Work — Anchor Marianas",
  description:
    "Case studies from Anchor Marianas 5-day AI builds. First case study shipping soon.",
}

export default function WorkPage() {
  return (
    <div className="bg-white text-neutral-900">
      <style>{`:root{--ink:#0b3b5c}`}</style>

      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          Work
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          Case studies, written honestly.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700">
          Each Anchor sprint ends with one artifact and one short write-up: the knot we found,
          the cure we built, what worked, what didn&rsquo;t. The public record is how the next
          right person finds us.
        </p>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="rounded-md border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
            <p className="text-sm font-mono uppercase tracking-[0.18em] text-neutral-500">
              In progress
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              First case study shipping soon.
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-base leading-relaxed text-neutral-600">
              Pilot #1 is mid-sprint. The trade is permission to publish — knot, build, and
              the honest after-read of whether it actually moved the loop.
            </p>
            <div className="mt-8">
              <a
                href={bookUrl}
                className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Want to be case study #2? Book the call →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            What a case study will contain
          </h2>
          <ul className="mt-6 space-y-4 text-base leading-relaxed text-neutral-700">
            <li>The knot — the recurring loop we found on the call, in plain words.</li>
            <li>The cure — what we built in 5 days and why it was the smallest version that worked.</li>
            <li>The honest after-read — what shipped, what we&rsquo;d do differently, and whether the loop is actually quieter now.</li>
          </ul>
          <p className="mt-10 text-sm text-neutral-600">
            <Link href="/" className="underline underline-offset-4 hover:text-neutral-900">
              ← Back to the offer
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
