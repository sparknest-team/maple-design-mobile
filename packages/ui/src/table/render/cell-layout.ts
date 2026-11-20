import type { CSSProperties } from 'vue'
import type { TableColumnData, TableOperationColumn } from '../types'
import { getColumnLayoutKey } from '../extra-column'
import { frozenColumnOffset, operationFixedOffset, operationStickyOffset } from '../kernel/frozen-columns'

export const getOperationFixedNumber = (column: TableOperationColumn, operations: TableOperationColumn[]) =>
  operationFixedOffset(column, operations)

// Keep the existing call surface; column identity remains owned by Cedar.
export const getFixedNumber = (
  column: TableColumnData,
  {
    dataColumns,
    operations,
  }: {
    dataColumns: TableColumnData[]
    operations: TableOperationColumn[]
  },
  tableLayout?: 'fixed' | 'auto',
  dir: 'ltr' | 'rtl' = 'ltr',
) => frozenColumnOffset(column, { dataColumns, operations, keyOf: getColumnLayoutKey }, tableLayout, dir)

export const getOperationFixedCls = (prefixCls: string, column: TableOperationColumn): any[] => {
  if (column.fixed) {
    return [
      `${prefixCls}-col-fixed-left`,
      {
        [`${prefixCls}-col-fixed-left-last`]: column.isLastLeftFixed,
      },
    ]
  }
  return []
}

export const getFixedCls = (
  prefixCls: string,
  column: Pick<TableColumnData, 'fixed' | 'isLastLeftFixed' | 'isFirstRightFixed'>,
  hideLeftBoundary = false,
): any[] => {
  if (column.fixed === 'left') {
    return [
      `${prefixCls}-col-fixed-left`,
      {
        [`${prefixCls}-col-fixed-left-last`]: column.isLastLeftFixed && !hideLeftBoundary,
      },
    ]
  }
  if (column.fixed === 'right') {
    return [
      `${prefixCls}-col-fixed-right`,
      {
        [`${prefixCls}-col-fixed-right-first`]: column.isFirstRightFixed,
      },
    ]
  }
  return []
}

export const getStyle = (
  column: TableColumnData,
  {
    dataColumns,
    operations,
  }: {
    dataColumns: TableColumnData[]
    operations: TableOperationColumn[]
  },
  tableLayout?: 'fixed' | 'auto',
  dir: 'ltr' | 'rtl' = 'ltr',
): CSSProperties => {
  if (column.fixed) {
    const offset = `${getFixedNumber(column, { dataColumns, operations }, tableLayout, dir)}px`
    if (column.fixed === 'left') {
      return {
        left: offset,
      }
    }
    return {
      right: offset,
    }
  }
  return {}
}

export const getOperationStyle = (column: TableOperationColumn, operations: TableOperationColumn[], dir: 'ltr' | 'rtl' = 'ltr', dataColumns: TableColumnData[] = [], tableLayout?: 'fixed' | 'auto') => {
  if (column.fixed) {
    return {
      left: `${operationStickyOffset(column, operations, dir, dataColumns, tableLayout)}px`,
    }
  }
  return {}
}
