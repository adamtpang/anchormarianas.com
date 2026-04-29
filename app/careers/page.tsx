"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Anchor as AnchorIcon, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import siteConfig from "@/content/site.json"

const ease = [0.2, 0.8, 0.2, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

type Status = "idle" | "submitting" | "success" | "error"

export default function CareersPage() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setErrorMsg(null)

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      role: String(formData.get("role") || "").trim(),
      links: String(formData.get("links") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    }

    if (!payload.email || !payload.message) {
      setStatus("error")
      setErrorMsg("Email and a short pitch are required.")
      return
    }

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Submission failed.")
      }
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Try email."
      )
    }
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero ───────────────────────────── */}
      <section className="relative py-24 md:py-32 px-6 depth-veil">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-mono-anchor mb-7"
          >
            <AnchorIcon className="w-3.5 h-3.5" />
            Come aboard
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl leading-[1.02] tracking-tight mb-6 text-balance"
          >
            Build with us. <span className="font-display-italic">Set sail.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl text-muted-foreground leading-relaxed mb-3 max-w-2xl"
          >
            Anchor is a small AI studio out of Guam. We ship products, services,
            and owned assets for businesses entering the AI age.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-display-italic text-lg text-muted-foreground/90 mb-10 max-w-2xl"
          >
            We&apos;re looking for engineers, designers, writers, marketers, and
            operators who want to build cool things with sharp people.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="sonar" aria-hidden>
              <span />
            </span>
            <span className="font-mono-anchor text-xs uppercase tracking-[0.4em] text-muted-foreground">
              we ship.
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Who we want ────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="py-16 px-6 border-t border-border/40"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl tracking-tight"
          >
            Who we want
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="space-y-5 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              You move fast. You ship. You can hold a conversation with a
              non-technical operator and translate their pain into software.
            </p>
            <p>
              You&apos;re an AI engineer, a designer with taste, a writer who
              can sell, an ops person who runs the play. Or a generalist who
              does two of those at 80%. We don&apos;t care about credentials.
              We care about your last 90 days of work.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-3 gap-4 pt-2"
          >
            {[
              {
                t: "Cash work",
                d: "Fixed-scope client builds. Get paid on delivery. Pick what you take.",
              },
              {
                t: "Equity work",
                d: "Build owned products with us. Revshare or equity stake on what you ship.",
              },
              {
                t: "Side bets",
                d: "Have a project that fits Anchor? Bring it. We help launch and split upside.",
              },
            ].map((p) => (
              <motion.div
                key={p.t}
                variants={fadeUp}
                whileHover={{ y: -3, borderColor: "hsl(var(--accent))" }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="border border-border rounded-lg p-5 bg-card"
              >
                <div className="font-semibold mb-1">{p.t}</div>
                <p className="text-sm text-muted-foreground">{p.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Form ───────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="py-16 px-6 border-t border-border/40 bg-muted/30"
      >
        <div className="max-w-2xl mx-auto">
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl tracking-tight mb-3"
          >
            Express interest
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-10">
            Quick form. Goes straight to Adam.
          </motion.p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="bg-card border border-accent/40 rounded-xl p-8 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl">You&apos;re aboard.</h3>
              <p className="text-muted-foreground leading-relaxed">
                Thanks. Adam will read this himself and reply. While you wait,
                if you&apos;d rather chat live, his WhatsApp and Calendly are on
                the home page.
              </p>
              <div className="flex gap-3 pt-2">
                <Button asChild>
                  <a href="/">Back to home</a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={siteConfig.socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DM on X
                  </a>
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" name="name" placeholder="Your name" />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                  required
                />
              </div>

              <Field
                label="Role / Skills"
                name="role"
                placeholder="AI engineer, designer, writer, operator, etc."
              />

              <Field
                label="Links"
                name="links"
                placeholder="X, GitHub, portfolio. One per line is fine."
              />

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground"
                >
                  What do you want to build?{" "}
                  <span className="text-muted-foreground font-normal">
                    (required)
                  </span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="A few sentences. What you've shipped lately, why Anchor sounds interesting, what you'd want to do here."
                  className="bg-card"
                />
              </div>

              {errorMsg && (
                <p className="text-sm text-destructive">{errorMsg}</p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending..." : "Send"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <a
                    href={`mailto:${siteConfig.email}?subject=Come%20aboard%20Anchor`}
                  >
                    Or just email
                  </a>
                </Button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.section>
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && (
          <span className="text-muted-foreground font-normal">
            {" "}
            (required)
          </span>
        )}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="bg-card"
      />
    </div>
  )
}
