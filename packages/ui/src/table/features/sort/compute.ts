import type { Sorter, TableColumnData, TableData } from '../../types'
import { getValueByPath } from '../../../_utils/get-value-by-path'
import { isFunction } from '../../../_utils/is'

/** Sort the supplied array, leaving cloning/row identity to its owning pipeline. */
export function sortRecords<Row>(data: Row[], sorter: Sorter | undefined, column: TableColumnData | undefined, raw: (record: Row) => TableData): Row[] {
  if (data.length && sorter?.field && column && column.sortable?.sorter !== true) {
    const { field, direction } = sorter
    data.sort((a, b) => {
      const valueA = getValueByPath(raw(a), field)
      const valueB = getValueByPath(raw(b), field)
      if (column.sortable?.sorter && isFunction(column.sortable.sorter)) return column.sortable.sorter(raw(a), raw(b), { dataIndex: field, direction })
      const result = valueA > valueB ? 1 : valueA < valueB ? -1 : 0
      return direction === 'descend' ? -result : result
    })
  }
  return data
}
