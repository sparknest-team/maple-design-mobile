import type { Sorter, TableColumnData, TableData } from '../../../types'
import { leafColumns } from '../../columns'
import { sortRecords } from '../compute'

/** Copy the array, preserve raw row identity and the existing remote-sort marker. */
export function sortTableData<Row extends TableData>(
  data: readonly Row[],
  sorter: Sorter | undefined,
  columns: readonly TableColumnData[],
): Row[] {
  return sortRecords(
    [...data],
    sorter,
    leafColumns(columns).find((column) => column.dataIndex === sorter?.field),
    (record) => record,
  )
}
