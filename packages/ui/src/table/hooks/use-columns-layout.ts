import type { TableColumnData, TableOperationColumn } from '../types'
import { getColumnLayoutKey, isTableExtraColumn } from '../extra-column'
import { calculateColumnWidths } from '../kernel/column-widths'

export { DEFAULT_COLUMN_MIN_WIDTH, DEFAULT_OPERATION_WIDTH } from '../kernel/column-widths'

export interface ColumnsLayoutResult {
  hasHorizontalOverflow: boolean
  bodyWidth: number
  columnRealWidth: Record<string, number>
}

/** Adapt Cedar's column identity and writeback contract to the pure kernel. */
export const updateColumnsWidth = ({
  containerWidth,
  dataColumns,
  operations,
  fit,
  exactDataIndexes,
}: {
  containerWidth: number
  dataColumns: TableColumnData[]
  operations: TableOperationColumn[]
  fit: boolean
  exactDataIndexes?: string[]
}): ColumnsLayoutResult => {
  const extraFields = new Set(dataColumns.filter(isTableExtraColumn).map(column => column.dataIndex))
  const result = calculateColumnWidths({
    containerWidth,
    dataColumns: dataColumns.map(column => ({
      key: getColumnLayoutKey(column),
      dataIndex: column.dataIndex,
      width: column.width,
      minWidth: column.minWidth,
      _resizeWidth: column._resizeWidth,
      exact: isTableExtraColumn(column) || Boolean(
        column.dataIndex && exactDataIndexes?.includes(column.dataIndex) && !extraFields.has(column.dataIndex),
      ),
    })),
    operations,
    fit,
  })
  for (const { index, width } of result.widthUpdates) dataColumns[index]._realWidth = width
  return {
    hasHorizontalOverflow: result.hasHorizontalOverflow,
    bodyWidth: result.bodyWidth,
    columnRealWidth: result.columnRealWidth,
  }
}
