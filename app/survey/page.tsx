import { SurveyForm } from "./survey-form"

export const metadata = {
	title: "Your business brief | Anchor Marianas",
	description:
		"Describe your website or webapp project, add useful business context, and prepare a brief to share. Private until you choose to share.",
	alternates: { canonical: "/survey" },
}

export default function SurveyPage() {
	return (
		<div className="journey-page brief-page">
			<section className="journey-wrap pt-12 pb-8 sm:pt-20 sm:pb-12">

				<h1 className="journey-title mt-4">What shall we build?</h1>
				<p className="brief-help mt-3">
					Private until you share it.
				</p>
			</section>
			<section
				className="journey-wrap pb-16 sm:pb-24"
				aria-label="Prepare your business brief"
			>
				<SurveyForm />
			</section>
		</div>
	)
}
