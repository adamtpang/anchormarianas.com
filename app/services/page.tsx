"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import services from "@/content/services.json";

export default function ServicesPage() {
  const [loadingCheckout, setLoadingCheckout] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoadingCheckout(priceId);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoadingCheckout(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fixed-price packages for common needs, or custom quotes for everything else.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const isPopular = index === 1; // Middle service is popular

            return (
              <div
                key={service.slug}
                className={`relative bg-card border rounded-2xl p-8 ${
                  isPopular ? "border-accent scale-105 shadow-lg" : "border-border"
                }`}
              >
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                    Most Popular
                  </Badge>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 text-pretty">
                    {service.for}
                  </p>
                  <div className="text-3xl font-bold">
                    ${service.fromPrice}
                    <span className="text-base font-normal text-muted-foreground">
                      {service.quoteOnly ? " starting" : ""}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {service.timeline}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="space-y-3 mb-8">
                  {service.deliverables.map((deliverable) => (
                    <div key={deliverable} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{deliverable}</span>
                    </div>
                  ))}
                </div>

                {/* Exclusions */}
                <div className="space-y-2 mb-8">
                  <div className="text-sm font-medium text-muted-foreground">
                    Not included:
                  </div>
                  {service.exclusions.slice(0, 2).map((exclusion) => (
                    <div key={exclusion} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{exclusion}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  {service.quoteOnly ? (
                    <Button asChild className="w-full" size="lg">
                      <Link href={`/quote?package=${service.slug}`}>
                        Get Custom Quote
                      </Link>
                    </Button>
                  ) : service.stripePriceId && !service.stripePriceId.includes("TODO") ? (
                    <Button
                      onClick={() => handleCheckout(service.stripePriceId!)}
                      disabled={loadingCheckout === service.stripePriceId}
                      className="w-full"
                      size="lg"
                    >
                      {loadingCheckout === service.stripePriceId
                        ? "Starting checkout..."
                        : "Buy Now"
                      }
                    </Button>
                  ) : (
                    <Button asChild className="w-full" size="lg">
                      <Link href={`/quote?package=${service.slug}`}>
                        Get a Quote
                      </Link>
                    </Button>
                  )}

                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Link href={`/quote?package=${service.slug}`}>
                      Ask Questions
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <h3 className="font-semibold mb-2">How do payments work?</h3>
              <p className="text-muted-foreground text-sm">
                Fixed packages can be paid upfront via Stripe. Custom projects get a 50% deposit to start,
                50% on completion. All major credit cards accepted.
              </p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="font-semibold mb-2">What if I need revisions?</h3>
              <p className="text-muted-foreground text-sm">
                Each package includes revisions as specified. Additional rounds are $500-1000
                depending on scope. We work together until you're happy.
              </p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="font-semibold mb-2">Do you offer equity partnerships?</h3>
              <p className="text-muted-foreground text-sm">
                Occasionally, for the right projects and founders. This is discussed privately
                during the quote process—mention it in your submission.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What's your typical timeline?</h3>
              <p className="text-muted-foreground text-sm">
                Most projects start within 1-2 weeks of deposit. Timelines shown are typical delivery
                times, though complex projects may take longer.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-muted/50 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Not sure which package fits?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Every project is different. Let's talk about your specific needs and find the right approach.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/quote">Get Custom Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/work">
                <ExternalLink className="w-4 h-4 mr-2" />
                See Our Work
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}