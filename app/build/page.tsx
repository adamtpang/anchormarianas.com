"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Loader2,
  AlertCircle,
  Calendar,
  Check,
  HelpCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import siteConfig from "@/content/site.json"

const ease = [0.2, 0.8, 0.2, 1] as const
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

type Estimate = {
  hoursLow: number
  hoursHigh: number
  priceLow: string
  priceHigh: string
  timeline: string
}
type BuildResult = {
  projectName: string
  summary: string
  deliverables: { title: string; detail: string }[]
  phases: { name: string; focus: string }[]
  estimate: Estimate
  assumptions: string[]
  openQuestions: string[]
}

export default function BuildPage() {
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BuildResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleBuild(e: React.FormEvent) {
    e.preventDefault()
    if (description.trim().length < 8) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await fetch("/api/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          budget: budget.trim(),
          timeline: timeline.trim(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Scoping failed. Please try again.")
      }
      setResult(await res.json())
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
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-2xl mx-auto">
          <motion.div variants={fadeUp} className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-mono-anchor mb-6">
            Anchor · build with me
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight mb-4 text-balance">
            Tell me what you want{" "}
            <span className="font-display-italic">built.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
            Describe your project in plain words. You get a scoped plan, an honest
            price range, and a timeline in about a minute. Then we confirm it on a
            15-minute call and start.
          </motion.p>

          <motion.form variants={fadeUp} onSubmit={handleBuild} className="space-y-3">
            <textarea
              required
              rows={4}
              placeholder="e.g. A booking site for my dive shop where customers pick a tour, pay a deposit, and get a confirmation text."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-base leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors disabled:opacity-60 resize-none"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Budget (optional)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                disabled={loading}
                className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors disabled:opacity-60"
              />
              <input
                type="text"
                placeholder="Timeline (optional)"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                disabled={loading}
                className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors disabled:opacity-60"
              />
            </div>
            <Button type="submit" size="lg" disabled={loading || description.trim().length < 8} className="text-base px-6 w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Scoping…
                </>
              ) : (
                <>
                  Get my plan and price
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground/60">
              An honest estimate, not a bill. Final scope and price are confirmed
              with Adam on a call.
            </p>
          </motion.form>
        </motion.div>
      </section>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 px-6 border-t border-border/40">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="flex justify-center">
                <span className="sonar" aria-hidden>
                  <span />
                </span>
              </div>
              <p className="font-mono-anchor text-xs uppercase tracking-[0.35em] text-muted-foreground">Scoping…</p>
              <p className="text-sm text-muted-foreground/70">Breaking your idea into deliverables, hours, and an honest price range.</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-12 px-6 border-t border-border/40">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-destructive">Scoping failed</p>
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
          <motion.div initial="hidden" animate="show" variants={stagger} className="border-t border-border/40">
            {/* Summary + estimate */}
            <section className="py-16 px-6 bg-muted/20">
              <div className="max-w-2xl mx-auto space-y-8">
                <motion.div variants={fadeUp} className="space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-accent">
                    Scoped · {result.projectName}
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">{result.summary}</p>
                </motion.div>

                <motion.div variants={fadeUp} className="rounded-2xl border border-accent/30 bg-accent/5 p-7">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-muted-foreground mb-2">
                    Estimate
                  </div>
                  <div className="font-display text-4xl md:text-5xl tracking-tight">
                    {result.estimate.priceLow} <span className="text-muted-foreground">to</span> {result.estimate.priceHigh}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      {result.estimate.hoursLow} to {result.estimate.hoursHigh} hours
                    </span>
                    <span>Timeline: {result.estimate.timeline}</span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Deliverables */}
            <section className="py-16 px-6 border-t border-border/40">
              <div className="max-w-2xl mx-auto space-y-6">
                <motion.h2 variants={fadeUp} className="font-display text-2xl md:text-3xl tracking-tight">
                  What you get
                </motion.h2>
                {result.deliverables.map((d, i) => (
                  <motion.div key={i} variants={fadeUp} className="bg-card rounded-xl border border-border p-5 flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold leading-tight">{d.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{d.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Plan */}
            {result.phases?.length > 0 && (
              <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
                <div className="max-w-2xl mx-auto space-y-6">
                  <motion.h2 variants={fadeUp} className="font-display text-2xl md:text-3xl tracking-tight">The plan</motion.h2>
                  <div className="space-y-5">
                    {result.phases.map((p, i) => (
                      <motion.div key={i} variants={fadeUp} className="flex gap-4">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold font-mono-anchor">{i + 1}</div>
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <p className="text-sm text-muted-foreground mt-0.5">{p.focus}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Assumptions + questions */}
            <section className="py-16 px-6 border-t border-border/40">
              <div className="max-w-2xl mx-auto grid gap-10 sm:grid-cols-2">
                {result.assumptions?.length > 0 && (
                  <motion.div variants={fadeUp}>
                    <h3 className="font-mono-anchor uppercase tracking-wider text-[10px] text-accent mb-3">What the price assumes</h3>
                    <ul className="space-y-2.5">
                      {result.assumptions.map((a, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed">{a}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {result.openQuestions?.length > 0 && (
                  <motion.div variants={fadeUp}>
                    <h3 className="font-mono-anchor uppercase tracking-wider text-[10px] text-accent mb-3">We'll settle these on the call</h3>
                    <ul className="space-y-2.5">
                      {result.openQuestions.map((q, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                          <HelpCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
              <motion.div variants={fadeUp} className="max-w-2xl mx-auto space-y-5">
                <h2 className="font-display text-2xl md:text-3xl tracking-tight">Lock it in.</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This is an honest estimate from your description. On a 15-minute
                  call we confirm the scope and the exact price, then I send the
                  invoice and start. If it is not a fit, I will say so.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="text-base px-6 py-5" asChild>
                    <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer">
                      Confirm scope on a call
                      <Calendar className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer">Ask a question first</a>
                  </Button>
                </div>
                <button
                  onClick={() => {
                    setResult(null)
                    setDescription("")
                    setBudget("")
                    setTimeline("")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors block pt-2"
                >
                  Scope a different project
                </button>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Below the fold */}
      {!result && !loading && (
        <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-muted-foreground">How it works</div>
            <div className="space-y-6">
              {[
                { n: 1, t: "Describe it", d: "A sentence or two about what you want built. No form, no signup." },
                { n: 2, t: "Get a plan and a range", d: "Deliverables, a phased plan, an honest price range, and the assumptions behind it." },
                { n: 3, t: "Confirm and build", d: "We lock scope and price on a 15-minute call, I invoice, and we start." },
              ].map((s) => (
                <div key={s.n} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold font-mono-anchor">{s.n}</div>
                  <div>
                    <div className="font-semibold">{s.t}</div>
                    <p className="text-sm text-muted-foreground mt-0.5">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
