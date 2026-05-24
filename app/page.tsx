import { Button } from "@/components/ui/button"
import siteConfig from "@/content/site.json"
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Compass,
  Mail,
  MapPin,
  MessageSquareQuote,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react"

const scanMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "Free Anchor Scan for my business"
)}&body=${encodeURIComponent(
  "Hi Adam,\n\nI'd like a Free Anchor Scan for my business.\n\nBusiness name:\nGoogle Maps link:\nContact name:\nBest phone/email:\n\nThanks."
)}`

const steps = [
  {
    icon: Search,
    title: "Scan",
    body: "We analyze public Google Maps reviews for repeated customer signals.",
  },
  {
    icon: ClipboardList,
    title: "Diagnose",
    body: "We surface what customers love, recurring friction, example quotes, and likely operational causes.",
  },
  {
    icon: Wrench,
    title: "Fix One Thing",
    body: "In a 7-day sprint, we turn one priority issue into a practical workflow your team can use.",
  },
]

const scanSections = [
  "What customers love",
  "Recurring friction points",
  "Example review quotes",
  "Likely operational signals",
  "Questions to ask the owner",
  "CTA to book a 15-minute walkthrough",
]

const sprintOutputs = [
  "Review response system",
  "Missed inquiry tracker",
  "Booking FAQ response workflow",
  "After-hours inquiry workflow",
  "Customer complaint dashboard",
  "Staff handoff checklist",
  "Upsell and cross-sell response templates",
]

const useCases = [
  ["Tour operators", "Reduce missed booking inquiries before they become lost revenue."],
  ["Hotels", "Improve after-hours guest response without adding another inbox to manage."],
  ["Restaurants", "Respond faster to recurring service complaints and spot patterns."],
  ["Dive shops", "Turn FAQ and booking questions into reusable response flows."],
  ["Local services", "Identify repeated customer friction and fix one workflow first."],
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f4ec] text-[#10233d] dark:bg-background dark:text-foreground">
      <section className="relative overflow-hidden border-b border-[#d9cdbd]/80 dark:border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(20,132,145,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(248,244,236,0))] dark:bg-[radial-gradient(circle_at_80%_12%,rgba(45,212,191,0.13),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#c9b89f] bg-white/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#2b5d66] shadow-sm dark:border-border dark:bg-white/5 dark:text-accent">
              <MapPin className="h-3.5 w-3.5" /> Built locally for Guam, CNMI, and Pacific businesses.
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.045em] text-[#071b33] sm:text-6xl lg:text-7xl dark:text-foreground">
              Turn customer reviews into revenue-saving AI workflows.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#405169] sm:text-xl dark:text-muted-foreground">
              Anchor Marianas helps Guam and Pacific businesses scan public customer reviews, find recurring friction, and turn one problem into a practical AI-assisted workflow in 7 days.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-xl bg-[#0a3047] px-6 text-base text-white hover:bg-[#124861] dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90">
                <a href={scanMailto}>
                  Get a Free Anchor Scan <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-[#bda98d] bg-white/50 px-6 text-base text-[#10233d] hover:bg-white dark:border-border dark:bg-transparent dark:text-foreground">
                <a href="#founder-pilot">See the $750 Founder Pilot</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-[#66758a] dark:text-muted-foreground">
              Email CTA asks for your business name, Google Maps link, and contact name.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#d9cdbd] bg-[#fffaf1]/88 p-5 shadow-2xl shadow-[#8c7250]/10 backdrop-blur dark:border-border dark:bg-card/70 dark:shadow-black/20">
            <div className="rounded-[1.4rem] border border-[#e6dac8] bg-white p-6 dark:border-border dark:bg-background/80">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a8a93] dark:text-accent">Free lead magnet</div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">Anchor Scan</h2>
                  <p className="mt-3 text-sm leading-6 text-[#56657a] dark:text-muted-foreground">
                    A one-page diagnostic report built from your public Google Maps reviews, designed to start a useful owner walkthrough.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#eaf7f6] p-3 text-[#0f7178] dark:bg-accent/10 dark:text-accent">
                  <MessageSquareQuote className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {scanSections.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-[#f6f1e8] px-3 py-2.5 text-sm text-[#263a52] dark:bg-muted/40 dark:text-foreground/90">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#18818a] dark:text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1a8a93] dark:text-accent">The problem</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Your customers are already telling you what is broken.</h2>
          </div>
          <div className="grid gap-4 text-base leading-7 text-[#485a70] dark:text-muted-foreground sm:grid-cols-2">
            <p>Reviews contain repeated complaints, missed revenue, and operational bottlenecks hiding in plain sight.</p>
            <p>Most business owners do not have time to analyze every review manually or turn patterns into process changes.</p>
            <p className="sm:col-span-2">AI can help turn that signal into practical workflows: faster replies, better handoffs, clearer FAQs, and small operational fixes your team can actually use.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-[#d9cdbd]/80 bg-white/45 dark:border-border/50 dark:bg-muted/10">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1a8a93] dark:text-accent">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Scan the reviews. Diagnose the friction. Fix one thing.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="rounded-2xl border border-[#d9cdbd] bg-[#fffaf1] p-6 shadow-sm dark:border-border dark:bg-card">
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-[#eaf7f6] p-3 text-[#0f7178] dark:bg-accent/10 dark:text-accent"><Icon className="h-5 w-5" /></div>
                    <span className="font-mono-anchor text-xs text-[#8a7357] dark:text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#56657a] dark:text-muted-foreground">{step.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="founder-pilot" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1a8a93] dark:text-accent">The offer</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Start free. Then fix one revenue leak in a 7-day founder pilot.</h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-[#d9cdbd] bg-white p-7 shadow-sm dark:border-border dark:bg-card">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1a8a93] dark:text-accent">Free Anchor Scan</div>
            <div className="mt-4 flex items-end gap-3"><span className="text-5xl font-semibold tracking-tight">Free</span><span className="pb-2 text-sm text-muted-foreground">1-page diagnostic</span></div>
            <p className="mt-5 text-[#485a70] dark:text-muted-foreground">Built from public reviews so you can see what customers love, where friction repeats, and what questions to ask next.</p>
            <Button asChild className="mt-7 rounded-xl bg-[#0a3047] text-white hover:bg-[#124861] dark:bg-accent dark:text-accent-foreground">
              <a href={scanMailto}>Request scan <Mail className="ml-2 h-4 w-4" /></a>
            </Button>
          </article>

          <article className="rounded-[1.75rem] border-2 border-[#0f7178] bg-[#0a3047] p-7 text-white shadow-xl shadow-[#0a3047]/15 dark:border-accent dark:bg-card">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#80d8d8] dark:text-accent">Review-to-Revenue Sprint</div>
            <div className="mt-4 flex flex-wrap items-end gap-3"><span className="text-5xl font-semibold tracking-tight">$750</span><span className="pb-2 text-sm text-white/75">founder pilot · 7 days</span></div>
            <p className="mt-5 text-white/82 dark:text-muted-foreground">For Guam SMBs with public reviews: turn one recurring customer complaint into one practical AI-assisted workflow, template, or tool.</p>
            <ul className="mt-6 space-y-3 text-sm text-white/88 dark:text-foreground/90">
              {[
                "Free Anchor Scan diagnostic",
                "15-minute owner walkthrough",
                "One selected business problem to fix",
                "One workflow/template/tool delivered in 7 days",
                "Simple before/after success metric",
              ].map((item) => (
                <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#80d8d8] dark:text-accent" />{item}</li>
              ))}
            </ul>
            <Button asChild className="mt-7 rounded-xl bg-white text-[#0a3047] hover:bg-[#f6f1e8] dark:bg-accent dark:text-accent-foreground">
              <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer">Book walkthrough <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </article>
        </div>
      </section>

      <section className="border-y border-[#d9cdbd]/80 bg-white/45 dark:border-border/50 dark:bg-muted/10">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1a8a93] dark:text-accent">Sprint outputs</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Concrete, low-risk fixes. Not vague AI consulting.</h2>
              <p className="mt-4 text-[#485a70] dark:text-muted-foreground">The sprint focuses on one practical asset your team can use immediately.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {sprintOutputs.map((output) => (
                <div key={output} className="rounded-xl border border-[#d9cdbd] bg-[#fffaf1] px-4 py-3 text-sm font-medium dark:border-border dark:bg-card">{output}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1a8a93] dark:text-accent">Example use cases</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Built around the kinds of businesses owners run here.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-[#d9cdbd] bg-white p-5 dark:border-border dark:bg-card">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#56657a] dark:text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-[#d9cdbd] bg-[#fffaf1] p-7 shadow-sm dark:border-border dark:bg-card md:grid-cols-[0.75fr_1.25fr] md:p-9">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#e8ded0] p-4 text-[#0a3047] dark:bg-accent/10 dark:text-accent"><Compass className="h-7 w-7" /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1a8a93] dark:text-accent">Founder-led</p>
              <h2 className="mt-1 text-2xl font-semibold">Adam at Anchor Marianas</h2>
            </div>
          </div>
          <p className="text-lg leading-8 text-[#405169] dark:text-muted-foreground">
            I’m Adam, founder of Anchor Marianas. I’m building practical AI tools for Pacific businesses, starting with simple review diagnostics and 7-day workflow sprints that help owners save time, reduce customer friction, and capture missed revenue.
          </p>
        </div>
      </section>

      <section className="bg-[#071b33] text-white dark:bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center lg:px-8">
          <Sparkles className="mx-auto h-6 w-6 text-[#80d8d8] dark:text-accent" />
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Want to see what your reviews are telling you?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/72">No pitch in the report. Just useful signal from your own customers.</p>
          <div className="mt-8">
            <Button asChild size="lg" className="h-12 rounded-xl bg-white px-6 text-base text-[#071b33] hover:bg-[#f6f1e8] dark:bg-accent dark:text-accent-foreground">
              <a href={scanMailto}>Get a Free Anchor Scan <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d9cdbd] bg-[#fffaf1]/95 p-3 shadow-2xl backdrop-blur md:hidden dark:border-border dark:bg-background/95">
        <Button asChild className="w-full rounded-xl bg-[#0a3047] text-white hover:bg-[#124861] dark:bg-accent dark:text-accent-foreground">
          <a href={scanMailto}>Get a Free Anchor Scan</a>
        </Button>
      </div>
    </div>
  )
}
