export function hasCpaOrEa(credentials: string): boolean {
  const tokens = credentials.toUpperCase().split(/[^A-Z]+/).filter(Boolean)
  return tokens.includes("CPA") || tokens.includes("EA")
}

export function mergeCredentials(values: string[]): string {
  const tokens = new Set<string>()
  for (const value of values) {
    for (const token of value.toUpperCase().split(/[^A-Z]+/)) {
      if (token) tokens.add(token)
    }
  }
  return [...tokens].sort().join(",")
}
