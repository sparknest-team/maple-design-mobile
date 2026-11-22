/** A header cell in DOM order. Spans describe its occupied table grid. */
export interface HeaderGridCell {
  id: string
  colSpan?: number
  rowSpan?: number
}

const normalizeSpan = (value: number | undefined, maximum = 1000) =>
  value !== undefined && Number.isFinite(value) && value >= 1 ? Math.min(maximum, Math.trunc(value)) : 1

/**
 * Build the header chain for each physical DOM column. The input includes
 * operation headers, so a merged cell can cover both operation and data columns.
 */
export function buildHeaderAssociations(rows: readonly (readonly HeaderGridCell[])[]) {
  const occupiedUntil: number[] = []
  const columnHeaders: string[][] = []

  rows.forEach((row, rowIndex) => {
    let columnIndex = 0
    for (const cell of row) {
      while ((occupiedUntil[columnIndex] ?? 0) > rowIndex) {
        columnIndex++
      }
      const width = normalizeSpan(cell.colSpan)
      const height = normalizeSpan(cell.rowSpan, 65534)
      for (let offset = 0; offset < width; offset++) {
        const index = columnIndex + offset
        ;(columnHeaders[index] ??= []).push(cell.id)
        occupiedUntil[index] = rowIndex + height
      }
      columnIndex += width
    }
  })

  return {
    columnHeaders,
    headersForSpan(start: number, span = 1) {
      const headers = new Set<string>()
      for (let index = start; index < start + normalizeSpan(span); index++) {
        for (const id of columnHeaders[index] ?? []) {
          headers.add(id)
        }
      }
      return [...headers]
    },
  }
}
