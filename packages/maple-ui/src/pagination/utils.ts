export const getLegalPage = (page: number, { min, max }: { min: number; max: number }): number =>
  Math.min(Math.max(Math.trunc(page), min), Math.max(min, max))

export const positiveInteger = (value: number | undefined, fallback: number): number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0
    ? Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, Math.trunc(value)))
    : fallback
