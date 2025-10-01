"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuoteSchema, type QuotePayload } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const timelineOptions = [
  { value: "1-2w", label: "1-2 weeks" },
  { value: "2-4w", label: "2-4 weeks" },
  { value: "flexible", label: "Flexible" },
];

const budgetOptions = [
  { value: "1k-3k", label: "$1k - $3k" },
  { value: "3k-10k", label: "$3k - $10k" },
  { value: "10k-25k", label: "$10k - $25k" },
  { value: "25k+", label: "$25k+" },
];

const packageOptions = [
  { value: "starter", label: "Starter Landing", description: "Clean, fast landing page" },
  { value: "growth", label: "Growth Revamp", description: "UX + performance optimization" },
  { value: "studio", label: "Custom Studio Build", description: "Full MVP development" },
  { value: "custom", label: "Something else", description: "Let's talk about it" },
];

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuotePayload>({
    resolver: zodResolver(QuoteSchema),
  });

  const selectedPackage = watch("package");

  const onSubmit = async (data: QuotePayload) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to submit quote");
      }
    } catch (error) {
      console.error("Quote submission error:", error);
      alert("Failed to submit quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Quote submitted!</h1>
          <p className="text-muted-foreground mb-8">
            Thanks for reaching out. I'll get back to you within 24 hours with next steps.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/work">View Our Work</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get a Quote</h1>
          <p className="text-xl text-muted-foreground">
            Tell us about your project and we'll get back to you with a custom proposal.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Package Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              What are you looking for? *
            </label>
            <div className="grid gap-3">
              {packageOptions.map((pkg) => (
                <label
                  key={pkg.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors hover:border-accent ${
                    selectedPackage === pkg.value ? "border-accent bg-accent/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    value={pkg.value}
                    {...register("package")}
                    className="sr-only"
                  />
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{pkg.label}</div>
                      <div className="text-sm text-muted-foreground">{pkg.description}</div>
                    </div>
                    {selectedPackage === pkg.value && (
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    )}
                  </div>
                </label>
              ))}
            </div>
            {errors.package && (
              <p className="text-sm text-red-500 mt-1">{errors.package.message}</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name *</label>
              <Input {...register("name")} placeholder="John Doe" />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email *</label>
              <Input type="email" {...register("email")} placeholder="john@example.com" />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Company</label>
              <Input {...register("company")} placeholder="Acme Inc" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Current Site</label>
              <Input {...register("site")} placeholder="https://example.com" />
            </div>
          </div>

          {/* Project Goal */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Project Goal *
              <span className="font-normal text-muted-foreground ml-2">(10-500 characters)</span>
            </label>
            <Textarea
              {...register("goal")}
              placeholder="Describe what you're trying to achieve..."
              rows={4}
              className="resize-none"
            />
            {errors.goal && (
              <p className="text-sm text-red-500 mt-1">{errors.goal.message}</p>
            )}
          </div>

          {/* Timeline & Budget */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Timeline *</label>
              <select
                {...register("timeline")}
                className="w-full p-3 border border-border rounded-md bg-background"
              >
                <option value="">Select timeline</option>
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.timeline && (
                <p className="text-sm text-red-500 mt-1">{errors.timeline.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Budget Range *</label>
              <select
                {...register("budget")}
                className="w-full p-3 border border-border rounded-md bg-background"
              >
                <option value="">Select budget</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>
              )}
            </div>
          </div>

          {/* Reference Link */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Reference Link
              <span className="font-normal text-muted-foreground ml-2">(optional)</span>
            </label>
            <Input
              {...register("link")}
              placeholder="https://example.com/inspiration"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Share a design, competitor, or reference that inspires you
            </p>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Quote Request"
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-3">
              We'll get back to you within 24 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}