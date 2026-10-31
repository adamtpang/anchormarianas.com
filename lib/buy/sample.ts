import { type CallLog, type Target, shiftDate } from "./model"

type RawCall = Omit<CallLog, "spokeWithOwner">
type RawTarget = Omit<Target, "zip" | "charterDate" | "preparerCount" | "credentials" | "licensedCpaFirm" | "spokeWithOwner" | "calls"> & {
  calls: RawCall[]
  zip?: string
  charterDate?: string
  preparerCount?: number | null
  credentials?: string
  licensedCpaFirm?: Target["licensedCpaFirm"]
  spokeWithOwner?: boolean
}

function finish(target: RawTarget): Target {
  return {
    zip: "",
    charterDate: "",
    preparerCount: null,
    credentials: "",
    licensedCpaFirm: "unknown",
    spokeWithOwner: false,
    ...target,
    calls: target.calls.map((call) => ({ spokeWithOwner: false, ...call })),
  }
}

// Fictional rows for an empty desk. Every name, phone, and site is obviously fake.

function source(slug: string, field: string): string {
  return `https://example.com/sources/${slug}#${field}`
}

export function createSampleTargets(today: string): Target[] {
  const stamp = `${today}T18:00:00.000Z`
  const bookkeeping = {
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
    successor: "no" as const,
    zip: "78130",
    charterDate: "2004-06-01",
    preparerCount: 4,
    credentials: "CPA",
    licensedCpaFirm: "unknown" as const,
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
  const tax = {
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
    successor: "unknown" as const,
    zip: "78155",
    charterDate: "2018-03-01",
    preparerCount: 1,
    credentials: "EA",
    licensedCpaFirm: "no" as const,
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
  const insurance = {
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
    successor: "yes" as const,
    zip: "78130",
    preparerCount: 8,
    credentials: "",
    licensedCpaFirm: "yes" as const,
    sources: { website: source("sample-insurance", "website") },
    notes: "Fictional sample row. Not a real business.",
    status: "New",
    calls: [],
    sample: true,
    createdAt: stamp,
    updatedAt: stamp,
  }
  const distributor = {
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
    successor: "no" as const,
    zip: "99999",
    preparerCount: 20,
    credentials: "",
    licensedCpaFirm: "unknown" as const,
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
  const payroll = {
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
  return [bookkeeping, tax, insurance, distributor, payroll].map((item) => finish(item as RawTarget))
}
