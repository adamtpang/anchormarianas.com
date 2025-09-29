import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Github, Twitter, Calendar, Star, Quote } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-foreground">
              AnchorMarianas
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#work" className="text-muted-foreground hover:text-foreground transition-colors">
                Work
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="/proof" className="text-muted-foreground hover:text-foreground transition-colors">
                Proof
              </Link>
              <Link href="/archive" className="text-muted-foreground hover:text-foreground transition-colors">
                Archive
              </Link>
            </div>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/services">
                <Calendar className="w-4 h-4 mr-2" />
                Hire Me
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  Digital Goods + Services Studio
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                  Building the future, <span className="text-accent">one app at a time</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  100 apps, digital goods + services, internet-first problem solving. AnchorMarianas is your container
                  for innovative digital solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/services">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule a Call
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/portfolio">
                    View Portfolio
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="text-sm text-muted-foreground">Follow the journey</div>
                <div className="flex items-center gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    <Github className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-muted to-secondary rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-accent">100</div>
                  <div className="text-muted-foreground">Apps in Development</div>
                  <div className="grid grid-cols-10 gap-1 max-w-xs mx-auto">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className={`aspect-square rounded-sm ${i < 12 ? "bg-accent" : "bg-border"}`} />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">12 shipped, 88 to go</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="work" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Selected Work</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              A curated selection of apps, tools, and digital experiences from the AnchorMarianas portfolio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "TaskFlow Pro",
                description: "AI-powered project management with smart automation",
                status: "Live",
                image: "/placeholder.svg",
              },
              {
                title: "CodeSnap",
                description: "Beautiful code screenshot generator for developers",
                status: "Live",
                image: "/placeholder.svg",
              },
              {
                title: "MindMap Studio",
                description: "Collaborative mind mapping for creative teams",
                status: "Beta",
                image: "/placeholder.svg",
              },
              {
                title: "DataViz Builder",
                description: "No-code data visualization platform",
                status: "Coming Soon",
                image: "/placeholder.svg",
              },
              {
                title: "WriteFlow",
                description: "Distraction-free writing environment with AI assistance",
                status: "Live",
                image: "/placeholder.svg",
              },
              {
                title: "SoundScape",
                description: "Ambient sound generator for focus and relaxation",
                status: "Live",
                image: "/placeholder.svg",
              },
            ].map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-background rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.status === "Live"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : project.status === "Beta"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm text-pretty">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/portfolio">
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Client Success Stories</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Real results from real clients who trusted AnchorMarianas with their vision
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border relative">
            <Quote className="w-12 h-12 text-accent/20 absolute top-6 left-6" />

            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-center text-pretty leading-relaxed mb-8">
                "AnchorMarianas transformed our vision into a beautiful, functional product. The attention to detail and
                technical expertise exceeded our expectations. Our user engagement increased by 300% after launch."
              </blockquote>

              <div className="text-center">
                <div className="font-semibold text-lg">Sarah Chen</div>
                <div className="text-muted-foreground">CEO, TechFlow</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/proof">
                View All Testimonials
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Hire AnchorMarianas</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Ready to bring your digital vision to life? Let's build something amazing together.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-8 md:p-12 space-y-8 border border-border">
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Full-Stack Development</h3>
                <p className="text-muted-foreground text-sm">
                  End-to-end web applications with modern frameworks and best practices.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Digital Product Design</h3>
                <p className="text-muted-foreground text-sm">
                  User-centered design from concept to launch, optimized for conversion.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Technical Consulting</h3>
                <p className="text-muted-foreground text-sm">
                  Strategic guidance on technology choices, architecture, and scaling.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <div className="text-2xl font-bold">Starting at $5,000</div>
                  <div className="text-muted-foreground">2-4 week delivery</div>
                </div>
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/services">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Discovery Call
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-semibold text-lg mb-2">AnchorMarianas</div>
              <div className="text-muted-foreground text-sm">Digital Goods + Services Studio</div>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="/archive" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                All Links
              </Link>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm mt-8">
            © 2025 AnchorMarianas. Building the future, one app at a time.
          </div>
        </div>
      </footer>
    </div>
  )
}