import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mail, Calendar } from "lucide-react"

const services = [
  {
    title: "Technical Consulting",
    description: "Strategic guidance on product development, architecture decisions, and technology choices.",
    outcomes: [
      "Clear technical roadmaps",
      "Architecture recommendations",
      "Technology stack guidance",
      "Performance optimization strategies",
    ],
    ideal: "Early-stage startups and established companies looking to make informed technical decisions.",
  },
  {
    title: "Product Development",
    description: "End-to-end development of web applications, tools, and digital experiences.",
    outcomes: [
      "Custom web applications",
      "User interface design & development",
      "API design and implementation",
      "Performance-optimized solutions",
    ],
    ideal: "Organizations needing thoughtful, well-crafted digital products.",
  },
  {
    title: "Educational Technology",
    description: "Specialized in building tools and platforms that enhance learning and knowledge sharing.",
    outcomes: [
      "Learning management systems",
      "Knowledge sharing platforms",
      "Interactive educational tools",
      "Community-building features",
    ],
    ideal: "Educational institutions, online course creators, and learning communities.",
  },
  {
    title: "Speaking & Workshops",
    description: "Talks and workshops on technology philosophy, digital minimalism, and thoughtful software design.",
    outcomes: ["Keynote presentations", "Technical workshops", "Team training sessions", "Conference talks"],
    ideal: "Conferences, companies, and educational institutions seeking thought-provoking content.",
  },
]

const testimonials = [
  {
    quote:
      "Adam's approach to technology is refreshingly thoughtful. He doesn't just build features—he thinks deeply about how they'll impact users and society.",
    author: "Sarah Chen",
    role: "Product Manager, TechCorp",
  },
  {
    quote:
      "Working with Adam was like having a philosopher and engineer rolled into one. His insights shaped not just our product, but our entire approach to technology.",
    author: "Marcus Rodriguez",
    role: "Founder, EduStart",
  },
]

export default function WorkWithMePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Work With Me</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          I help organizations build thoughtful technology that enhances human potential rather than diminishing it.
        </p>
      </section>

      {/* Philosophy */}
      <section className="mb-16">
        <Card className="border-border/50 bg-muted/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">My Approach</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I believe technology should amplify human capabilities, not replace them. Every project I take on is
              guided by questions like: Does this make people more capable? Does it respect their attention and agency?
              Will it contribute to human flourishing?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This philosophy shapes everything from architecture decisions to user interface design, resulting in
              products that are not just functional, but meaningful.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Services */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">How I Can Help</h2>
        <div className="space-y-8">
          {services.map((service, index) => (
            <Card key={service.title} className="border-border/50 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    0{index + 1}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">What you get:</h4>
                    <ul className="space-y-2">
                      {service.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Ideal for:</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.ideal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">What People Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <blockquote className="text-muted-foreground leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">How We'll Work Together</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-border/50 text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">1</span>
              </div>
              <CardTitle className="text-lg">Discovery</CardTitle>
              <CardDescription>
                We'll start with a conversation about your goals, challenges, and vision for the project.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">2</span>
              </div>
              <CardTitle className="text-lg">Strategy</CardTitle>
              <CardDescription>
                I'll develop a thoughtful approach that aligns technical solutions with your human-centered goals.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">3</span>
              </div>
              <CardTitle className="text-lg">Execution</CardTitle>
              <CardDescription>
                We'll work together iteratively, with regular check-ins and opportunities for feedback and refinement.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Ready to Start a Conversation?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              I'm selective about the projects I take on, focusing on work that aligns with my values and allows me to
              do my best work. Let's discuss whether we're a good fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="mailto:hello@adampang.com" className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Send me an email
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://cal.com/adampang" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule a call
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Response time: Usually within 24 hours</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}