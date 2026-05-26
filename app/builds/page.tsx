import siteConfig from "@/content/site.json"

const bookUrl = siteConfig.discoveryCal
const stripeUrl = siteConfig.stripeBuy

export const metadata = {
  title: "AI Build Sprints — Adam Pang",
  description:
    "I diagnose your biggest operational bottleneck. Then I build you a working AI cure in 5 days. $500 flat.",
}

const faqs = [
  {
    q: "What counts as a bottleneck?",
    a: "Any repeated manual task or decision that eats real hours each week — inbox triage, lead qualification, report generation, content drafting, customer reply drafts, data cleanup, internal lookups. If it happens often and a human does it the same way each time, it's a candidate.",
  },
  {
    q: "What if it can't be built in 5 days?",
    a: "We find that out on the free discovery call before you pay anything. If the scope is too big, I'll tell you and either propose a smaller first slice or recommend someone better suited. If we start a sprint and it genuinely doesn't work, full refund.",
  },
  {
    q: "Can I keep the code?",
    a: "Yes. You own everything I build: code, prompts, configs, and the how-to-run-it doc. I keep the right to use the high-level pattern in future case studies (with your permission for anything identifying).",
  },
  {
    q: "What stack do you use?",
    a: "Whatever ships fastest for your bottleneck. Usually some combination of TypeScript / Next.js, Python, Anthropic or OpenAI APIs, Supabase or Postgres, n8n or simple cron, and your existing tools (Notion, Slack, Gmail, Sheets, etc.). I optimize for things you can keep running after I leave.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, mutual NDAs are fine. Send yours or use mine.",
  },
]

export default function BuildsPage() {
  return (
    <div className="bg-white text-neutral-900">
      <style>{`:root{--ink:#0b3b5c}`}</style>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 sm:pt-28 sm:pb-16">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          AI Build Sprints
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          One bottleneck.
          <span className="block text-neutral-500">Working AI cure in 5 days.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700">
          I diagnose your biggest operational bottleneck. Then I build you a working AI cure for it in 5 days.
        </p>
      </section>

      {/* Sprint outline */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How a sprint runs</h2>
          <ul className="mt-8 space-y-5 text-lg leading-relaxed text-neutral-700">
            <li><strong>Day 1:</strong> Free 30-min discovery call. We find the bottleneck.</li>
            <li><strong>Days 2–4:</strong> I build. Daily Loom updates.</li>
            <li><strong>Day 5:</strong> Handoff. Working artifact + how-to-run-it doc.</li>
          </ul>
          <div className="mt-10 rounded-2xl border border-neutral-200 p-6 sm:p-8 bg-neutral-50">
            <p className="text-lg text-neutral-800">
              <strong>$500 flat.</strong> Refund if it doesn&rsquo;t work.
            </p>
            <p className="mt-2 text-neutral-600">
              Slots: 2/week. First 5 builds are case studies.
            </p>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={bookUrl}
              className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
            >
              Book a free 30-min discovery call
            </a>
            <a
              href={stripeUrl}
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-8 py-4 text-base font-semibold text-neutral-900 transition hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
            >
              Pay now to lock a slot
            </a>
          </div>
          <p className="mt-4 text-sm text-neutral-500">
            Discovery call is always free. Paying first just reserves the next available slot.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">FAQ</h2>
          <div className="mt-8 space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-semibold text-neutral-900">{f.q}</h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-700">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a
              href={bookUrl}
              className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2"
            >
              Book a free 30-min discovery call
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
