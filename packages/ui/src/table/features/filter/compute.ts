import type { Filters, TableColumnData, TableData, TableDataWithRaw } from '../../types'

export function matchesRecord(
  record: TableData,
  filters: () => Filters,
  columnFor: (field: string) => TableColumnData | undefined,
): boolean {
  for (const field of Object.keys(filters())) {
    const values = filters()[field]
    const column = columnFor(field)
    if (column && column.filterable?.filter && values.length > 0) {
      const result = column.filterable.filter(values, record)
      if (!result) {
        return result
      }
    }
  }
  return true
}

/** Preserve the complete Table's tree filtering and wrapper mutation semantics. */
export function filterTableRows(
  data: TableDataWithRaw[],
  valid: (record: TableDataWithRaw) => boolean,
): TableDataWithRaw[] {
  return data.filter((record) => {
    if (valid(record)) {
      if (record.children) {
        record.children = filterTableRows(record.children, valid)
      }
      return true
    }
    return false
  })
}
