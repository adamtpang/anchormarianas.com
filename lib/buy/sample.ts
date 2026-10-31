import { type Target, shiftDate } from "./model"

// Fictional rows for an empty desk. Every name, phone, and site is obviously fake.

function source(slug: string, field: string): string {
  return `https://example.com/sources/${slug}#${field}`
}

export function createSampleTargets(today: string): Target[] {
  const stamp = `${today}T18:00:00.000Z`
  const bookkeeping: Target = {
    id: "sample-bookkeeping",
    name: "Sample Bookkeeping Co (FAKE)",
    industry: "Texas bookkeeping and tax firms",
    city: "Austin, TX",
    website: "https://example.com/sample-bookkeeping",
    phone: "(555) 010-0101",
    revenue: 1_200_000,
    profit: 280_000,
    yearsInBusiness: 22,
    ownerName: "Pat Example",
    ownerAge: "67",
    successor: "no",
    sources: {
      name: source("sample-bookkeeping", "name"),
      revenue: source("sample-bookkeeping", "revenue"),
      profit: source("sample-bookkeeping", "profit"),
      ownerAge: source("sample-bookkeeping", "owner-age"),
      successor: source("sample-bookkeeping", "successor"),
    },
    notes: "Fictional sample row, not a real business.",
    status: "Talking",
    calls: [
      {
        id: "sample-bookkeeping-call",
        date: shiftDate(today, -3),
        outcome: "talked",
        notes: "Sample note. Owner has not decided.",
        followUp: shiftDate(today, -1),
      },
    ],
    sample: true,
    createdAt: stamp,
    updatedAt: stamp,
  }
  const tax: Target = {
    id: "sample-tax-desk",
    name: "Sample Tax Desk (FAKE)",
    industry: "Texas bookkeeping and tax firms",
    city: "Dallas, TX",
    website: "https://example.com/sample-tax-desk",
    phone: "(555) 010-0102",
    revenue: 800_000,
    profit: 190_000,
    yearsInBusiness: 14,
    ownerName: "Sam Sample",
    ownerAge: "60-65",
    successor: "unknown",
    sources: { phone: source("sample-tax-desk", "phone") },
    notes: "Fictional sample row. Not a real business.",
    status: "Contacted",
    calls: [
      {
        id: "sample-tax-call",
        date: shiftDate(today, -1),
        outcome: "voicemail",
        notes: "Left a sample voicemail.",
        followUp: today,
      },
    ],
    sample: true,
    createdAt: stamp,
    updatedAt: stamp,
  }
  const insurance: Target = {
    id: "sample-insurance",
    name: "Sample Insurance Agency (FAKE)",
    industry: "Commercial insurance agencies",
    city: "Houston, TX",
    website: "https://example.com/sample-insurance",
    phone: "(555) 010-0103",
    revenue: 2_400_000,
    profit: 410_000,
    yearsInBusiness: 31,
    ownerName: "Casey Fiction",
    ownerAge: "71",
    successor: "yes",
    sources: { website: source("sample-insurance", "website") },
    notes: "Fictional sample row. Not a real business.",
    status: "New",
    calls: [],
    sample: true,
    createdAt: stamp,
    updatedAt: stamp,
  }
  const distributor: Target = {
    id: "sample-distributor",
    name: "Sample Distributor Co (FAKE)",
    industry: "B2B distributors",
    city: "Fort Worth, TX",
    website: "https://example.com/sample-distributor",
    phone: "(555) 010-0104",
    revenue: 4_500_000,
    profit: 520_000,
    yearsInBusiness: 18,
    ownerName: "Riley Placeholder",
    ownerAge: "54",
    successor: "no",
    sources: { revenue: source("sample-distributor", "revenue") },
    notes: "Fictional sample row. Not a real business.",
    status: "Interested",
    calls: [
      {
        id: "sample-distributor-call",
        date: shiftDate(today, -7),
        outcome: "interested",
        notes: "Sample interest. No real owner.",
        followUp: shiftDate(today, 5),
      },
    ],
    sample: true,
    createdAt: stamp,
    updatedAt: stamp,
  }
  const payroll: Target = {
    id: "sample-payroll",
    name: "Sample Payroll Shop (FAKE)",
    industry: "Texas bookkeeping and tax firms",
    city: "El Paso, TX",
    website: "https://example.com/sample-payroll",
    phone: "(555) 010-0105",
    revenue: 650_000,
    profit: 140_000,
    yearsInBusiness: 9,
    ownerName: "Jordan Notreal",
    ownerAge: "62",
    successor: "unknown",
    sources: {},
    notes: "Fictional sample row. Not a real business.",
    status: "Passed",
    calls: [
      {
        id: "sample-payroll-call",
        date: shiftDate(today, -10),
        outcome: "not selling",
        notes: "Sample pass.",
        followUp: "",
      },
    ],
    sample: true,
    createdAt: stamp,
    updatedAt: stamp,
  }
  return [bookkeeping, tax, insurance, distributor, payroll]
}
