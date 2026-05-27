import Link from "next/link"
import siteConfig from "@/content/site.json"

const bookUrl = siteConfig.calendly

export const metadata = {
  title: "Anchor Marianas — a project by Adam Pang",
  description:
    "Anchor Marianas: AI workflows for Guam businesses. A project by Adam Pang. Currently paused.",
}

export default function AnchorPage() {
  return (
    <div className="bg-white text-neutral-900">
      <style>{`:root{--ink:#0b3b5c}`}</style>

      {/* Banner */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-3 text-sm text-neutral-700 flex flex-wrap items-center justify-between gap-2">
          <span>
            <strong>Anchor Marianas</strong> — a project by Adam Pang. Currently paused.
          </span>
          <Link href="/" className="underline underline-offset-4 hover:text-neutral-900">
            ← back to anchormarianas.com
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          Anchor · Built on Guam
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          AI workflows for Guam businesses.
          <span className="block text-neutral-500">Fixed price. Shipped in 7 days.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
          One workflow that saves your team real hours. $750. If it doesn&rsquo;t help, you don&rsquo;t pay.
        </p>
        <div className="mt-10">
          <a
            href={bookUrl}
            className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
          >
            Book a 15-minute call
          </a>
          <p className="mt-3 text-sm text-neutral-500">
            Free. No pitch deck. We talk about your business and one thing AI could fix.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What $750 buys you</h2>
          <ul className="mt-8 space-y-5 text-lg leading-relaxed text-neutral-700">
            <li>One AI workflow that removes repeated manual work in your business.</li>
            <li>Built and shipped in 7 days. Walkthrough video and two cleanup passes included.</li>
            <li>Fixed $750. Pay after we ship. If it doesn&rsquo;t help, you don&rsquo;t pay.</li>
          </ul>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Who this is for</h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            Small businesses in Guam and the Marianas with too much manual work and not enough hours.
            Hotels, tour and dive operators, restaurants, retail, local services.
          </p>
        </div>
      </section>

      {/* Founder + CTA */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Built by Adam Pangelinan</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600">
            Local founder on Guam. I build the workflow with you, ship it in a week, and stick around to make sure it actually saves time.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <a
              href={bookUrl}
              className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
            >
              Book a 15-minute call
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-neutral-700 underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 underline-offset-4 hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
