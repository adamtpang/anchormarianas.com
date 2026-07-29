import Link from "next/link"
import siteConfig from "@/content/site.json"

const bookUrl = siteConfig.discoveryCal

export const metadata = {
  title: "About — Anchor Marianas",
  description:
    "Anchor Marianas helps Guam businesses grow by turning their customer reviews into a clear plan. Operated by founder Adam Pang. Working with Hilton.",
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
          A Guam company that grows Guam businesses.
        </h1>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-20 space-y-8 text-base leading-relaxed text-neutral-800">
        <p>
          Anchor Marianas exists because the answer to &ldquo;how do we grow?&rdquo; is usually
          already written down — in the reviews your customers leave. Most operators are too
          busy running the business to read them as a system. We do that for you, then build
          the software and AI that fixes what we find.
        </p>
        <p>
          It starts with Anchor Scan: we analyze your Google reviews, deliver a clear
          diagnostic of what&rsquo;s costing you customers and where AI helps, and then work
          with you to implement the fixes.
        </p>

        <div className="border-t border-neutral-200 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            The founder
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
            . He&rsquo;s the founder, not the headline. The work happens under Anchor, one
            business at a time, with full attention.
          </p>
          <p className="mt-4 text-sm text-neutral-600">
            adampang.com redirects here.
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Who we work with
          </h2>
          <p className="mt-4">
            Guam businesses that want to grow — including{" "}
            <span className="font-medium text-neutral-900">Hilton</span>. If your customers are
            already talking about you online, there&rsquo;s a growth plan in what they say.
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
              Book a free discovery call →
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
