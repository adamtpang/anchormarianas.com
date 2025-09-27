"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, ExternalLink, Star, Quote, Users, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO, MusicTech Inc",
    company: "MusicTech Inc",
    image: "/testimonial-1.jpg",
    content:
      "Adam's work on our music composition platform was exceptional. His deep understanding of both technology and music theory helped us create something truly innovative. User engagement increased by 250% after the launch.",
    rating: 5,
    project: "Music Platform Development",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Founder, ThinkLab",
    company: "ThinkLab",
    image: "/testimonial-2.jpg",
    content:
      "Working with Adam on our philosophy discussion platform was transformative. He brought both technical excellence and deep intellectual curiosity to the project. The result exceeded all our expectations.",
    rating: 5,
    project: "Philosophy Platform",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Product Manager, CreativeFlow",
    company: "CreativeFlow",
    image: "/testimonial-3.jpg",
    content:
      "Adam's approach to building creative tools is unique. He understands the creative process deeply and translates that into beautiful, functional software. Our user satisfaction scores doubled after his redesign.",
    rating: 5,
    project: "Creative Tools Platform",
  },
]

const caseStudies = [
  {
    id: 1,
    title: "Harmony Engine: From Concept to 5K+ Users",
    client: "Personal Project",
    challenge: "Create an AI-powered music composition tool that actually understands musical theory",
    solution: "Built an intelligent system that combines machine learning with deep music theory knowledge",
    results: [
      "5,000+ active musicians using the platform",
      "4.9/5 star rating from users",
      "Featured in Electronic Musician Magazine",
      "Integrated with major DAWs",
    ],
    image: "/case-study-harmony.jpg",
    tags: ["React", "AI", "Music Theory", "WebAudio"],
    demoUrl: "https://harmony-engine.vercel.app",
  },
  {
    id: 2,
    title: "Philosophy Essays Platform",
    client: "Personal Project",
    challenge: "Create a platform for deep philosophical discourse that encourages thoughtful engagement",
    solution: "Developed a unique comment system with threading, emphasis on quality over quantity",
    results: [
      "10,000+ monthly readers",
      "Average reading time: 12 minutes",
      "95% positive feedback on discourse quality",
      "Cited by academic philosophers",
    ],
    image: "/case-study-philosophy.jpg",
    tags: ["Next.js", "MDX", "Philosophy", "Community"],
    demoUrl: "https://essays.adampang.com",
  },
  {
    id: 3,
    title: "Real-time Collaboration Tool for Creatives",
    client: "CreativeFlow",
    challenge: "Build a real-time collaboration platform for creative teams with complex workflows",
    solution: "Architected a WebSocket-based system with conflict resolution and version control",
    results: [
      "99.9% uptime since launch",
      "Sub-100ms latency for real-time updates",
      "500+ creative teams using the platform",
      "40% increase in team productivity reported",
    ],
    image: "/case-study-collaboration.jpg",
    tags: ["React", "WebSockets", "Real-time", "Collaboration"],
    demoUrl: "",
  },
]

const clientLogos = [
  { name: "MusicTech", logo: "/client-logo-1.jpg" },
  { name: "ThinkLab", logo: "/client-logo-2.jpg" },
  { name: "CreativeFlow", logo: "/client-logo-3.jpg" },
  { name: "CodeCraft", logo: "/client-logo-4.jpg" },
  { name: "DesignStudio", logo: "/client-logo-5.jpg" },
  { name: "InnovateNow", logo: "/client-logo-6.jpg" },
]

const stats = [
  { label: "Projects Completed", value: "20+", icon: Award },
  { label: "Happy Clients", value: "15+", icon: Users },
  { label: "Average Rating", value: "4.9/5", icon: Star },
  { label: "Years Experience", value: "5+", icon: TrendingUp },
]

export default function ProofPage() {
  const [selectedCase, setSelectedCase] = useState<(typeof caseStudies)[0] | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        {/* Header */}
        <section className="text-center mb-12 border-b border-border pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Proven Results, Happy Clients</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Don't just take my word for it. See the real impact I've made for projects and clients with
            measurable results and testimonials.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="bg-muted/30 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">What Clients Say</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Real feedback from real clients who've seen real results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-accent/20 mb-4" />

                <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">{testimonial.content}</p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>

                <Badge variant="outline" className="mt-4">
                  {testimonial.project}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Case Studies</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Deep dives into successful projects and the results achieved
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div key={study.id} className="bg-card rounded-2xl overflow-hidden border border-border">
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  <div className={`aspect-video lg:aspect-auto ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <img
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div>
                        <Badge variant="outline" className="mb-3">
                          {study.client}
                        </Badge>
                        <h3 className="text-2xl font-bold mb-4 text-balance">{study.title}</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-accent mb-2">Challenge</h4>
                          <p className="text-muted-foreground text-sm text-pretty">{study.challenge}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-accent mb-2">Solution</h4>
                          <p className="text-muted-foreground text-sm text-pretty">{study.solution}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-accent mb-2">Results</h4>
                          <ul className="space-y-1">
                            {study.results.map((result, i) => (
                              <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {study.demoUrl && (
                        <Button asChild className="w-fit">
                          <Link href={study.demoUrl} target="_blank">
                            <Play className="w-4 h-4 mr-2" />
                            View Demo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Logos */}
        <section className="mb-12 border-t border-border pt-12">
          <div className="text-center mb-12">
            <h3 className="text-lg font-semibold text-muted-foreground mb-8">Trusted by innovative teams</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {clientLogos.map((client, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    src={client.logo || "/placeholder.svg"}
                    alt={client.name}
                    className="h-8 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-accent/5 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-muted-foreground text-pretty mb-8">
            Let's discuss how we can work together to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/work-with-me">Start Your Project</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/portfolio">
                View All Work
                <ExternalLink className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}