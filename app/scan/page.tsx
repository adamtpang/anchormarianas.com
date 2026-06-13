"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Loader2, AlertCircle, Calendar, Search, HelpCircle } from "lucide-react"
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

type Observation = {
  title: string
  detail: string
  evidence: string
}

type ScanResult = {
  businessName: string
  businessSummary: string
  observations: Observation[]
  questions: string[]
  focus: string
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
            What would we notice about{" "}
            <span className="font-display-italic">your business?</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
          >
            Paste your URL. We read your site and surface the operational
            patterns worth a conversation, plus the questions we would ask. No
            pitch, no invented numbers. The call is the work.
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
                    Reading…
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
              Free. No account required. Results in about 45 seconds.
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
                Reading…
              </p>
              <p className="text-sm text-muted-foreground/70">
                Reading your site, noting how you operate, writing down the
                questions worth asking.
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

            {/* Observations */}
            <section className="py-16 px-6 border-t border-border/40">
              <div className="max-w-2xl mx-auto space-y-6">
                <motion.div variants={fadeUp}>
                  <h2 className="font-display text-2xl md:text-3xl tracking-tight">
                    What we noticed
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Patterns in how you appear to operate. Each one is something
                    to confirm, not a conclusion.
                  </p>
                </motion.div>

                {result.observations.map((obs, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-card rounded-xl border border-border p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold font-mono-anchor shrink-0">
                        {i + 1}
                      </div>
                      <h3 className="font-semibold text-lg leading-tight">
                        {obs.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {obs.detail}
                    </p>

                    {obs.evidence && (
                      <p className="text-xs text-muted-foreground/70 border-t border-border/60 pt-3 flex items-start gap-2">
                        <Search className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent" />
                        <span>
                          <span className="font-mono-anchor uppercase tracking-wider text-[10px] text-accent mr-2">
                            On the site
                          </span>
                          {obs.evidence}
                        </span>
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Questions */}
            {result.questions.length > 0 && (
              <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
                <div className="max-w-2xl mx-auto space-y-6">
                  <motion.div variants={fadeUp}>
                    <h2 className="font-display text-2xl md:text-3xl tracking-tight">
                      Questions worth answering
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                      If you can answer these, you already know where AI would
                      help. If you cannot, that is the place to start.
                    </p>
                  </motion.div>

                  <motion.ul variants={fadeUp} className="space-y-4">
                    {result.questions.map((q, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 mt-0.5 shrink-0 text-accent" />
                        <span className="text-base leading-relaxed">{q}</span>
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </section>
            )}

            {/* Focus */}
            {result.focus && (
              <section className="py-12 px-6 border-t border-border/40">
                <div className="max-w-2xl mx-auto">
                  <motion.div variants={fadeUp} className="space-y-3">
                    <div className="text-[10px] uppercase tracking-[0.3em] font-mono-anchor text-accent">
                      Where we would start the conversation
                    </div>
                    <p className="font-display-italic text-xl md:text-2xl leading-snug">
                      {result.focus}
                    </p>
                  </motion.div>
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
              <motion.div
                variants={fadeUp}
                className="max-w-2xl mx-auto space-y-5"
              >
                <h2 className="font-display text-2xl md:text-3xl tracking-tight">
                  Want to talk it through?
                </h2>
                <p className="text-muted-foreground">
                  Book a free 15-minute call. We go through what we noticed
                  together, you fill in the parts a website cannot show, and if
                  there is a fit we say so. If there is not, we say that too.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="text-base px-6 py-5" asChild>
                    <a
                      href={siteConfig.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a 15-min call
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
                  className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors block"
                >
                  Scan a different URL
                </button>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── How it works (below fold, always visible) ── */}
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
                  d: "We read your site to understand your business: what you sell, who you serve, how you appear to operate.",
                },
                {
                  n: 2,
                  t: "We note the patterns",
                  d: "Where the site suggests manual work, slow handoffs, or friction. Grounded in what is actually on the page, not assumptions.",
                },
                {
                  n: 3,
                  t: "You get observations and questions",
                  d: "A short, honest read on what we noticed and the questions worth answering. No invented dollar values, no prescription.",
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
