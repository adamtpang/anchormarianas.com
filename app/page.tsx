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
  ShieldCheck,
  Sparkles,
  TimerReset,
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
    title: "Scan the public signal",
    body: "We read your Google Maps reviews for repeated customer praise, friction, and operational clues.",
  },
  {
    icon: ClipboardList,
    title: "Walk through the diagnosis",
    body: "You get a practical 15-minute walkthrough with the themes, quote evidence, and likely workflow bottlenecks.",
  },
  {
    icon: Wrench,
    title: "Ship one revenue fix",
    body: "If there is a clear win, the $750 Sprint turns one review pattern into a usable AI workflow.",
  },
]

const scanSections = [
  "What customers repeatedly love",
  "Where service breaks down",
  "Example review quotes",
  "Likely root causes",
  "Top workflow opportunity",
]

const sprintIncludes = [
  "One AI-assisted workflow shipped in 7 days",
  "Setup for forms, prompts, automations, or staff handoff",
  "Short walkthrough video and operating notes",
  "Two cleanup passes after your team tries it",
]

const useCases = [
  {
    title: "Missed inquiry follow-up",
    body: "Turn repeated response-time complaints into a simple lead triage and reply workflow.",
  },
  {
    title: "Review-to-ops briefing",
    body: "Summarize weekly customer patterns so owners can fix the few issues customers actually mention.",
  },
  {
    title: "Front desk consistency",
    body: "Create reusable answer drafts and checklists for questions that slow down service teams.",
  },
  {
    title: "Reputation recovery",
    body: "Spot negative themes early and build a calm follow-up process before they become revenue leaks.",
  },
]

