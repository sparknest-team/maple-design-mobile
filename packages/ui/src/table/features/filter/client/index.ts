import type { Filters, TableColumnData, TableData } from '../../../types'
import { leafColumns } from '../../columns'
import { matchesRecord } from '../compute'

/** Explicit client processing of flat raw rows; records keep their identity. */
export function filterTableData<Row extends TableData>(
  data: readonly Row[],
  filters: Filters,
  columns: readonly TableColumnData[],
): Row[] {
  const map = new Map(leafColumns(columns).map((column) => [column.dataIndex, column]))
  return data.filter((record) =>
    matchesRecord(
      record,
      () => filters,
      (field) => map.get(field),
    ),
  )
}
