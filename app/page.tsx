"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone, MessageCircle, Calendar } from "lucide-react"
import Image from "next/image"
import siteConfig from "@/content/site.json"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero: Face + Name + What This Is ── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-5 mb-10">
            <Image
              src="/adam.jpg"
              alt="Adam Tomas Pangelinan"
              width={80}
              height={80}
              className="rounded-full object-cover w-20 h-20 border-2 border-border"
              priority
            />
            <div>
              <div className="text-xl font-bold">Adam Pangelinan</div>
              <div className="text-muted-foreground">Founder, Anchor</div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            We build your software with AI. You get it fast and right.
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            Anchor is a team of AI engineers. Tell us your problem, we scope it,
            price it, build it, and deliver it. No guesswork. No bloat.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="text-base px-6 py-5" asChild>
              <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer">
                Book a Discovery Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-6 py-5" asChild>
              <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="py-16 px-6 border-t border-border/40">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold">What we do</h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              You have a business problem. Maybe you need internal tooling to save your team
              10 hours a week. Maybe you need a customer-facing app. Maybe you need
              to automate something that's costing you money.
            </p>
            <p>
              <strong className="text-foreground">We figure out what to build, then we build it.</strong>{" "}
              Our engineers use AI to move fast without cutting corners. You get a
              clear spec, a transparent price, and a delivery date you can hold us to.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="border border-border rounded-lg p-5">
              <div className="font-semibold mb-1">Websites & Apps</div>
              <p className="text-sm text-muted-foreground">Landing pages, web apps, dashboards, mobile-ready products.</p>
            </div>
            <div className="border border-border rounded-lg p-5">
              <div className="font-semibold mb-1">Internal Tools</div>
              <p className="text-sm text-muted-foreground">Automations, integrations, admin panels. Save time, save money.</p>
            </div>
            <div className="border border-border rounded-lg p-5">
              <div className="font-semibold mb-1">AI Integration</div>
              <p className="text-sm text-muted-foreground">Add AI to your existing workflows. Chatbots, analysis, generation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <div className="font-semibold text-lg">Discovery call</div>
                <p className="text-muted-foreground">You tell us what you need. We ask the right questions. 20 minutes, free, no commitment.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <div className="font-semibold text-lg">Spec & price</div>
                <p className="text-muted-foreground">We write a clear tech spec: what gets built, how long it takes, what it costs. No surprises.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <div className="font-semibold text-lg">Build & deliver</div>
                <p className="text-muted-foreground">Our AI engineers build it. You get updates. We deliver on time or you don't pay.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── First 10 Clients Offer ── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="border-2 border-accent rounded-xl p-8 md:p-10 space-y-4">
            <div className="inline-block bg-accent/10 text-accent text-sm font-bold px-3 py-1 rounded-full">
              Limited offer
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              50% off for our first 10 clients.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're building our portfolio and reputation. You get top-quality
              AI engineering at half price. In return, we ask for an honest
              testimonial when we deliver.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" asChild>
                <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer">
                  Claim Your Spot
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Talk to us</h2>
          <p className="text-lg text-muted-foreground">Pick whichever way works for you.</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:border-accent/50 transition-colors"
            >
              <Calendar className="w-6 h-6 text-accent shrink-0" />
              <div>
                <div className="font-semibold">Book a Call</div>
                <div className="text-sm text-muted-foreground">Free 20 min discovery call</div>
              </div>
            </a>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:border-accent/50 transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-accent shrink-0" />
              <div>
                <div className="font-semibold">WhatsApp</div>
                <div className="text-sm text-muted-foreground">{siteConfig.whatsapp}</div>
              </div>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:border-accent/50 transition-colors"
            >
              <Mail className="w-6 h-6 text-accent shrink-0" />
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-sm text-muted-foreground">{siteConfig.email}</div>
              </div>
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:border-accent/50 transition-colors"
            >
              <Phone className="w-6 h-6 text-accent shrink-0" />
              <div>
                <div className="font-semibold">Call</div>
                <div className="text-sm text-muted-foreground">{siteConfig.phoneDisplay}</div>
              </div>
            </a>
            <a
              href={`tel:${siteConfig.phone2}`}
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:border-accent/50 transition-colors"
            >
              <Phone className="w-6 h-6 text-accent shrink-0" />
              <div>
                <div className="font-semibold">Call</div>
                <div className="text-sm text-muted-foreground">{siteConfig.phone2Display}</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
