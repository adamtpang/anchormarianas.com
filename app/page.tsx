"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Linkedin, Github, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { AppCard } from "@/components/app-card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { ChatInterface } from "@/components/chat-interface"

export default function HomePage() {
  const [apps, setApps] = useState([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetch('/api/apps')
      .then(res => res.json())
      .then(data => setApps(data))
      .catch(err => console.error("Failed to fetch apps:", err))
  }, [])

  const displayedApps = showAll ? apps : apps.slice(0, 9)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="min-h-[85vh] flex items-center justify-center px-6 py-20 bg-gradient-to-b from-white via-muted/10 to-white">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="AnchorMarianas Logo"
              width={200}
              height={200}
              priority
              className="w-24 h-24 md:w-32 md:h-32 opacity-90"
            />
          </div>

          {/* Heading */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
                Ship in <span className="text-accent">2 Weeks</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From idea to live product. Fixed price, clear timeline, direct communication.<br />
                <span className="text-base">No agencies. No middlemen. Just results.</span>
              </p>
            </div>

            {/* Key Stats */}
            <div className="flex items-center justify-center gap-12 text-sm md:text-base pt-4">
              <div>
                <div className="text-2xl md:text-3xl font-bold">12-14d</div>
                <div className="text-muted-foreground">Delivery</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">$900+</div>
                <div className="text-muted-foreground">Fixed Price</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">48hr</div>
                <div className="text-muted-foreground">Updates</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
                  Book Free Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/services">
                  View Pricing
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-2">
              Free 20-minute consultation · No commitment required
            </p>
          </div>

          {/* Trusted by */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-6">Trusted by</p>
            <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
              {/* Prospera */}
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                <div className="text-2xl font-bold tracking-wide text-foreground">Pr<span className="text-green-600">ó</span>spera</div>
              </div>
              {/* Hilton */}
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                <div className="text-2xl font-bold tracking-wide text-blue-600">HILTON</div>
              </div>
              {/* IDI Guam */}
              <div className="opacity-70 hover:opacity-100 transition-opacity">
                <div className="text-2xl font-bold tracking-wider text-foreground">IDI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-6 scroll-mt-16 bg-gradient-to-b from-primary-900 to-secondary-900 text-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Products</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Apps and digital products we've built and shipped. All live. All working.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedApps.map((app: any) => (
                <StaggerItem key={app.slug}>
                  <AppCard app={app} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {apps.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No products to show yet. Check back soon!</p>
            </div>
          )}

          {apps.length > 9 && !showAll && (
            <FadeIn delay={0.4}>
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary-900 hover:bg-blue-50 border-2"
                  onClick={() => setShowAll(true)}
                >
                  Show More ({apps.length - 9} more)
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 scroll-mt-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Fixed price. Clear timeline. No surprises.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Quick Build */}
            <StaggerItem>
              <div className="group bg-white rounded-xl p-8 border-2 border-border hover:border-accent hover:shadow-xl transition-all duration-300 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Quick Build</h3>
                  <div className="text-xs font-semibold text-muted-foreground px-3 py-1 bg-muted rounded-full">
                    12 days
                  </div>
                </div>
                <div className="text-4xl font-bold">$900</div>
                <p className="text-sm text-muted-foreground">1 landing page</p>
              </div>
              <div className="h-px bg-border"></div>
              <p className="text-muted-foreground leading-relaxed">
                Perfect for founders who need to ship fast and validate their idea.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Responsive design
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  SEO optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Logo included
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Analytics setup
                </li>
              </ul>
            </div>
            </StaggerItem>

            {/* Standard Build */}
            <StaggerItem>
              <div className="group bg-white rounded-xl p-8 border-2 border-accent shadow-xl hover:shadow-2xl transition-all duration-300 relative space-y-6 transform scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Standard Build</h3>
                  <div className="text-xs font-semibold text-accent-foreground px-3 py-1 bg-accent/10 rounded-full">
                    14 days
                  </div>
                </div>
                <div className="text-4xl font-bold text-accent">$2,200</div>
                <p className="text-sm text-muted-foreground">Up to 8 pages</p>
              </div>
              <div className="h-px bg-accent/20"></div>
              <p className="text-muted-foreground leading-relaxed">
                Full website for established businesses and growing startups.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Multi-page website
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Custom branding
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Forms & integrations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Performance optimized
                </li>
              </ul>
            </div>
            </StaggerItem>

            {/* Custom Build */}
            <StaggerItem>
              <div className="group bg-white rounded-xl p-8 border-2 border-border hover:border-accent hover:shadow-xl transition-all duration-300 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Custom Build</h3>
                  <div className="text-xs font-semibold text-muted-foreground px-3 py-1 bg-muted rounded-full">
                    &lt;30 days
                  </div>
                </div>
                <div className="text-4xl font-bold">$2,600<span className="text-xl text-muted-foreground">+</span></div>
                <p className="text-sm text-muted-foreground">Unlimited pages</p>
              </div>
              <div className="h-px bg-border"></div>
              <p className="text-muted-foreground leading-relaxed">
                Complex projects with custom features and integrations.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Advanced functionality
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Database & backend
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  API development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Priority support
                </li>
              </ul>
            </div>
            </StaggerItem>
          </div>
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="text-center space-y-4">
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link href="/services">
                  View Full Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
                  Book Free Call
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Free 20-minute consultation · No commitment
            </p>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 px-6 scroll-mt-16 bg-gradient-to-b from-muted/30 to-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">Team</h2>
              <p className="text-xl text-muted-foreground">
                Building products. Delivering for clients.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-border shadow-xl">
                <Image
                  src="/adam.jpg"
                  alt="Adam Pangelinan"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">Adam Pangelinan</h3>
                <p className="text-xl text-muted-foreground">Founder</p>
              </div>

              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I build internet products for myself and for clients. Fast, clean, focused on outcomes.
                </p>

                <p>
                  I've worked with organizations like <strong className="text-foreground">Prospera</strong>, <strong className="text-foreground">Hilton</strong>, <strong className="text-foreground">Network School</strong>, and others, shipping products that solve real problems.
                </p>

                <p>
                  My approach: Ship fast. No bloat. Focus on what converts.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://adamtomas.fun" target="_blank" rel="noopener noreferrer">
                    Personal Site
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://linkedin.com/in/adamtpang" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/adamtpang" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://x.com/adamtpang" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          </FadeIn>

        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-muted/20">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Start?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tell us what you want to build and we'll get back to you within 48 hours
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ChatInterface />
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="text-center mt-12 space-y-4">
              <p className="text-sm text-muted-foreground">
                Or skip the chat and book a call directly
              </p>
              <Button size="lg" variant="outline" asChild>
                <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
                  Book Free Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
