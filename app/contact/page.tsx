import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Mail, Github, Twitter, ExternalLink } from "lucide-react";
import Link from "next/link";
import siteConfig from "@/content/site.json";

export const metadata: Metadata = {
  title: "Contact | AnchorMarianas",
  description: "Get in touch with AnchorMarianas studio",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            Let's talk about your project
          </p>
        </div>

        {/* Primary Contact */}
        <div className="text-center mb-12">
          <div className="bg-muted/50 rounded-2xl p-8 mb-8">
            <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Email</h2>
            <p className="text-muted-foreground mb-4">
              The fastest way to reach me
            </p>
            <Button asChild size="lg">
              <Link href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            I typically respond within 24 hours
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 mb-12">
          <Button asChild size="lg" className="h-16">
            <Link href="/quote">
              <div className="text-left">
                <div className="font-semibold">Get a Quote</div>
                <div className="text-sm opacity-80">Start a new project</div>
              </div>
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="h-16">
            <Link href="/services">
              <div className="text-left">
                <div className="font-semibold">View Services</div>
                <div className="text-sm text-muted-foreground">See packages & pricing</div>
              </div>
            </Link>
          </Button>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="font-semibold mb-6">Follow Along</h3>

          <div className="flex justify-center gap-4 mb-8">
            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.socials.x} target="_blank">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.socials.github} target="_blank">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground mb-4">
              Also check out my personal site
            </p>

            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.personalSite} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                adampang.com
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}