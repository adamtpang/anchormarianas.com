import { SurveyForm } from "./survey-form"

export const metadata = {
  title: "What is it costing you? | Anchor Marianas",
  description:
    "Answer nine questions about your own business and see the arithmetic. Every figure is built from your numbers, never an industry average.",
}

export default function SurveyPage() {
  return (
    <div>
      <section className="depth-veil">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-10 sm:pt-32 sm:pb-14">
          <p className="t-coord">Anchor Marianas &middot; the numbers</p>
          <h1 className="t-hero-serif mt-8 max-w-3xl">
            What is it{" "}
            <span className="font-display-italic text-accent">actually costing you?</span>
          </h1>
          <p className="t-body-lg mt-7 max-w-2xl text-muted-foreground">
            Nine questions about your business. The arithmetic appears as you
            type, and it is built only from your answers. We do not use industry
            averages, and we do not estimate what we have not measured.
          </p>
          <p className="t-small mt-5 max-w-2xl text-muted-foreground">
            Nothing is submitted anywhere. This runs in your browser. If a
            service does not fit, or costs more than the budget you give us, it
            says so instead of pitching you.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <SurveyForm />
        </div>
      </section>
    </div>
  )
}
