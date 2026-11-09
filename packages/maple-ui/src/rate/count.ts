// Bound actual icon allocation; oversized values fall back instead of allocating a huge array.
const maxRateCount = 1000
export function validRateCount(value: unknown): boolean {
  const count = Number(value)
  return Number.isFinite(count) && count > 0 && count <= maxRateCount
}
export function normalizeRateCount(value: unknown): number {
  return validRateCount(value) ? Math.max(1, Math.floor(Number(value))) : 5
}
