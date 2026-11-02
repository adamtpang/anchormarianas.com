// National tax-prep chains. Tune this list without changing the matcher.

export const DEFAULT_CHAINS = [
  "H&R Block",
  "Block Advisors",
  "Jackson Hewitt",
  "Liberty Tax",
] as const

export function compactName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function isChainName(value: string, chains: readonly string[] = DEFAULT_CHAINS): boolean {
  const compact = compactName(value)
  if (!compact) return false
  return chains.some((chain) => {
    const needle = compactName(chain)
    return needle.length > 0 && compact.includes(needle)
  })
}
