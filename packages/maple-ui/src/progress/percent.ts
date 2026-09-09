/** Public percentage, never a ratio: numeric strings are decimal numbers, not CSS. */
export function normalizePercent(value: unknown): number {
  if (typeof value !== 'number' && typeof value !== 'string') {
    return 0
  }
  if (typeof value === 'string' && !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim())) {
    return 0
  }
  const number = Number(value)
  return Number.isFinite(number) ? Math.min(100, Math.max(0, number)) : 0
}
