"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle2 } from "lucide-react"

export function ChatInterface() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !message.trim() || isLoading) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          message: message.trim()
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail("")
        setMessage("")
      } else {
        alert("Failed to send message. Please try emailing us directly.")
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert("Failed to send message. Please try emailing us directly.")
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-border shadow-2xl p-12 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <h3 className="text-2xl font-bold">Message Received!</h3>
          <p className="text-muted-foreground">
            We'll review your project and get back to you within 48 hours.
          </p>
          <Button
            variant="outline"
            onClick={() => setSubmitted(false)}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border-2 border-border shadow-2xl overflow-hidden">
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-black mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent transition-colors text-black placeholder:text-gray-500"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-black mb-2">
              What do you want to build?
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your project idea, the problem you're solving, key features you need, timeline, etc."
              rows={6}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent transition-colors resize-none text-black placeholder:text-gray-500"
              disabled={isLoading}
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!email.trim() || !message.trim() || isLoading}
            className="w-full bg-white text-black border-2 border-border hover:bg-gray-100"
            variant="outline"
          >
            {isLoading ? "Sending..." : "Send Message"}
            <Send className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-xs text-center text-black">
            Or email us directly at{" "}
            <a href="mailto:adam@anchormarianas.com" className="text-black font-bold hover:underline">
              adam@anchormarianas.com
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
