"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coffee, CreditCard, Bitcoin, Heart, Users, BookOpen, Code } from "lucide-react"

const supportOptions = [
  {
    title: "Buy Me a Coffee",
    description:
      "Support my work with a one-time contribution. Perfect for showing appreciation for a specific essay or project.",
    icon: Coffee,
    link: "https://buymeacoffee.com/adampang",
    type: "One-time",
    popular: false,
  },
  {
    title: "PayPal",
    description: "Direct support via PayPal. Choose your own amount and frequency.",
    icon: CreditCard,
    link: "https://paypal.me/adampang",
    type: "Flexible",
    popular: false,
  },
  {
    title: "Bitcoin",
    description: "Support with Bitcoin for those who prefer cryptocurrency.",
    icon: Bitcoin,
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    type: "Crypto",
    popular: false,
  },
  {
    title: "Solana",
    description: "Support with SOL tokens.",
    icon: Bitcoin,
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    type: "Crypto",
    popular: false,
  },
]

const impactAreas = [
  {
    icon: BookOpen,
    title: "Research & Writing",
    description: "Time to explore complex topics and write thoughtful essays that push conversations forward.",
  },
  {
    icon: Code,
    title: "Open Source Tools",
    description: "Building and maintaining free tools that help others learn, create, and think more effectively.",
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Creating spaces and resources for meaningful dialogue about technology, philosophy, and creativity.",
  },
]

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Support My Work</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Help keep these resources freely available and support the creation of thoughtful content about technology,
          philosophy, and human potential.
        </p>
      </section>

      {/* Why Support */}
      <section className="mb-16">
        <Card className="border-border/50 bg-muted/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Why Support?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All of my essays, tools, and resources are freely available because I believe knowledge should be
                  accessible to everyone. Your support helps me dedicate more time to research, writing, and building
                  tools that benefit the broader community.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every contribution, no matter the size, makes a meaningful difference and helps sustain this work.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Support Options */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Ways to Support</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {supportOptions.map((option) => (
            <Card key={option.title} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <option.icon className="h-6 w-6 text-accent" />
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {option.type}
                  </Badge>
                </div>
                <CardDescription className="leading-relaxed">{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {option.link ? (
                  <Button asChild className="w-full">
                    <Link href={option.link} target="_blank" rel="noopener noreferrer">
                      Support via {option.title}
                    </Link>
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground mb-1">Address:</p>
                      <code className="text-xs font-mono text-foreground break-all">{option.address}</code>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => navigator.clipboard.writeText(option.address!)}
                    >
                      Copy Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What Support Enables */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">What Your Support Enables</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {impactAreas.map((area) => (
            <Card key={area.title} className="border-border/50 text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <area.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-lg">{area.title}</CardTitle>
                <CardDescription className="leading-relaxed">{area.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Alternative Support */}
      <section className="text-center">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Other Ways to Help</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Financial support isn't the only way to help. Sharing my work, providing feedback, or engaging in
              thoughtful discussions also makes a huge difference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/essays">Share an Essay</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="mailto:hello@adampang.com">Send Feedback</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/newsletter">Subscribe to Updates</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}