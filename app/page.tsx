"use client"

import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  Anchor as AnchorIcon,
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import siteConfig from "@/content/site.json"
import apps from "@/content/apps-overrides.json"
import testimonials from "@/content/testimonials.json"

const partners = [
  { name: "Hilton Guam", logo: "/partners/hilton.png" },
  { name: "Prospera", logo: "/partners/prospera.svg" },
  { name: "Network School", logo: null },
  { name: "IDI Guam", logo: null },
]

const clientWork = [
  {
    name: "Hilton Guam",
    summary: "Hospitality web product. Quick turnaround, polished delivery.",
    logo: "/partners/hilton.png",
  },
  {
    name: "Prospera",
    summary: "Marketing site for the charter city project. Shipped ahead of schedule.",
    logo: "/partners/prospera.svg",
  },
  {
    name: "Network School (ns.com)",
    summary: "Internal tools — issue estimator, link tracker, tutorial generator.",
    logo: null,
  },
  {
    name: "IDI Guam",
    summary: "Distribution partner web work. Responsive, professional, on spec.",
    logo: null,
  },
]

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  beta: "bg-sky-500/10 text-sky-500 border-sky-500/30",
  archived: "bg-muted text-muted-foreground border-border",
  sunset: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  building: "bg-violet-500/10 text-violet-500 border-violet-500/30",
}

