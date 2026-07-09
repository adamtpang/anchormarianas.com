"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Loader2,
  AlertCircle,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Zap,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import siteConfig from "@/content/site.json"

// ── The paid AI Opportunity Audit ──────────────────────────────────────────
// Mint a Stripe payment link for the paid audit and paste it here. Until it is
// set, the CTA routes to a booking call to arrange the audit (correct for the
// manual pre-sell phase of the roadmap). Set the price to match the link.
const PAYMENT_LINK = ""
const AUDIT_PRICE = "$2,500"
// ────────────────────────────────────────────────────────────────────────────

const ease = [0.2, 0.8, 0.2, 1] as const
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

type Lever = "time" | "money" | "both"
type Grade = "low" | "medium" | "high"

type Opportunity = {
  title: string
  detail: string
  lever: Lever
  effort: Grade
  impact: Grade
  evidence: string
}

type AuditResult = {
  businessName: string
  summary: string
  score: number
  scoreLabel: string
  opportunities: Opportunity[]
  quickWin: string
  auditAdds: string
}

const leverMeta: Record<Lever, { label: string; Icon: typeof Clock }> = {
  time: { label: "Saves time", Icon: Clock },
  money: { label: "Saves money", Icon: DollarSign },
  both: { label: "Time and money", Icon: TrendingUp },
}

