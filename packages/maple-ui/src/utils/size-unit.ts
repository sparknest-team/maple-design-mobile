// Numeric strings retain the existing integer-only conversion; CSS expressions pass through.
export function toSizeUnit(value: unknown): string | undefined {
  if (value == null) {
    return undefined
  }
  if (typeof value === 'number' || (typeof value === 'string' && /^[-+]?\d+$/.test(value))) {
    return `${value}px`
  }
  return String(value)
}
