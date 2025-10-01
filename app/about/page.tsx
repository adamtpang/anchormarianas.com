import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Twitter } from "lucide-react";
import Link from "next/link";
import siteConfig from "@/content/site.json";

export const metadata: Metadata = {
  title: "About | AnchorMarianas",
  description: "Learn about AnchorMarianas studio and founder Adam Pang",
};

const techStack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js",
  "PostgreSQL", "Prisma", "Vercel", "Stripe", "Resend"
];

const principles = [
  {
    title: "Speed to market",
    description: "Ship fast, iterate faster. Every day without users is a day without learning."
  },
  {
    title: "Performance obsessed",
    description: "≥95 Lighthouse scores aren't optional. Speed is a feature, not a nice-to-have."
  },
  {
    title: "Conversion focused",
    description: "Beautiful design that doesn't convert is just art. We optimize for business outcomes."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About AnchorMarianas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Bio */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-lg leading-relaxed">
            Hi, I'm <strong>Adam Pang</strong>, founder of AnchorMarianas. I've spent the last decade
            building internet products that people actually use—from early-stage startups to
            scaling companies with millions of users.
          </p>

          <p className="text-lg leading-relaxed">
            I believe most web projects are over-engineered and under-optimized. That's why
            AnchorMarianas focuses on <em>minimum-effective</em> solutions: the smallest,
            fastest thing that achieves your business goals.
          </p>

          <p className="text-lg leading-relaxed">
            Whether you're launching your first product or optimizing an existing one,
            I help you cut through the noise and ship something that works.
          </p>
        </div>

        {/* Principles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            How I Work
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle) => (
              <div key={principle.title} className="text-center">
                <h3 className="font-semibold mb-3">{principle.title}</h3>
                <p className="text-muted-foreground text-sm text-pretty">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-2 justify-center">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm py-1 px-3">
                {tech}
              </Badge>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-6 text-sm">
            I choose tools for results, not trends. This stack delivers
            fast development and reliable performance.
          </p>
        </div>

        {/* Partnerships */}
        <div className="bg-muted/50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Partnership Opportunities
          </h2>

          <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
            I occasionally partner for equity with founders building something meaningful.
            This happens when the vision, market, and working style all align perfectly.
          </p>

          <p className="text-center text-muted-foreground text-sm">
            If you think your project might be a good fit for partnership,
            mention it when you <Link href="/quote" className="underline">submit a quote</Link>.
          </p>
        </div>

        {/* Links */}
        <div className="text-center space-y-6">
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.personalSite} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                Personal Site
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.socials.github} target="_blank">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.socials.x} target="_blank">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Link>
            </Button>
          </div>

          <div className="pt-8">
            <p className="text-muted-foreground mb-6">
              Ready to work together?
            </p>

            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/quote">Get a Quote</Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}