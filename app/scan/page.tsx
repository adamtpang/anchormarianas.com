"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Loader2, AlertCircle, TrendingUp, Zap, Phone, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import siteConfig from "@/content/site.json"

const ease = [0.2, 0.8, 0.2, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

type Opportunity = {
  title: string
  workflow: string
  impact: string
  annualValue: string
  category: "reception" | "sales" | "operations" | "marketing" | "support"
}

type ScanResult = {
  businessName: string
  businessSummary: string
  opportunities: Opportunity[]
  topRecommendation: string
  readyForReception: boolean
}

const categoryIcon = {
  reception: Phone,
  sales: TrendingUp,
  operations: Zap,
  marketing: TrendingUp,
  support: Phone,
}

const categoryColor: Record<string, string> = {
  reception: "text-accent border-accent/30 bg-accent/10",
  sales: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
  operations: "text-violet-500 border-violet-500/30 bg-violet-500/10",
  marketing: "text-sky-500 border-sky-500/30 bg-sky-500/10",
  support: "text-amber-500 border-amber-500/30 bg-amber-500/10",
}

export default function ScanPage() {
  const [url, setUrl] = useState("")
  const [businessContext, setBusinessContext] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleScan(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          context: businessContext.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Scan failed. Please try again.")
      }

      const data: ScanResult = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
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
            AnchorScan · Free AI Diagnostic
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight mb-4 text-balance"
          >
            What could AI do for{" "}
            <span className="font-display-italic">your business?</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
          >
            Paste your URL. In under a minute, we surface your top 3 AI workflow
            opportunities — ranked by dollar impact. No pitch deck. No fluff.
          </motion.p>

          {/* ── Scan form ── */}
          <motion.form variants={fadeUp} onSubmit={handleScan} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                required
                placeholder="https://yourbusiness.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-base placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors disabled:opacity-60"
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading || !url.trim()}
                className="text-base px-6 shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scanning…
                  </>
                ) : (
                  <>
                    Run free scan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <input
              type="text"
              placeholder="Optional: describe your business in one sentence"
              value={businessContext}
              onChange={(e) => setBusinessContext(e.target.value)}
              disabled={loading}
              className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors disabled:opacity-60"
            />

            <p className="text-xs text-muted-foreground/60">
              Free. No account required. Results in ~45 seconds.
            </p>
          </motion.form>
        </motion.div>
      </section>

      {/* ── Loading state ── */}
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
                Analyzing…
              </p>
              <p className="text-sm text-muted-foreground/70">
                Reviewing your site, mapping AI workflow opportunities, estimating
                dollar impact.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Error state ── */}
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
                  <p className="font-semibold text-sm text-destructive">Scan failed</p>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Results ── */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="border-t border-border/40"
          >
            {/* Business summary */}
            <section className="py-16 px-6 bg-muted/20">
              <div className="max-w-2xl mx-auto">
                <motion.div variants={fadeUp} className="space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-muted-foreground">
                    Scan complete · {result.businessName}
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {result.businessSummary}
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Opportunities */}
            <section className="py-16 px-6 border-t border-border/40">
              <div className="max-w-2xl mx-auto space-y-6">
                <motion.div variants={fadeUp}>
                  <h2 className="font-display text-2xl md:text-3xl tracking-tight">
                    Top 3 AI opportunities
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Ranked by estimated annual impact.
                  </p>
                </motion.div>

                {result.opportunities.map((opp, i) => {
                  const Icon = categoryIcon[opp.category] ?? Zap
                  const colorClass = categoryColor[opp.category] ?? categoryColor.operations

                  return (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="bg-card rounded-xl border border-border p-6 hover:border-accent transition-colors flex flex-col gap-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold font-mono-anchor shrink-0">
                            {i + 1}
                          </div>
                          <h3 className="font-semibold text-lg leading-tight">{opp.title}</h3>
                        </div>
                        <span
                          className={`shrink-0 text-[10px] uppercase tracking-wider font-mono-anchor border px-2.5 py-1 rounded-full flex items-center gap-1.5 ${colorClass}`}
                        >
                          <Icon className="w-3 h-3" />
                          {opp.category}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {opp.workflow}
                      </p>

                      <div className="flex items-center justify-between border-t border-border/60 pt-4">
                        <div className="space-y-0.5">
                          <div className="text-[10px] uppercase tracking-wider font-mono-anchor text-muted-foreground">
                            Est. annual impact
                          </div>
                          <div className="font-display text-2xl flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4 text-accent" />
                            {opp.annualValue}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground/70 italic max-w-[200px] text-right">
                          {opp.impact}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </section>

            {/* Top recommendation */}
            <section className="py-12 px-6 border-t border-border/40 bg-muted/20">
              <div className="max-w-2xl mx-auto">
                <motion.div variants={fadeUp} className="space-y-3">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-accent">
                    Anchor's recommendation
                  </div>
                  <p className="text-lg leading-relaxed">{result.topRecommendation}</p>
                </motion.div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 border-t border-border/40">
              <motion.div
                variants={fadeUp}
                className="max-w-2xl mx-auto space-y-5"
              >
                <h2 className="font-display text-2xl md:text-3xl tracking-tight">
                  {result.readyForReception
                    ? "You're a strong AI Reception candidate."
                    : "Ready to move on one of these?"}
                </h2>
                <p className="text-muted-foreground">
                  {result.readyForReception
                    ? "The AI Reception Pilot ships in 7 days. Fixed price. Full refund if you score below 5/5."
                    : "Book a free 20-min call. We'll scope which workflow to ship first and give you a fixed price on the spot."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="text-base px-6 py-5" asChild>
                    <a
                      href={siteConfig.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a 20-min call
                      <Calendar className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a
                      href={siteConfig.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp us
                    </a>
                  </Button>
                </div>

                {/* Scan another */}
                <button
                  onClick={() => {
                    setResult(null)
                    setUrl("")
                    setBusinessContext("")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Scan a different URL
                </button>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Social proof (below fold, always visible) ── */}
      {!result && !loading && (
        <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-muted-foreground">
              How it works
            </div>
            <div className="space-y-6">
              {[
                {
                  n: 1,
                  t: "Paste your URL",
                  d: "We read your site to understand your business: what you sell, who you serve, how you operate.",
                },
                {
                  n: 2,
                  t: "AI identifies workflow gaps",
                  d: "We map your operations against proven AI workflow patterns. Reception, sales, ops, marketing — wherever AI saves real money.",
                },
                {
                  n: 3,
                  t: "You get a ranked impact report",
                  d: "Top 3 opportunities, estimated annual dollar value, and a clear recommendation on where to start.",
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
      )}
    </div>
  )
}
