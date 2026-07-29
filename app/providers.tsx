'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

// Module-scoped guard so the singleton only initializes once, even under
// React StrictMode double-invoked effects.
let started = false

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!posthogKey) return
    if (started) return
    started = true

    posthog.init(posthogKey, {
      api_host: posthogHost,
      capture_pageview: true,
      capture_pageleave: true,
      session_recording: { maskAllInputs: true },
      autocapture: true,
      loaded: (ph) => {
        // Tag every event with the source domain
        ph.register({ site: window.location.hostname })
      },
    })
  }, [])

  // No-op when unconfigured so the build and the live site work with no key.
  if (!posthogKey) return <>{children}</>

  return <PHProvider client={posthog}>{children}</PHProvider>
}
