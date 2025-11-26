import { AnimatedCardGrid } from "@/components/motion/animated-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from "@/components/motion-wrapper"

export const metadata = {
  title: "Design System Demo | AnchorMarianas",
  description: "Showcase of our design stack: shadcn/ui, Framer Motion, and Coolors palette"
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-primary-900 to-secondary-900 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <FadeIn>
            <Badge variant="secondary" className="bg-accent text-white border-0 mb-4">
              Design System
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Built with Best Practices
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Combining shadcn/ui components, Framer Motion animations, and a carefully crafted ocean-themed color palette.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Components Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.2}>
            <h2 className="text-4xl font-bold text-center mb-4">Animated Components</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Every card fades in, scales on hover, and provides tactile feedback on tap.
            </p>
          </FadeIn>

          <AnimatedCardGrid />
        </div>
      </section>

      {/* Animations Demo */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Animation Presets</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <SlideInLeft>
              <div className="bg-card border-2 border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">← Slide From Left</h3>
                <p className="text-muted-foreground">
                  Perfect for introducing content that flows naturally from left to right.
                </p>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <div className="bg-card border-2 border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Slide From Right →</h3>
                <p className="text-muted-foreground">
                  Great for alternating content sections or comparison layouts.
                </p>
              </div>
            </SlideInRight>
          </div>

          <FadeIn delay={0.4}>
            <div className="bg-card border-2 border-accent rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Fade In (with delay)</h3>
              <p className="text-muted-foreground">
                Subtle entrance that doesn't distract from content.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stagger Animation */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Stagger Lists</h2>

          <StaggerContainer>
            {[
              { title: "Fast Performance", desc: "Optimized animations that don't block the main thread" },
              { title: "Type Safe", desc: "Full TypeScript support for all components and variants" },
              { title: "Accessible", desc: "Respects prefers-reduced-motion for users who need it" },
              { title: "Production Ready", desc: "Battle-tested patterns used in real projects" }
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="bg-card border border-border rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Ocean Color Palette</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Inspired by the Mariana Trench - professional blues with clean whites.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold mb-4">Primary - Deep Navy</h3>
              <div className="bg-primary-900 text-white p-4 rounded-lg">900 - Headers</div>
              <div className="bg-primary-500 text-white p-4 rounded-lg">500 - Links</div>
              <div className="bg-primary-100 text-foreground p-4 rounded-lg">100 - Backgrounds</div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold mb-4">Accent - Bright Blue</h3>
              <div className="bg-accent text-accent-foreground p-4 rounded-lg">Default - CTAs</div>
              <div className="bg-accent/80 text-white p-4 rounded-lg">80% - Hover</div>
              <div className="bg-accent/10 text-foreground p-4 rounded-lg">10% - Subtle</div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold mb-4">Neutral - Clean</h3>
              <div className="bg-white border-2 border-border p-4 rounded-lg">White - Backgrounds</div>
              <div className="bg-muted p-4 rounded-lg">Muted - Sections</div>
              <div className="bg-foreground text-white p-4 rounded-lg">Foreground - Text</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={0.2}>
            <h2 className="text-4xl font-bold mb-6">Ready to build?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              This design system is production-ready and optimized for performance.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                View Docs
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
