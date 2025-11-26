"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InteractiveCard, FadeIn } from "@/components/motion-wrapper"
import { ArrowRight } from "lucide-react"

/**
 * Sample Component: Animated Card
 *
 * Demonstrates the full design stack:
 * - shadcn/ui components (Card, Button, Badge)
 * - Framer Motion animations (fade in, hover, tap)
 * - Coolors ocean-themed palette
 *
 * Usage:
 * <AnimatedCard
 *   title="Product Name"
 *   description="Short description"
 *   badge="New"
 *   onClick={() => console.log('clicked')}
 * />
 */

interface AnimatedCardProps {
  title: string
  description: string
  badge?: string
  content?: string
  buttonText?: string
  delay?: number
  onClick?: () => void
}

export function AnimatedCard({
  title,
  description,
  badge,
  content,
  buttonText = "Learn More",
  delay = 0,
  onClick
}: AnimatedCardProps) {
  return (
    <FadeIn delay={delay}>
      <InteractiveCard onClick={onClick}>
        <Card className="h-full border-2 border-border hover:border-accent transition-colors duration-300 cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between gap-4 mb-2">
              <CardTitle className="text-2xl">{title}</CardTitle>
              {badge && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  {badge}
                </Badge>
              )}
            </div>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </CardHeader>

          {content && (
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {content}
              </p>
            </CardContent>
          )}

          <CardFooter>
            <Button
              variant="ghost"
              className="w-full group hover:bg-accent/10"
              onClick={(e) => {
                e.stopPropagation()
                onClick?.()
              }}
            >
              {buttonText}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </InteractiveCard>
    </FadeIn>
  )
}

/**
 * Example Usage Page
 *
 * Shows how to use the AnimatedCard in a grid with stagger animations
 */
export function AnimatedCardGrid() {
  const cards = [
    {
      title: "Fast & Modern",
      description: "Built with Next.js 14 and TypeScript",
      badge: "Featured",
      content: "Lightning-fast performance with server-side rendering and optimized delivery.",
    },
    {
      title: "Motion Design",
      description: "Smooth animations with Framer Motion",
      content: "Delightful interactions that enhance user experience without sacrificing performance.",
    },
    {
      title: "Ocean Theme",
      description: "Professional palette inspired by the Marianas",
      badge: "New",
      content: "Deep blues and clean whites create a trustworthy, modern aesthetic.",
    }
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <AnimatedCard
          key={card.title}
          {...card}
          delay={index * 0.1}
          onClick={() => console.log(`Clicked: ${card.title}`)}
        />
      ))}
    </div>
  )
}
