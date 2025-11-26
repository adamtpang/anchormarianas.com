import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight, Calendar } from "lucide-react"
import servicesData from "@/content/services.json"

export const metadata = {
  title: "Services & Pricing | AnchorMarianas",
  description: "Productized web development services. Choose your build, launch fast, maintain with ease."
}

export default function ServicesPage() {
  const { buildPackages, maintenancePlans, revisionScope, addOns, process } = servicesData

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-primary-900 to-secondary-900 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="bg-accent text-white border-0 mb-4">
            Productized Services
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold">
            Ship Your Website.
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Fast & Fixed Price.<br />
            No hourly rates. No scope creep. Choose your package, get a timeline, and launch.
          </p>

          {/* Key differentiators */}
          <div className="pt-8 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">12-14 days</div>
              <div className="text-sm text-blue-200">Average delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">48hr</div>
              <div className="text-sm text-blue-200">Email updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Solo dev</div>
              <div className="text-sm text-blue-200">Direct communication</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {process.steps.map((step) => (
              <div key={step.number} className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold mx-auto">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 1: Choose Your Build */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              STEP 1
            </div>
            <h2 className="text-4xl font-bold mb-4">Choose Your Build</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fixed price, fixed timeline. All packages include responsive design, SEO, and hosting setup.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {buildPackages.map((pkg) => (
              <Card
                key={pkg.slug}
                className={`relative ${pkg.featured ? 'border-accent border-2 shadow-lg' : 'border-border'}`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-white">Most Popular</Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-base">{pkg.description}</CardDescription>

                  <div className="pt-4">
                    <div className="text-4xl font-bold">
                      ${pkg.price.toLocaleString()}
                    </div>
                    {pkg.priceNote && (
                      <p className="text-sm text-muted-foreground mt-1">{pkg.priceNote}</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{pkg.pages}</Badge>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{pkg.timeline}</span>
                  </div>

                  <div className="space-y-2">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      <strong>Ideal for:</strong> {pkg.ideal}
                    </p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={pkg.featured ? "default" : "outline"}
                    asChild
                  >
                    <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
                      {pkg.quoteOnly ? "Get Quote" : "Book Call"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2: Choose Maintenance */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              STEP 2
            </div>
            <h2 className="text-4xl font-bold mb-4">Choose Your Maintenance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Keep your site fresh with ongoing updates. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {maintenancePlans.map((plan) => (
              <Card
                key={plan.slug}
                className={`relative ${plan.featured ? 'border-accent border-2 shadow-lg' : 'border-border'}`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-white">Best Value</Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>

                  <div className="pt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="font-semibold text-accent">
                      {typeof plan.revisionsPerYear === 'number'
                        ? `${plan.revisionsPerYear} revisions/year`
                        : `${plan.revisionsPerYear} revisions`
                      }
                    </div>
                    <div className="text-muted-foreground">{plan.turnaround} turnaround</div>
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      <strong>Ideal for:</strong> {plan.ideal}
                    </p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                    asChild
                  >
                    <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Revision Scope */}
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>What counts as a revision?</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Included
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {revisionScope.included.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-3">Not Included</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {revisionScope.excluded.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Add-Ons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <Card key={addon.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <CardDescription>{addon.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {addon.price === 0 ? 'Free' : `$${addon.price}`}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">How do payments work?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fixed packages start with a 50% deposit to begin, 50% on completion. All major credit cards and wire transfers accepted. Invoicing through Stripe.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">What's your typical timeline?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Most projects start within 1 week of deposit. Quick Builds deliver in 12 days, Standard Builds in 14 days. Custom builds depend on scope but typically under 30 days.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">How do updates work during the build?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Email updates every 48 hours. You'll see progress screenshots, have chances to give feedback, and stay in the loop without endless meetings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Can I get the source code?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes. Code export for self-hosting is free. You own everything we build for you—no strings attached.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Do you offer equity partnerships?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Occasionally, for the right projects and founders. If you're interested in a technical co-founder arrangement, mention it when we talk.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">What if I need changes after launch?</h3>
              <p className="text-muted-foreground leading-relaxed">
                That's what maintenance plans are for. Choose a plan based on how often you'll need updates. Cancel anytime if your needs change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-primary-900 to-secondary-900 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to ship?
          </h2>
          <p className="text-xl text-blue-100">
            Book a free 20-minute call. No commitment. Let's talk about your project.
          </p>
          <Button size="lg" className="bg-white text-primary-900 hover:bg-blue-50" asChild>
            <a href="https://calendly.com/adamtpang" target="_blank" rel="noopener noreferrer">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
            </a>
          </Button>
          <p className="text-sm text-blue-200 pt-4">
            Or email us at{" "}
            <a href="mailto:adam@anchormarianas.com" className="underline hover:text-white">
              adam@anchormarianas.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
