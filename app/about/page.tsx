import Link from "next/link"
import siteConfig from "@/content/site.json"

const bookUrl = siteConfig.discoveryCal

export const metadata = {
  title: "About — Anchor Marianas",
  description:
    "Anchor Marianas is a one-person AI build studio operated by Adam Pang. 5-day builds for founders, creators, and operators whose work we respect.",
}

export default function AboutPage() {
  return (
    <div className="bg-white text-neutral-900">
      <style>{`:root{--ink:#0b3b5c}`}</style>

      <section className="mx-auto max-w-2xl px-6 pt-20 pb-12 sm:pt-28">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          About
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          Anchor Marianas is one person, one sprint at a time.
        </h1>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-20 space-y-8 text-base leading-relaxed text-neutral-800">
        <p>
          Anchor exists because most operators don&rsquo;t need a strategy or another tool.
          They need someone to sit next to them, ask the right questions, find the thing
          that&rsquo;s quietly tangling everything else, and then actually build the piece of
          software that unties it.
        </p>
        <p>
          That&rsquo;s the work. A 30-minute untangling call. Then, if it&rsquo;s a fit, a
          5-day build that ends in a working artifact and a one-page run doc.
        </p>

        <div className="border-t border-neutral-200 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            The operator
          </h2>
          <p className="mt-4">
            Anchor is operated by{" "}
            <a
              href={siteConfig.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-neutral-900"
            >
              Adam Pang
            </a>
            . He&rsquo;s the founder, not the brand. One client at a time, full attention —
            the Rick Rubin model: sit with the artist, find the thing, then ship.
          </p>
          <p className="mt-4 text-sm text-neutral-600">
            adampang.com redirects here. The work happens under Anchor.
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            The thesis
          </h2>
          <p className="mt-4">
            Positive-sum, craft-respecting, optimistic capitalism — a small nod to{" "}
            <a
              href="https://optimism.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-neutral-900"
            >
              optimism.fun
            </a>
            . We work with founders, creators, and operators whose work we respect. We&rsquo;d
            rather build one thing that actually unties a knot than ten things that don&rsquo;t.
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Contact
          </h2>
          <p className="mt-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-4 hover:text-neutral-900"
            >
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-6">
            <a
              href={bookUrl}
              className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Book the untangling call →
            </a>
          </p>
        </div>

        <p className="text-sm text-neutral-600">
          <Link href="/" className="underline underline-offset-4 hover:text-neutral-900">
            ← Back to anchormarianas.com
          </Link>
        </p>
      </section>
    </div>
  )
}
