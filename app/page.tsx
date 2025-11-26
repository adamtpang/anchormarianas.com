"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Linkedin, Github, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { AppCard } from "@/components/app-card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"
import { ChatInterface } from "@/components/chat-interface"

import defaultApps from "@/content/apps-overrides.json"

export default function HomePage() {
  const [apps, setApps] = useState<any[]>(defaultApps)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetch('/api/apps')
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const text = await res.text()
        try {
          return JSON.parse(text)
        } catch (e) {
          console.error("Failed to parse apps JSON:", text)
          return []
        }
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge fetched data with default apps to preserve order and ensure no data loss
          setApps(prevApps => {
            const appMap = new Map(prevApps.map(app => [app.slug, app]))
            data.forEach(app => {
              appMap.set(app.slug, { ...appMap.get(app.slug), ...app })
            })
            // Convert back to array, prioritizing the order from the API if it exists, or falling back to map values
            // Actually, let's just use the API data but ensure we don't lose overrides if API is partial?
            // Better: Update the items in the map, then return the values.
            // But we want to respect the API's sorting (recency).

            // If API returns a full list, use it.
            // If API returns a partial list (unlikely with our backend fix), we might lose items if we just replace.
            // Let's trust the API list but if it's shorter than defaultApps, maybe we should merge?
            // The user said "some cards just disappear". This implies the API list IS shorter.
            // So let's merge: Take all unique apps from both, prefer API data.

            const mergedMap = new Map()
            // Add defaults first
            defaultApps.forEach(app => mergedMap.set(app.slug, app))
            // Update/Add with API data
            data.forEach(app => mergedMap.set(app.slug, app))

            return Array.from(mergedMap.values()).sort((a: any, b: any) => {
              return new Date(b.lastPush || 0).getTime() - new Date(a.lastPush || 0).getTime()
            })
          })
        }
      })
      .catch(err => console.error("Failed to fetch apps:", err))
  }, [])

  const displayedApps = showAll ? apps : apps.slice(0, 9)

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'beta': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'building': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case 'archived': return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

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
                Ship Your <span className="text-accent">Website</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                High-impact digital products for ambitious brands.<br />
                <span className="text-base">Clear pricing. Fast delivery. No agencies.</span>
              </p>
            </div>

            {/* Key Stats */}
            <div className="flex items-center justify-center gap-12 text-sm md:text-base pt-4">
              <div>
                <div className="text-2xl md:text-3xl font-bold">14d</div>
                <div className="text-muted-foreground">Avg. Delivery</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">100%</div>
                <div className="text-muted-foreground">Satisfaction</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">Direct</div>
                <div className="text-muted-foreground">Communication</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
                  Start Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
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

      {/* App Studio */}
      <section id="products" className="py-20 px-6 scroll-mt-16 bg-primary text-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">App Studio</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Here are some apps we've built. <br />
                <span className="text-base opacity-80">Want your own? Check our <Link href="#services" className="underline hover:text-white">Services</Link> below.</span>
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-4">
            {displayedApps.map((app: any) => (
              <div key={app.slug} className="group flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-lg bg-white border border-border hover:border-accent hover:shadow-lg transition-all duration-300">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                      {app.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {app.status && (
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      )}
                      {app.stars > 0 && (
                        <div className="flex items-center gap-1 text-xs text-accent-foreground bg-accent/10 px-2 py-0.5 rounded-full">
                          <Github className="w-3 h-3" />
                          {app.stars}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-2xl line-clamp-1 md:line-clamp-none">
                    {app.oneLiner}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                  {app.url && (
                    <Button variant="outline" size="sm" className="h-8 text-xs text-muted-foreground hover:text-primary" asChild>
                      <a href={app.url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3.5 h-3.5 mr-1.5" />
                        Code
                      </a>
                    </Button>
                  )}
                  {(app.demoUrl || app.url) && (
                    <Button size="sm" className="h-8 text-xs bg-primary text-white hover:bg-primary/90" asChild>
                      <a href={app.demoUrl || app.url} target="_blank" rel="noopener noreferrer">
                        Visit
                        <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

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
                  className="bg-white text-black hover:bg-gray-100 border-2"
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
              {/* Starter */}
              <StaggerItem>
                <div className="group bg-white rounded-xl p-8 border-2 border-border hover:border-accent hover:shadow-xl transition-all duration-300 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">Starter</h3>
                      <div className="text-xs font-semibold text-muted-foreground px-3 py-1 bg-muted rounded-full">
                        1 week
                      </div>
                    </div>
                    <div className="text-4xl font-bold">$900</div>
                    <p className="text-sm text-muted-foreground">Launch your idea fast.</p>
                  </div>
                  <div className="h-px bg-border"></div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      One-page landing site
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      Mobile responsive
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      SEO optimized
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      Analytics setup
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </div>
              </StaggerItem>

              {/* Growth */}
              <StaggerItem>
                <div className="group bg-white rounded-xl p-8 border-2 border-accent shadow-xl hover:shadow-2xl transition-all duration-300 relative space-y-6 transform scale-105">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">Growth</h3>
                      <div className="text-xs font-semibold text-accent-foreground px-3 py-1 bg-accent/10 rounded-full">
                        2 weeks
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-accent">$2,200</div>
                    <p className="text-sm text-muted-foreground">Scale your presence.</p>
                  </div>
                  <div className="h-px bg-accent/20"></div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      Up to 5 pages
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      CMS integration
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      Custom animations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      Contact forms
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </div>
              </StaggerItem>

              {/* Scale */}
              <StaggerItem>
                <div className="group bg-white rounded-xl p-8 border-2 border-border hover:border-accent hover:shadow-xl transition-all duration-300 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">Scale</h3>
                      <div className="text-xs font-semibold text-muted-foreground px-3 py-1 bg-muted rounded-full">
                        Custom
                      </div>
                    </div>
                    <div className="text-4xl font-bold">Custom</div>
                    <p className="text-sm text-muted-foreground">Complex applications.</p>
                  </div>
                  <div className="h-px bg-border"></div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      Web applications
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      Database design
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      API development
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      Auth & Payments
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
                      Book Call
                    </a>
                  </Button>
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
                    I've worked with organizations like <strong className="text-foreground">Prospera</strong>, <strong className="text-foreground">Hilton</strong>, and others, shipping products that solve real problems.
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
      <section className="py-20 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-black">Tell Us What You Need</h2>
              <p className="text-xl text-black max-w-2xl mx-auto">
                We'll get back to you within 48 hours
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
