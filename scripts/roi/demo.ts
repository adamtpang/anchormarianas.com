// Print an example ROI report so the arithmetic can be eyeballed.
//   node --import tsx scripts/roi/demo.ts
import { buildRoiReport } from "../../lib/roi/calculate"

// A plausible Guam salon, answering the survey honestly.
const answers = {
  hourlyValue: 25,
  reviewsPerMonth: 20,
  minutesPerReply: 6,
  appointmentsPerWeek: 40,
  noShowPercent: 10,
  appointmentValue: 150,
  missedCallsPerWeek: 15,
  callToCustomerPercent: 30,
  customerValue: 400,
  monthlyBudget: 300,
}

const r = buildRoiReport(answers)

for (const f of r.recommended) {
  const setup = f.monthlySetup ? ` + $${f.monthlySetup} setup` : ""
  console.log(`\n### ${f.service}  ($${f.monthlyRecurring}/mo${setup})`)
  console.log(`Problem: ${f.problem}`)
  for (const c of f.costOfProblem) console.log(`  - ${c.label}: ${c.formula}`)
  if (f.breakEven) {
    console.log(`  - ${f.breakEven.label}: ${f.breakEven.formula}`)
    if (f.breakEven.note) console.log(`    note: ${f.breakEven.note}`)
  }
}

console.log("\n### Out of budget")
for (const f of r.outOfBudget) {
  console.log(
    `  ${f.service}: $${f.monthlyRecurring}/mo exceeds the $${answers.monthlyBudget} they told us`
  )
}

console.log("\n### Not applicable")
for (const f of r.notApplicable) {
  console.log(`  ${f.service}: ${f.notApplicableReason}`)
}
