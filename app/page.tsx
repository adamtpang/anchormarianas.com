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
  Check,
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import siteConfig from "@/content/site.json"
import productsData from "@/content/products.json"
import servicesData from "@/content/services.json"
import assetsData from "@/content/assets.json"
import testimonials from "@/content/testimonials.json"

// ─── Schemas. Edit the matching JSON in /content. ───
type Product = {
  slug: string
  name: string
  tagline: string
  url?: string
  price?: string
  image?: string
  status?: "live" | "beta" | "building" | "archived"
}

type Service = {
  slug: string
  name: string
  tagline: string
  price: string
  timeline?: string
  deliverables?: string[]
  ideal?: string
  ctaUrl?: string
  ctaLabel?: string
}

type Asset = {
  slug: string
  name: string
  summary: string
  url?: string
  metric?: string
  type?: "equity" | "revshare" | "owned"
}

const products = productsData as Product[]
const services = servicesData as Service[]
const assets = assetsData as Asset[]

const statusStyles: Record<string, string> = {
  live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  beta: "bg-sky-500/10 text-sky-500 border-sky-500/30",
  archived: "bg-muted text-muted-foreground border-border",
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

const problems = [
  {
    pain: "We know AI can save us hours, but no idea where to start.",
    fix: "AI Readiness Audit. Top 10 ROI-ranked workflows in 7 days.",
  },
  {
    pain: "We tried ChatGPT, it was cool, nothing actually changed.",
    fix: "Workflows shipped into your stack, not screenshots in a deck.",
  },
  {
    pain: "Our team isn't technical. We can't build AI tools ourselves.",
    fix: "Anchor builds it. We hand over working software, not Notion docs.",
  },
  {
    pain: "We can't tell good vendors from snake oil.",
    fix: "We've shipped enough to call it. Vendor shortlist in every audit.",
  },
  {
    pain: "We need this continuously, not as a one-off project.",
    fix: "Fractional retainer. Pause any week.",
  },
  {
    pain: "We want results, not hourly billing or surprise scope creep.",
    fix: "Fixed price, fixed timeline, fixed deliverables. Or you don't pay.",
  },
]

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

      {/* ── Problems we solve ───────────────────────── */}
      <Section
        id="problems"
        className="py-20 px-6 border-t border-border/40 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="mb-10 max-w-3xl">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight">
              Problems we solve
            </h2>
            <p className="text-muted-foreground mt-2">
              Real pains, not pitch decks. If any of these sound familiar,
              we&apos;re built for you.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 gap-4"
          >
            {problems.map((p) => (
              <motion.div
                key={p.pain}
                variants={fadeUp}
                whileHover={{ y: -3, borderColor: "hsl(var(--accent))" }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="border border-border rounded-lg p-6 bg-card flex flex-col gap-3"
              >
                <p className="font-display-italic text-lg leading-snug">
                  &ldquo;{p.pain}&rdquo;
                </p>
                <p className="text-sm text-muted-foreground border-t border-border/60 pt-3">
                  <span className="font-mono-anchor uppercase tracking-wider text-[10px] text-accent mr-2">
                    Anchor
                  </span>
                  {p.fix}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Team ─────────────────────────────────────── */}
      <Section
        id="team"
        className="py-20 px-6 bg-muted/30 border-t border-border/40 scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight">
              Team
            </h2>
            <p className="text-muted-foreground mt-2">
              Today, Anchor is one person. By design.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-card rounded-xl border border-border p-6 md:p-8 mb-10"
          >
            <p className="text-lg leading-relaxed mb-3">
              <span className="font-display text-2xl">
                {siteConfig.founder}.
              </span>{" "}
              Founder. Engineer. Operator.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Anchor runs lean on purpose. Fewer hands means tighter feedback
              loops, faster shipping, no internal sales-engineering ping-pong.
              When the work outgrows one operator, we bring in trusted
              collaborators on a project basis. Never bodies-on-billable-hours.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-anchor uppercase tracking-[0.3em] text-muted-foreground">
              <AnchorIcon className="w-4 h-4" />
              Come aboard
            </div>
            <h3 className="font-display text-2xl md:text-3xl tracking-tight">
              Builders, this door is open.
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Engineers, designers, writers, marketers, operators. If you ship
              and want to ship more, send us your last 90 days of work. Cash
              work, equity work, side bets, open-source contributions all on
              the table.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild>
                <a href="/careers">
                  Express interest
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open source on GitHub
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Services ─────────────────────────────────── */}
      {services.length > 0 && (
        <Section
          id="services"
          className="py-20 px-6 border-t border-border/40 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} className="mb-10">
              <h2 className="font-display text-3xl md:text-5xl tracking-tight">
                Services
              </h2>
              <p className="text-muted-foreground mt-2">
                Fixed-scope AI engineering. Pick a tier, ship a date.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {services.map((s) => (
                <motion.div
                  key={s.slug}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="bg-card rounded-lg border border-border p-6 flex flex-col gap-4 hover:border-accent transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{s.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {s.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl">{s.price}</span>
                    {s.timeline && (
                      <span className="text-xs text-muted-foreground font-mono-anchor uppercase tracking-wider">
                        {s.timeline}
                      </span>
                    )}
                  </div>

                  {s.deliverables && s.deliverables.length > 0 && (
                    <ul className="space-y-1.5 text-sm">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 mt-1 text-accent shrink-0" />
                          <span className="text-muted-foreground">{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.ideal && (
                    <p className="text-xs text-muted-foreground italic">
                      Ideal for: {s.ideal}
                    </p>
                  )}

                  <Button asChild variant="outline" className="mt-auto">
                    <a
                      href={s.ctaUrl || siteConfig.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.ctaLabel || "Book a call"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>
      )}

      {/* ── Products ─────────────────────────────────── */}
      {products.length > 0 && (
        <Section
          id="products"
          className="py-20 px-6 border-t border-border/40 bg-muted/30 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} className="mb-10">
              <h2 className="font-display text-3xl md:text-5xl tracking-tight">
                Products
              </h2>
              <p className="text-muted-foreground mt-2">
                Software Anchor owns and ships. Use it, or have us white-label it.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {products.map((p) => (
                <motion.a
                  key={p.slug}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  href={p.url || "#"}
                  target={p.url ? "_blank" : undefined}
                  rel={p.url ? "noopener noreferrer" : undefined}
                  className="group block bg-card rounded-lg border border-border hover:border-accent transition-colors overflow-hidden"
                >
                  {p.image && (
                    <div className="relative aspect-[16/9] bg-muted">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-base group-hover:text-accent transition-colors">
                        {p.name}
                      </h3>
                      {p.status && (
                        <span
                          className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ${statusStyles[p.status] ?? statusStyles.live}`}
                        >
                          {p.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.tagline}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      {p.price && (
                        <span className="font-display text-lg">{p.price}</span>
                      )}
                      {p.url && (
                        <span className="font-mono-anchor text-[11px] uppercase tracking-wider text-muted-foreground group-hover:text-accent transition-colors flex items-center gap-1">
                          Open
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </Section>
      )}

      {/* ── Assets ───────────────────────────────────── */}
      {assets.length > 0 && (
        <Section
          id="assets"
          className="py-20 px-6 border-t border-border/40 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} className="mb-10">
              <h2 className="font-display text-3xl md:text-5xl tracking-tight">
                Assets
              </h2>
              <p className="text-muted-foreground mt-2">
                Newsletters, libraries, equity, revshare. Stuff Anchor owns.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {assets.map((a) => (
                <motion.div
                  key={a.slug}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="bg-card rounded-lg border border-border p-5 flex flex-col gap-3 hover:border-accent transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{a.name}</h3>
                    {a.type && (
                      <span className="text-[10px] uppercase tracking-wider font-mono-anchor text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                        {a.type}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {a.summary}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    {a.metric && (
                      <span className="font-display text-base">{a.metric}</span>
                    )}
                    {a.url && (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-anchor text-[11px] uppercase tracking-wider text-muted-foreground hover:text-accent flex items-center gap-1"
                      >
                        View
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>
      )}

      {/* ── Recent work (Hilton) ─────────────────────── */}
      <Section
        id="clients"
        className="py-20 px-6 bg-muted/30 border-t border-border/40 scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-5xl tracking-tight mb-2"
          >
            Recent work
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-10">
            Brands that paid Anchor to ship for them.
          </motion.p>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="bg-card rounded-xl border border-border p-8 hover:border-accent transition-colors"
          >
            <div className="relative h-10 w-32 mb-5">
              <Image
                src="/partners/hilton.png"
                alt="Hilton Guam"
                fill
                className="object-contain object-left dark:invert dark:brightness-0 dark:opacity-90"
                sizes="128px"
              />
            </div>
            <p className="text-lg leading-relaxed">
              Hospitality web product for Hilton Guam. Quick turnaround, polished
              delivery, on spec.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ── Testimonial ──────────────────────────────── */}
      {testimonials.length > 0 && (
        <Section className="py-20 px-6 border-t border-border/40">
          <div className="max-w-3xl mx-auto">
            <motion.figure
              variants={fadeUp}
              className="bg-card rounded-xl border border-border p-8 md:p-10 flex flex-col gap-6"
            >
              <blockquote className="font-display-italic text-2xl md:text-3xl leading-snug">
                &ldquo;{testimonials[0].quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-muted-foreground border-t border-border/60 pt-4">
                <div className="font-semibold text-foreground">
                  {testimonials[0].author}
                </div>
                <div>
                  {testimonials[0].role} · {testimonials[0].organization}
                </div>
              </figcaption>
            </motion.figure>
          </div>
        </Section>
      )}

      {/* ── How it works ─────────────────────────────── */}
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
                d: "Our AI engineers build it. You get updates. We deliver on time, or you don't pay.",
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

      {/* ── Limited offer ────────────────────────────── */}
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
              We&apos;re building our portfolio and reputation. You get
              top-quality AI engineering at half price. In return, we ask for an
              honest testimonial when we deliver.
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

      {/* ── Contact ──────────────────────────────────── */}
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
