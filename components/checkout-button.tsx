"use client"

import type React from "react"
import posthog from "posthog-js"
import { track } from "@vercel/analytics"

export function CheckoutButton({
  href,
  plan,
  price,
  className,
  children,
}: {
  href: string
  plan: "landing" | "mvp"
  price?: string
  className?: string
  children: React.ReactNode
}) {
  function handleClick() {
    const props: Record<string, string> = { plan }
    if (price) props.price = price
    // Fire the same conversion event to both PostHog and Vercel Analytics.
    posthog?.capture("checkout_click", props)
    track("checkout_click", props)
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
