import { Button } from "@/components/ui/button"
import {
  Anchor as AnchorIcon,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MessageCircle,
  Github,
} from "lucide-react"
import siteConfig from "@/content/site.json"

export default function CareersPage() {
  const channels = [
    {
      icon: Mail,
      title: "Email",
      sub: siteConfig.email,
      href: `mailto:${siteConfig.email}?subject=Come%20aboard%20Anchor`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      sub: siteConfig.phoneDisplay,
      href: siteConfig.whatsappLink,
      external: true,
    },
    {
      icon: ArrowUpRight,
      title: "DM on X",
      sub: "@adamtpang",
      href: siteConfig.socials.x,
      external: true,
    },
    {
      icon: Github,
      title: "Open source",
      sub: "github.com/adamtpang",
      href: siteConfig.socials.github,
      external: true,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* ── Hero ───────────────────────────── */}
      <section className="relative py-24 md:py-32 px-6 depth-veil">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-mono-anchor mb-7">
            <AnchorIcon className="w-3.5 h-3.5" />
            Come aboard
          </div>

          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] tracking-tight mb-6 text-balance">
            Build with us. <span className="font-display-italic">Set sail.</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-3 max-w-2xl">
            Anchor is a small AI studio out of Guam. We ship products, services,
            and owned assets for businesses entering the AI age.
          </p>

          <p className="font-display-italic text-lg text-muted-foreground/90 mb-10 max-w-2xl">
            We&apos;re looking for engineers, designers, writers, marketers, and
            operators who want to build cool things with sharp people.
          </p>

          <div className="flex items-center gap-3">
            <span className="sonar" aria-hidden>
              <span />
            </span>
            <span className="font-mono-anchor text-xs uppercase tracking-[0.4em] text-muted-foreground">
              we ship.
            </span>
          </div>
        </div>
      </section>

      {/* ── Who we want ────────────────────── */}
      <section className="py-16 px-6 border-t border-border/40">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">
            Who we want
          </h2>

          <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
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
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
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
                t: "Open source",
                d: "Every Anchor product has parts that ship as OSS. Contribute, get credit.",
              },
            ].map((p) => (
              <div
                key={p.t}
                className="border border-border rounded-lg p-5 bg-card"
              >
                <div className="font-semibold mb-1">{p.t}</div>
                <p className="text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Channels ───────────────────────── */}
      <section className="py-16 px-6 border-t border-border/40 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-3">
            How to reach Adam
          </h2>
          <p className="text-muted-foreground mb-10">
            Pick a channel. Send a few lines about what you&apos;ve shipped and
            what you want to do here. No form. No portal.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {channels.map((c) => {
              const Icon = c.icon
              const linkProps = c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {}
              return (
                <a
                  key={c.title}
                  href={c.href}
                  {...linkProps}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-accent transition-colors"
                >
                  <Icon className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-sm text-muted-foreground">{c.sub}</div>
                  </div>
                </a>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-3 pt-10">
            <Button size="lg" asChild>
              <a href={`mailto:${siteConfig.email}?subject=Come%20aboard%20Anchor`}>
                Send an email
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/">Back to home</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
