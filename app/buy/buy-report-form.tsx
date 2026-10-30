"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import type { BuyReport } from "@/lib/buy/analyze"

const field =
  "w-full bg-card border border-border rounded-lg px-4 py-3 text-base placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent disabled:opacity-60"

export function BuyReportForm() {
  const [business, setBusiness] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<BuyReport | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setReport(null)
    try {
      const res = await fetch("/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business, city, email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "The report failed. Please try again.")
      setReport(data as BuyReport)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="agency-card agency-package space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            aria-label="Business name"
            required
            placeholder="Business name, as on Google Maps"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            disabled={loading}
            className={field}
          />
          <input
            aria-label="City"
            required
            placeholder="City, for example Austin"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
            className={field}
          />
        </div>
        <input
          type="email"
          aria-label="Email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className={field}
        />
        <button type="submit" className="agency-button" disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden /> Reading reviews, about a
              minute
            </>
          ) : (
            <>
              Get the free report <ArrowRight size={16} aria-hidden />
            </>
          )}
        </button>
        <p className="agency-small">
          We use your email to follow up on this report. No list, no spam.
        </p>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </form>

      {report && <ReportView report={report} />}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="agency-card agency-package">
      <p className="agency-small">{label}</p>
      <div className="agency-price">{value}</div>
    </div>
  )
}

function ReportView({ report }: { report: BuyReport }) {
  const { place, trend } = report
  const direction =
    trend.recentAvg === null || trend.earlierAvg === null
      ? "Not enough history to compare"
      : `${trend.earlierAvg} before, ${trend.recentAvg} in the ${trend.recentLabel}`

  return (
    <article aria-live="polite" className="space-y-8">
      <header>
        <h2>{place.name}</h2>
        <p className="agency-lead">
          {[place.category, place.address].filter(Boolean).join(" · ")}
        </p>
        {place.url && (
          <a href={place.url} target="_blank" rel="noopener noreferrer" className="agency-small underline">
            Open the Google listing
          </a>
        )}
      </header>

      <div className="agency-grid">
        <Stat label="Google rating" value={place.rating === null ? "n/a" : `${place.rating} of 5`} />
        <Stat label="Stars, earlier vs recent" value={direction} />
        <Stat
          label="3 stars or fewer"
          value={`${report.lowStar.count} (${report.lowStar.share}%)`}
        />
        <Stat label="Owner replies" value={`${report.replyRate}% of reviews`} />
      </div>

      {report.ownershipSignals.length > 0 && (
        <section>
          <h3>Possible change of owner</h3>
          <ul className="space-y-2">
            {report.ownershipSignals.map((s) => (
              <li key={s.date + s.excerpt}>
                <span className="agency-small">{s.date}</span> "{s.excerpt}"
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3>What unhappy customers keep saying</h3>
        {report.themes.length === 0 ? (
          <p>No recurring complaint theme in the reviews read.</p>
        ) : (
          <div className="space-y-4">
            {report.themes.map((t) => (
              <div key={t.key} className="agency-card agency-package">
                <h4>
                  {t.label}: {t.count} reviews, {t.recentCount} recent
                </h4>
                <ul className="space-y-1">
                  {t.examples.map((ex) => (
                    <li key={ex.date + ex.excerpt} className="agency-small">
                      {ex.stars} stars, {ex.date}: "{ex.excerpt}"
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {report.years.length > 0 && (
        <section>
          <h3>Rating by year</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th>Year</th>
                <th>Reviews</th>
                <th>Average</th>
                <th>3 stars or fewer</th>
              </tr>
            </thead>
            <tbody>
              {report.years.map((y) => (
                <tr key={y.year}>
                  <td>{y.year}</td>
                  <td>{y.reviews}</td>
                  <td>{y.avgStars}</td>
                  <td>{y.lowShare}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section>
        <h3>Ask the seller</h3>
        <ol className="list-decimal pl-5 space-y-1">
          {report.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </section>

      <section>
        <h3>Limits</h3>
        <ul className="list-disc pl-5 space-y-1 agency-small">
          {report.limits.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}
