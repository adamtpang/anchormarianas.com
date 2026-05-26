import Link from "next/link"
import siteConfig from "@/content/site.json"

const bookUrl = siteConfig.discoveryCal

export const metadata = {
  title: "Adam Pang — Musician. Philosopher. Builder.",
  description:
    "I diagnose your biggest operational bottleneck, then build you a working AI cure in 5 days.",
}

export default function HomePage() {
  return (
    <div className="bg-white text-neutral-900">
      <style>{`:root{--ink:#0b3b5c}`}</style>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 sm:pt-32 sm:pb-24">
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          Adam Pang
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
          Musician. Philosopher. Builder. I diagnose your biggest operational bottleneck, then build you a working AI cure in 5 days.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={bookUrl}
            className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
          >
            Book a free 30-min discovery call
          </a>
          <p className="text-sm text-neutral-600">
            Or see what I build{" "}
            <Link href="/builds" className="underline underline-offset-4 hover:text-neutral-900">
              → /builds
            </Link>
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 grid gap-12 sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Music</h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-700">
              {/* TODO */}I write and record songs from Guam. Quiet, patient music about ocean, family, and time.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Philosophy</h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-700">
              {/* TODO */}I think and write about agency, attention, and what it means to live well in an accelerating world. Short essays, no jargon.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Business</h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-700">
              {/* TODO */}I run AI Build Sprints: 5 days, one bottleneck, one working artifact. Past work includes{" "}
              <Link href="/anchor" className="underline underline-offset-4 hover:text-neutral-900">Anchor Marianas</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 space-y-4 text-lg">
          <p>
            <Link href="/builds" className="font-semibold underline underline-offset-4 hover:text-neutral-900">
              AI Build Sprints →
            </Link>{" "}
            <span className="text-neutral-600">5-day diagnosis + build. $500 flat.</span>
          </p>
          <p>
            <Link href="/anchor" className="font-semibold underline underline-offset-4 hover:text-neutral-900">
              Anchor Marianas →
            </Link>{" "}
            <span className="text-neutral-600">Productized AI for Guam businesses. Currently paused.</span>
          </p>
          <p>
            <Link href="/writing" className="font-semibold underline underline-offset-4 hover:text-neutral-900">
              Writing →
            </Link>{" "}
            <span className="text-neutral-600">Essays on agency, building, and the Pacific.</span>
          </p>
        </div>
      </section>
    </div>
  )
}
