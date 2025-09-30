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
    role: "CEO, TechFlow",
    company: "TechFlow",
    image: "/professional-woman-diverse.png",
    content:
      "AnchorMarianas transformed our vision into a beautiful, functional product. The attention to detail and technical expertise exceeded our expectations. Our user engagement increased by 300% after launch.",
    rating: 5,
    project: "SaaS Dashboard Redesign",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Founder, GrowthLab",
    company: "GrowthLab",
    image: "/professional-man.jpg",
    content:
      "Working with AnchorMarianas was a game-changer. They delivered our MVP in just 3 weeks, and it helped us secure $500K in seed funding. The code quality and architecture are top-notch.",
    rating: 5,
    project: "MVP Development",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Product Manager, DataCorp",
    company: "DataCorp",
    image: "/professional-woman-glasses.png",
    content:
      "The technical consulting provided by AnchorMarianas saved us months of development time. Their strategic insights and hands-on approach helped us scale from 1K to 50K users seamlessly.",
    rating: 5,
    project: "Technical Consulting",
  },
]

const caseStudies = [
  {
    id: 1,
    title: "TaskFlow Pro: From Idea to 10K Users",
    client: "Internal Project",
    challenge: "Create an AI-powered project management tool that stands out in a crowded market",
    solution: "Built a modern, intuitive interface with smart automation features and seamless integrations",
    results: [
      "10,000+ active users in first 6 months",
      "4.8/5 star rating on product review sites",
      "$50K+ MRR within first year",
      "Featured in TechCrunch and Product Hunt",
    ],
    image: "/modern-task-management-app-interface.jpg",
    tags: ["React", "AI", "SaaS", "Product Design"],
    demoUrl: "https://taskflow.example.com",
  },
  {
    id: 2,
    title: "E-commerce Platform Transformation",
    client: "RetailMax",
    challenge: "Modernize legacy e-commerce platform to improve conversion rates and user experience",
    solution: "Complete redesign with modern checkout flow, mobile optimization, and performance improvements",
    results: [
      "45% increase in conversion rate",
      "60% reduction in page load times",
      "200% increase in mobile sales",
      "99.9% uptime since launch",
    ],
    image: "/ecommerce-website-homepage.png",
    tags: ["Next.js", "E-commerce", "Performance", "UX Design"],
    demoUrl: "",
  },
  {
    id: 3,
    title: "FinTech Dashboard for Investment Firm",
    client: "WealthTech Partners",
    challenge: "Create a real-time dashboard for portfolio management with complex data visualizations",
    solution: "Built a responsive dashboard with real-time data feeds, interactive charts, and advanced filtering",
    results: [
      "50% reduction in analysis time",
      "Real-time data processing for 1M+ transactions",
      "Improved client satisfaction by 40%",
      "Scalable architecture supporting 500+ concurrent users",
    ],
    image: "/data-visualization-dashboard.png",
    tags: ["React", "D3.js", "Real-time", "FinTech"],
    demoUrl: "",
  },
]

const clientLogos = [
  { name: "TechFlow", logo: "/tech-company-logo.jpg" },
  { name: "GrowthLab", logo: "/abstract-startup-logo.png" },
  { name: "DataCorp", logo: "/data-company-logo.png" },
  { name: "RetailMax", logo: "/abstract-retail-logo.png" },
  { name: "WealthTech", logo: "/fintech-logo.png" },
  { name: "InnovateCo", logo: "/innovation-logo.jpg" },
]

const stats = [
  { label: "Projects Delivered", value: "50+", icon: Award },
  { label: "Happy Clients", value: "25+", icon: Users },
  { label: "Average ROI", value: "300%", icon: TrendingUp },
  { label: "Client Satisfaction", value: "98%", icon: Star },
]

export default function ProofPage() {
  const [selectedCase, setSelectedCase] = useState<(typeof caseStudies)[0] | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">AnchorMarianas</span>
            </Link>
            <div className="text-sm text-muted-foreground">Proof of Work</div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Header */}
        <section className="py-12 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Proven Results, Happy Clients</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Don't just take our word for it. See the real impact we've made for businesses across industries with
              measurable results and client testimonials.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
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
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
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
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Case Studies</h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Deep dives into successful projects and the results achieved
              </p>
            </div>

            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <div key={study.id} className="bg-background rounded-2xl overflow-hidden border border-border">
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
          </div>
        </section>

        {/* Client Logos */}
        <section className="py-12 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-lg font-semibold text-muted-foreground mb-8">Trusted by innovative companies</h3>
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
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-accent/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Ready to Join Our Success Stories?</h2>
            <p className="text-xl text-muted-foreground text-pretty mb-8">
              Let's discuss how we can help you achieve similar results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/services">Start Your Project</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">
                  View All Work
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}