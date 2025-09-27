import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Github, Twitter, Calendar, Star, Quote } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  Code + Music + Philosophy
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                  Building the future, <span className="text-accent">one project at a time</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Creative developer exploring the intersection of technology, music, and philosophy. Building meaningful digital experiences at Network School.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/services">
                    <Calendar className="w-5 h-5 mr-2" />
                    Work Together
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
                  <Link href="https://twitter.com/adampang" className="text-muted-foreground hover:text-accent transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="https://github.com/adampang" className="text-muted-foreground hover:text-accent transition-colors">
                    <Github className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-muted to-secondary rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-accent">20+</div>
                  <div className="text-muted-foreground">Projects Built</div>
                  <div className="grid grid-cols-10 gap-1 max-w-xs mx-auto">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div key={i} className={`aspect-square rounded-sm ${i < 6 ? "bg-accent" : "bg-border"}`} />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">6 live, 14 in development</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Featured Work</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              A curated selection of projects exploring technology, creativity, and meaningful digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Harmony Engine",
                description: "AI-powered music composition with intelligent harmonic suggestions",
                status: "Live",
                image: "/harmony-engine.jpg",
              },
              {
                title: "Philosophy Essays",
                description: "Platform for exploring deep thoughts on code, life, and meaning",
                status: "Live",
                image: "/philosophy-essays.jpg",
              },
              {
                title: "Stream Notes",
                description: "Real-time thought streaming and collaborative note-taking",
                status: "Beta",
                image: "/stream-notes.jpg",
              },
              {
                title: "Code Visualizer",
                description: "Beautiful visualization of code structure and dependencies",
                status: "Coming Soon",
                image: "/code-visualizer.jpg",
              },
              {
                title: "Minimal Writer",
                description: "Distraction-free writing environment with focus modes",
                status: "Live",
                image: "/minimal-writer.jpg",
              },
              {
                title: "Sound Designer",
                description: "Web-based tool for creating ambient soundscapes",
                status: "Live",
                image: "/sound-designer.jpg",
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
                      <Badge
                        className={`text-xs ${
                          project.status === "Live"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : project.status === "Beta"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {project.status}
                      </Badge>
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
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">What People Say</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Real feedback from collaborators and clients
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
                "Adam's work on our music composition platform was exceptional. His deep understanding of both technology and music theory helped us create something truly innovative. User engagement increased by 250% after the launch."
              </blockquote>

              <div className="text-center">
                <div className="font-semibold text-lg">Sarah Chen</div>
                <div className="text-muted-foreground">CTO, MusicTech Inc</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Work With Me</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Ready to bring your digital vision to life? Let's create something meaningful together.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-8 md:p-12 space-y-8 border border-border">
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Full-Stack Development</h3>
                <p className="text-muted-foreground text-sm">
                  Modern web applications with thoughtful design and solid architecture.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Creative Tools</h3>
                <p className="text-muted-foreground text-sm">
                  Building tools for musicians, writers, and creative professionals.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Technical Consulting</h3>
                <p className="text-muted-foreground text-sm">
                  Strategic guidance on technology choices and system architecture.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <div className="text-2xl font-bold">Starting at $150/hour</div>
                  <div className="text-muted-foreground">Flexible engagement models</div>
                </div>
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/services">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/essays">Essays</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/stream">Stream</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/archive">Archive</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/now">Now</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">Support</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}