const problemSignals = [
  "Guests keep mentioning the same delays.",
  "Good reviews hide fixable operational waste.",
  "Owners know AI matters but not which workflow should come first.",
]

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <section className="relative isolate min-h-[calc(100vh-3.5rem)] border-b border-border/60">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,hsl(var(--accent)/0.16),transparent_28%),linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--background))_48%,hsl(var(--secondary)/0.54)_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <div className="absolute right-[-12rem] top-24 -z-10 h-[34rem] w-[34rem] rounded-full border border-accent/15 bg-accent/5 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-24">
          <div className="flex flex-col justify-center">
            <div className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-border/70 bg-card/70 px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <span className="sonar"><span /></span>
              Built from Guam for Pacific SMB operators
            </div>

            <p className="mb-5 font-mono-anchor text-xs uppercase tracking-[0.32em] text-accent">
              Free Anchor Scan → 15-minute walkthrough → $750 Sprint
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(3.4rem,10vw,8rem)] leading-[0.82] tracking-[-0.045em] text-balance">
              Turn customer reviews into revenue-saving AI workflows.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Anchor helps Guam and Pacific business owners find the first practical automation worth building by starting with what customers already say in public.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-accent px-7 text-base font-semibold text-accent-foreground shadow-[0_18px_45px_hsl(var(--accent)/0.24)] hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_22px_60px_hsl(var(--accent)/0.32)]"
              >
                <a href={scanMailto}>
                  Get a Free Anchor Scan <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <a
                href="#how-it-works"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border/80 bg-card/70 px-7 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the process
              </a>
            </div>

            <div className="mt-9 grid max-w-2xl gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              {[
                "No AI jargon",
                "Review evidence first",
                "Founder-led delivery",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative rounded-[2rem] border border-border/70 bg-card/82 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:bg-card/72">
              <div className="rounded-[1.55rem] border border-border/60 bg-background/90 p-5 sm:p-7">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono-anchor text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                      Anchor Scan Preview
                    </p>
                    <h2 className="mt-3 font-display text-4xl leading-none tracking-[-0.035em]">
                      Revenue leaks hiding in reviews
                    </h2>
                  </div>
                  <div className="rounded-full border border-accent/30 bg-accent/12 px-3 py-1 text-xs font-semibold text-accent">
                    Free
                  </div>
                </div>

                <div className="grid gap-3">
                  {problemSignals.map((signal, index) => (
                    <div
                      key={signal}
                      className="group grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-lg"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-mono-anchor text-xs text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground">
                        0{index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{signal}</p>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${72 - index * 12}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-foreground p-5 text-background shadow-2xl dark:bg-primary dark:text-primary-foreground">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] opacity-70">
                    <Sparkles className="h-3.5 w-3.5" /> Suggested first workflow
                  </div>
                  <p className="mt-4 text-xl font-semibold leading-snug">
                    A same-day follow-up assistant for missed questions, refund mentions, and booking friction.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 left-0 hidden rounded-2xl border border-border/70 bg-card px-5 py-4 shadow-xl lg:block">
              <p className="font-mono-anchor text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                Local trust line
              </p>
              <p className="mt-1 text-sm font-semibold">Built in Guam. Designed for owner/operators.</p>
            </div>
          </div>
        </div>
      </section>

      <Section id="problem" eyebrow="The problem" title="Most businesses already have the customer data. It is just trapped in review pages.">
        <div className="grid gap-4 md:grid-cols-3">
          {problemSignals.map((signal, index) => (
            <article key={signal} className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl">
              <p className="font-mono-anchor text-xs uppercase tracking-[0.28em] text-accent">Signal 0{index + 1}</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{signal}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">
                Anchor starts with public customer signal so the first AI workflow is grounded in real demand, not a generic automation menu.
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="how-it-works" eyebrow="How it works" title="A calm, low-risk path from customer feedback to a shipped workflow.">
        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article key={step.title} className="relative rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono-anchor text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{step.body}</p>
              </article>
            )
          })}
        </div>
      </Section>

      <Section id="founder-pilot" eyebrow="The offer" title="Start free. Only pay if the scan reveals a workflow worth shipping.">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <OfferCard
            label="Free Anchor Scan"
            price="$0"
            description="A public-review diagnostic for Guam and Pacific SMBs that shows where customer feedback points to operational opportunity."
            items={scanSections}
            cta="Get a Free Anchor Scan"
            featured={false}
          />
          <OfferCard
            label="Review-to-Revenue Sprint"
            price="$750"
            description="A focused build sprint for one practical AI workflow that can save revenue, recover time, or improve customer follow-up."
            items={sprintIncludes}
            cta="Ask about the Sprint"
            featured
          />
        </div>
      </Section>

      <Section id="use-cases" eyebrow="Use cases" title="Practical first workflows for teams that cannot afford another abstract AI demo.">
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-border/70 bg-border/70 shadow-sm md:grid-cols-2">
          {useCases.map((useCase) => (
            <article key={useCase.title} className="group bg-card p-6 transition-colors hover:bg-secondary/55 sm:p-8">
              <div className="mb-12 h-px w-16 bg-accent transition-all group-hover:w-24" />
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">{useCase.title}</h3>
              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{useCase.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-y border-border/60 bg-foreground text-background dark:bg-card dark:text-card-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
          <div>
            <p className="font-mono-anchor text-xs uppercase tracking-[0.32em] text-accent">Founder/local trust</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-6xl">
              Local presence, practical AI, no theater.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: MapPin,
                title: "Built from Guam",
                body: "Anchor is designed for Pacific operators where relationships, trust, and fast practical wins matter.",
              },
              {
                icon: ShieldCheck,
                title: "Founder-led delivery",
                body: "You work directly with Adam on a narrow, useful workflow rather than a bloated consulting engagement.",
              },
              {
                icon: Compass,
                title: "Demand-led roadmap",
                body: "Review patterns and discovery calls decide what gets built next, keeping the product grounded in local SMB reality.",
              },
              {
                icon: TimerReset,
                title: "Fast first value",
                body: "The first paid sprint is intentionally small: one workflow, one week, one clear business outcome.",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-[1.5rem] border border-background/15 bg-background/8 p-6 backdrop-blur">
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-background/72 dark:text-muted-foreground">{item.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_24px_90px_rgba(0,0,0,0.14)] sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono-anchor text-xs uppercase tracking-[0.32em] text-accent">Ready when you are</p>
              <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
                Send one link. Get the first workflow signal.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                The CTA opens an email asking for your business name, Google Maps link, and contact name so Anchor can run the scan.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-accent px-7 text-base font-semibold text-accent-foreground shadow-[0_18px_45px_hsl(var(--accent)/0.22)] hover:-translate-y-0.5 hover:bg-accent/90"
            >
              <a href={scanMailto}>
                Get a Free Anchor Scan <Mail className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-4xl lg:mb-14">
          <p className="font-mono-anchor text-xs uppercase tracking-[0.32em] text-accent">{eyebrow}</p>
          <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

function OfferCard({
  label,
  price,
  description,
  items,
  cta,
  featured,
}: {
  label: string
  price: string
  description: string
  items: string[]
  cta: string
  featured: boolean
}) {
  return (
    <article
      className={
        featured
          ? "rounded-[1.75rem] border border-accent/45 bg-foreground p-6 text-background shadow-[0_24px_90px_rgba(0,0,0,0.2)] sm:p-8 dark:bg-card dark:text-card-foreground"
          : "rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-sm sm:p-8"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className={featured ? "font-mono-anchor text-xs uppercase tracking-[0.28em] text-accent" : "font-mono-anchor text-xs uppercase tracking-[0.28em] text-muted-foreground"}>
            {label}
          </p>
          <div className="mt-6 font-display text-7xl leading-none tracking-[-0.05em]">{price}</div>
        </div>
        {featured ? (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">Paid sprint</span>
        ) : (
          <span className="rounded-full border border-border/70 px-3 py-1 text-xs font-semibold text-muted-foreground">Top of funnel</span>
        )}
      </div>
      <p className={featured ? "mt-8 max-w-2xl leading-7 text-background/72 dark:text-muted-foreground" : "mt-8 max-w-2xl leading-7 text-muted-foreground"}>
        {description}
      </p>
      <div className="my-8 h-px bg-current opacity-15" />
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
            <span className={featured ? "text-background/82 dark:text-card-foreground/82" : "text-foreground/82"}>{item}</span>
          </li>
        ))}
      </ul>
      <Button
        asChild
        size="lg"
        className={
          featured
            ? "mt-9 h-13 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
            : "mt-9 h-13 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        }
      >
        <a href={scanMailto}>
          {cta} <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </article>
  )
}
