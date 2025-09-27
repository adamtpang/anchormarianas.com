import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react"

// Mock data - in a real app this would come from a CMS or database
const getEssay = (slug: string) => {
  const essays = {
    "philosophy-of-code": {
      title: "The Philosophy of Code",
      description:
        "Exploring the intersection of programming and philosophical thinking in modern software development.",
      date: "2024-12-15",
      readTime: "8 min read",
      tags: ["Philosophy", "Technology"],
      content: `
        <p>Programming is philosophy made manifest. Every line of code represents a decision, a belief about how the world should work, and an attempt to impose order on chaos.</p>

        <p>When we write software, we're not just solving technical problems—we're encoding our values, assumptions, and worldview into systems that will shape how others think and behave. This is a profound responsibility that we rarely acknowledge.</p>

        <h2>The Metaphysics of Code</h2>

        <p>Consider the simple act of naming a variable. In that moment, we're performing an act of categorization that would make Aristotle proud. We're deciding what aspects of reality deserve representation in our digital world and how they should be structured.</p>

        <p>The choice between <code>user</code> and <code>person</code> isn't just semantic—it reflects our fundamental assumptions about identity, agency, and the relationship between humans and systems.</p>

        <h2>Ethics in Algorithms</h2>

        <p>Every algorithm embeds ethical choices. When we optimize for engagement, we're making a statement about what human attention is worth. When we design recommendation systems, we're shaping the information diet of millions.</p>

        <p>The question isn't whether our code has philosophical implications—it's whether we're conscious of them.</p>

        <h2>Toward Thoughtful Software</h2>

        <p>What would it mean to approach programming as a philosophical practice? It would require us to:</p>

        <ul>
          <li>Question our assumptions about users, data, and systems</li>
          <li>Consider the long-term implications of our design choices</li>
          <li>Prioritize human agency over system efficiency</li>
          <li>Build tools that enhance rather than diminish human capability</li>
        </ul>

        <p>The future of technology depends not just on what we can build, but on what we choose to build—and why.</p>
      `,
    },
  }

  return essays[slug as keyof typeof essays] || null
}

export async function generateStaticParams() {
  return [
    { slug: 'philosophy-of-code' },
  ]
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const essay = getEssay(slug)

  if (!essay) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Essay not found</h1>
        <Button asChild>
          <Link href="/essays">← Back to Essays</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      {/* Back Navigation */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="p-0 h-auto">
          <Link href="/essays" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Essays
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(essay.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {essay.readTime}
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">{essay.title}</h1>

        <p className="text-xl text-muted-foreground leading-relaxed mb-6">{essay.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {essay.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-li:text-foreground">
        <div dangerouslySetInnerHTML={{ __html: essay.content }} />
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Enjoyed this essay?</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to get notified when I publish new thoughts on technology, philosophy, and creativity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild>
                  <Link href="/newsletter">Subscribe to Newsletter</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/essays">Read More Essays</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}