function ScoreRing({ score }: { score: number }) {
  const r = 62
  const c = 2 * Math.PI * r
  const filled = c * (Math.max(0, Math.min(100, score)) / 100)
  return (
    <svg width="152" height="152" viewBox="0 0 152 152" className="shrink-0">
      <circle
        cx="76"
        cy="76"
        r={r}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="8"
      />
      <circle
        cx="76"
        cy="76"
        r={r}
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${c - filled}`}
        transform="rotate(-90 76 76)"
      />
      <text
        x="76"
        y="72"
        textAnchor="middle"
        className="font-display fill-foreground"
        style={{ fontSize: "2.6rem" }}
      >
        {score}
      </text>
      <text
        x="76"
        y="98"
        textAnchor="middle"
        className="fill-muted-foreground font-mono-anchor"
        style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
      >
        / 100
      </text>
    </svg>
  )
}

export default function AuditPage() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleAudit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim() }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Audit failed. Please try again.")
      }
      const data: AuditResult = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 depth-veil">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-mono-anchor mb-6"
          >
            AnchorScan · AI Opportunity Audit
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight mb-4 text-balance"
          >
            You know you should use AI.{" "}
            <span className="font-display-italic">This shows you where.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
          >
            Enter your website or a one-line description. We score where AI can
            save you time and money, ranked, in about 45 seconds. Free, no
            account.
          </motion.p>

          <motion.form variants={fadeUp} onSubmit={handleAudit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                placeholder="yourbusiness.com  ·  or describe what you do"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-base placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors disabled:opacity-60"
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading || !input.trim()}
                className="text-base px-6 shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scoring…
                  </>
                ) : (
                  <>
                    Get my score
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground/60">
              Free. No signup. The paid audit is where the exact numbers and the
              build plan come next.
            </p>
          </motion.form>
        </motion.div>
      </section>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 px-6 border-t border-border/40"
          >
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="flex justify-center">
                <span className="sonar" aria-hidden>
                  <span />
                </span>
              </div>
              <p className="font-mono-anchor text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Scoring…
              </p>
              <p className="text-sm text-muted-foreground/70">
                Reading your business, ranking where AI saves the most time and
                money.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-12 px-6 border-t border-border/40"
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-destructive">
                    Audit failed
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="border-t border-border/40"
          >
            {/* Score + summary */}
            <section className="py-16 px-6 bg-muted/20">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row items-center gap-8"
                >
                  <ScoreRing score={result.score} />
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-accent">
                      AI Opportunity Score · {result.businessName}
                    </div>
                    <div className="font-display text-2xl md:text-3xl tracking-tight">
                      {result.scoreLabel}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {result.summary}
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Opportunities */}
            <section className="py-16 px-6 border-t border-border/40">
              <div className="max-w-2xl mx-auto space-y-6">
                <motion.div variants={fadeUp}>
                  <h2 className="font-display text-2xl md:text-3xl tracking-tight">
                    Where AI pays off
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Ranked by impact. Each one is a real workflow in your
                    business, not a generic idea.
                  </p>
                </motion.div>

                {result.opportunities.map((o, i) => {
                  const meta = leverMeta[o.lever] ?? leverMeta.time
                  const LeverIcon = meta.Icon
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="bg-card rounded-xl border border-border p-6 flex flex-col gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold font-mono-anchor shrink-0">
                          {i + 1}
                        </div>
                        <h3 className="font-semibold text-lg leading-tight pt-1">
                          {o.title}
                        </h3>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {o.detail}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 px-3 py-1 text-xs font-medium">
                          <LeverIcon className="w-3.5 h-3.5" />
                          {meta.label}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground capitalize">
                          {o.impact} impact
                        </span>
                        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground capitalize">
                          {o.effort} effort
                        </span>
                      </div>

                      {o.evidence && (
                        <p className="text-xs text-muted-foreground/70 border-t border-border/60 pt-3">
                          <span className="font-mono-anchor uppercase tracking-wider text-[10px] text-accent mr-2">
                            Why
                          </span>
                          {o.evidence}
                        </p>
                      )}
                    </motion.div>
                  )
                })}

                {result.quickWin && (
                  <motion.div
                    variants={fadeUp}
                    className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-5"
                  >
                    <Zap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono-anchor uppercase tracking-wider text-[10px] text-accent mb-1">
                        Start here
                      </div>
                      <p className="text-sm leading-relaxed">{result.quickWin}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Paid audit CTA */}
            <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
              <motion.div variants={fadeUp} className="max-w-2xl mx-auto space-y-5">
                <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-muted-foreground">
                  The next step
                </div>
                <h2 className="font-display text-2xl md:text-3xl tracking-tight">
                  Turn the score into a plan and a build.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {result.auditAdds}
                </p>

                <ul className="space-y-2.5 py-1">
                  {[
                    "Exact time and cost numbers for each opportunity above",
                    "A prioritized roadmap, sequenced by payoff",
                    "One scoped first build we can start immediately",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {PAYMENT_LINK ? (
                    <Button size="lg" className="text-base px-6 py-5" asChild>
                      <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                        Get the AI Opportunity Audit · {AUDIT_PRICE}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  ) : (
                    <Button size="lg" className="text-base px-6 py-5" asChild>
                      <a
                        href={siteConfig.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book your AI Opportunity Audit
                        <Calendar className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="lg" asChild>
                    <a
                      href={siteConfig.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ask a question first
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground/70">
                  The audit fee credits toward the build if we go ahead. If it is
                  not worth doing, we tell you.
                </p>

                <button
                  onClick={() => {
                    setResult(null)
                    setInput("")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors block pt-2"
                >
                  Score another business
                </button>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Below the fold, before a run */}
      {!result && !loading && (
        <>
          <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-muted-foreground">
                How it works
              </div>
              <div className="space-y-6">
                {[
                  {
                    n: 1,
                    t: "Enter your site or a sentence",
                    d: "No forms, no signup. Just enough for us to understand what you do and how you run it.",
                  },
                  {
                    n: 2,
                    t: "Get your AI Opportunity Score",
                    d: "A score out of 100 plus a ranked list of where AI saves you time and money, specific to your business.",
                  },
                  {
                    n: 3,
                    t: "Book the paid audit when you are ready",
                    d: "We quantify the payoff, hand you a roadmap, and scope the first build. Then we build it.",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold font-mono-anchor">
                      {s.n}
                    </div>
                    <div>
                      <div className="font-semibold">{s.t}</div>
                      <p className="text-sm text-muted-foreground mt-0.5">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 px-6 border-t border-border/40">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="font-display text-2xl md:text-3xl tracking-tight">
                Free score, paid audit, real build.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The score is free and honest: it shows where the opportunity is.
                The paid AI Opportunity Audit is where it gets real, exact
                numbers, a sequenced roadmap, and a first build we ship with you.
                Delivered by a human who has put AI into small businesses, not a
                report generator.
              </p>
              <div className="pt-2">
                <Button variant="outline" asChild>
                  <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer">
                    Questions? Book a free 15-min call
                    <Calendar className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