const ease = [0.2, 0.8, 0.2, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    variants={stagger}
    className={className}
  >
    {children}
  </motion.section>
)

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 px-6 depth-veil">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-mono-anchor mb-7"
          >
            {siteConfig.origin}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl leading-[1.02] tracking-tight mb-6 text-balance"
          >
            The AI layer of <span className="font-display-italic">your business.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl text-muted-foreground leading-relaxed mb-3 max-w-2xl"
          >
            {siteConfig.elevator}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-display-italic text-lg text-muted-foreground/90 mb-10"
          >
            {siteConfig.originNote}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
            <Button size="lg" className="text-base px-6 py-5" asChild>
              <a
                href={siteConfig.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Discovery Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-6 py-5"
              asChild
            >
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <span className="sonar" aria-hidden>
              <span />
            </span>
            <span className="font-mono-anchor text-xs uppercase tracking-[0.4em] text-muted-foreground">
              we ship.
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 pt-8 border-t border-border/40"
          >
            <Image
              src="/adam.jpg"
              alt={siteConfig.founder}
              width={56}
              height={56}
              className="rounded-full object-cover w-14 h-14 border border-border"
              priority
            />
            <div>
              <div className="font-semibold text-sm">{siteConfig.founder}</div>
              <div className="text-sm text-muted-foreground">
                Founder, Anchor ·{" "}
                <a
                  href={siteConfig.personalSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline hover:text-accent"
                >
                  adamtomas.fun
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Trust strip ─────────────────────────────── */}
      <Section className="py-10 px-6 border-y border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5 text-center font-mono-anchor"
          >
            Shipped for
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-80"
          >
            {partners.map((p) =>
              p.logo ? (
                <div key={p.name} className="relative h-8 w-28">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    className="object-contain dark:invert dark:brightness-0 dark:opacity-90"
                    sizes="112px"
                  />
                </div>
              ) : (
                <div key={p.name} className="text-base font-semibold">
                  {p.name}
                </div>
              )
            )}
          </motion.div>
        </div>
      </Section>

      {/* ── What we do ──────────────────────────────── */}
      <Section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl tracking-tight">
            What we do
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              You run a business. The AI age is here. Maybe you're not technical
              — or maybe you are, but you don't have time to build it yourself.
            </p>
            <p>
              <strong className="text-foreground">
                Anchor is your AI layer.
              </strong>{" "}
              We figure out what to build, then we build it. Products, services,
              integrations — fast, transparent, delivered on a date you can hold
              us to.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-3 gap-4 pt-2"
          >
            {[
              {
                t: "AI Products",
                d: "Apps and tools we license to you, or build white-label for your business.",
              },
              {
                t: "AI Services",
                d: "Custom builds. Internal tools. Automations and integrations that save real hours.",
              },
              {
                t: "AI Strategy",
                d: "What to build, what to skip, how to operate. We've shipped a lot — we'll save you the wrong turns.",
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
      </Section>

      {/* ── Apps grid ───────────────────────────────── */}
      <Section
        id="apps"
        className="py-20 px-6 border-t border-border/40 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            className="flex items-end justify-between flex-wrap gap-4 mb-10"
          >
            <div>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight">
                Built by Anchor
              </h2>
              <p className="text-muted-foreground mt-2">
                Live software we own and ship. Receipts, not screenshots.
              </p>
            </div>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1"
            >
              See more on GitHub <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {apps.map((app) => (
              <motion.a
                key={app.slug}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                href={app.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card rounded-lg border border-border hover:border-accent transition-colors"
              >
                <div className="p-5 space-y-3 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-base group-hover:text-accent transition-colors">
                      {app.title}
                    </h3>
                    {app.status && (
                      <span
                        className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ${statusStyles[app.status]}`}
                      >
                        {app.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {app.oneLiner}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {app.topics?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="font-mono-anchor text-[11px] uppercase tracking-wider text-muted-foreground pt-1 flex items-center gap-1 group-hover:text-accent transition-colors">
                    {app.demoUrl?.replace(/^https?:\/\//, "")}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Client work ─────────────────────────────── */}
      <Section
        id="clients"
        className="py-20 px-6 bg-muted/30 border-t border-border/40 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl tracking-tight mb-2"
          >
            Built for clients
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-10">
            Brands that trusted us to ship for them.
          </motion.p>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
            {clientWork.map((c) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="bg-card rounded-lg border border-border p-5 hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  {c.logo ? (
                    <div className="relative h-7 w-24">
                      <Image
                        src={c.logo}
                        alt={c.name}
                        fill
                        className="object-contain object-left dark:invert dark:brightness-0 dark:opacity-90"
                        sizes="96px"
                      />
                    </div>
                  ) : (
                    <div className="font-semibold">{c.name}</div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {c.summary}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Testimonials ────────────────────────────── */}
      {testimonials.length > 0 && (
        <Section className="py-20 px-6 border-t border-border/40">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-5xl tracking-tight mb-10"
            >
              In their words
            </motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <motion.figure
                  key={i}
                  variants={fadeUp}
                  className="bg-card rounded-lg border border-border p-6 flex flex-col gap-4"
                >
                  <blockquote className="font-display-italic text-lg leading-snug">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="text-sm text-muted-foreground border-t border-border/60 pt-3 mt-auto">
                    <div className="font-semibold text-foreground">
                      {t.author}
                    </div>
                    <div>
                      {t.role} · {t.organization}
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </Section>
      )}

      {/* ── How it works ────────────────────────────── */}
      <Section className="py-20 px-6 bg-muted/30 border-t border-border/40">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl tracking-tight"
          >
            How it works
          </motion.h2>
          <motion.div variants={stagger} className="space-y-6">
            {[
              {
                n: 1,
                t: "Discovery call",
                d: "You tell us what you need. We ask the right questions. 20 minutes, free, no commitment.",
              },
              {
                n: 2,
                t: "Spec & price",
                d: "We write a clear tech spec: what gets built, how long it takes, what it costs. No surprises.",
              },
              {
                n: 3,
                t: "Build & ship",
                d: "Our AI engineers build it. You get updates. We deliver on time — or you don't pay.",
              },
            ].map((s) => (
              <motion.div key={s.n} variants={fadeUp} className="flex gap-4">
                <div className="shrink-0 w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold font-mono-anchor">
                  {s.n}
                </div>
                <div>
                  <div className="font-semibold text-lg">{s.t}</div>
                  <p className="text-muted-foreground">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Limited offer ───────────────────────────── */}
      <Section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="border-2 border-accent/60 rounded-xl p-8 md:p-10 space-y-4 bg-card"
          >
            <div className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono-anchor">
              Limited offer
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              50% off for our first 10 clients.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're building our portfolio and reputation. You get top-quality
              AI engineering at half price. In return, we ask for an honest
              testimonial when we deliver.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" asChild>
                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Claim Your Spot
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Come aboard ─────────────────────────────── */}
      <Section
        id="come-aboard"
        className="py-20 px-6 bg-muted/30 border-t border-border/40 scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-xs font-mono-anchor uppercase tracking-[0.3em] text-muted-foreground"
          >
            <AnchorIcon className="w-4 h-4" />
            Come aboard
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl tracking-tight"
          >
            Internet creatives, problem-solvers, AI builders — join the ship.
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="space-y-4 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              Anchor is more than a studio. It's a vehicle. We're building toward
              the kind of holding company that ships software, services, and
              ideas across the Pacific and beyond.
            </p>
            <p>
              If you're an engineer, designer, writer, or operator who wants to
              build cool things with sharp people — we want to talk. Cash work,
              equity work, side projects — all on the table.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" asChild>
              <a
                href={`mailto:${siteConfig.email}?subject=Come%20aboard%20Anchor&body=Hi%20Adam%2C%0A%0AI%27d%20like%20to%20come%20aboard%20Anchor.%20Here%27s%20a%20bit%20about%20me%3A%0A%0A`}
              >
                Express interest
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href={siteConfig.socials.x}
                target="_blank"
                rel="noopener noreferrer"
              >
                DM on X
              </a>
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* ── Contact ─────────────────────────────────── */}
      <Section className="py-20 px-6 border-t border-border/40">
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl tracking-tight"
          >
            Talk to us
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
            Pick whichever way works for you.
          </motion.p>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
            {[
              {
                href: siteConfig.calendly,
                icon: Calendar,
                title: "Book a Call",
                sub: "Free 20 min discovery call",
                external: true,
              },
              {
                href: siteConfig.whatsappLink,
                icon: MessageCircle,
                title: "WhatsApp",
                sub: siteConfig.phoneDisplay,
                external: true,
              },
              {
                href: `mailto:${siteConfig.email}`,
                icon: Mail,
                title: "Email",
                sub: siteConfig.email,
              },
              {
                href: `tel:${siteConfig.phone}`,
                icon: Phone,
                title: "Call",
                sub: siteConfig.phoneDisplay,
              },
            ].map((c) => {
              const Icon = c.icon
              return (
                <motion.a
                  key={c.title}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-accent transition-colors"
                >
                  <Icon className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-sm text-muted-foreground">{c.sub}</div>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
