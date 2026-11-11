export const colBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
export const isColCount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 24
export const isColOrder = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && Number.isInteger(value)
export const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  [Object.prototype, null].includes(Object.getPrototypeOf(value))
export const isColBreakpoint = (value: unknown): boolean => {
  if (typeof value === 'number') {
    return isColCount(value)
  }
  return (
    isRecord(value) &&
    Object.keys(value).every(
      (key) =>
        ['span', 'offset', 'order'].includes(key) &&
        (value[key] === undefined || (key === 'order' ? isColOrder(value[key]) : isColCount(value[key]))),
    )
  )
}
export function normalizeColBreakpoint(value: unknown): { span?: number; offset?: number; order?: number } {
  if (isColCount(value)) {
    return { span: value }
  }
  if (!isRecord(value)) {
    return {}
  }
  return {
    span: isColCount(value.span) ? value.span : undefined,
    offset: isColCount(value.offset) ? value.offset : undefined,
    order: isColOrder(value.order) ? value.order : undefined,
  }
}
export const isColFlex = (value: unknown): boolean =>
  typeof value === 'number'
    ? Number.isFinite(value) && value >= 0
    : typeof value === 'string' && value.trim().length > 0

// CSS <integer> rejects scientific notation; preserve valid large finite inputs.
export const formatColOrder = (value: number): string =>
  value.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 0 })
