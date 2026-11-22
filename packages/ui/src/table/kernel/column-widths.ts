// Pure layout arithmetic. No Vue, DOM, component or brand dependencies.
export const DEFAULT_COLUMN_MIN_WIDTH = 80
export const DEFAULT_OPERATION_WIDTH = 40

export interface WidthColumnInput {
  /** Stable layout identity, independent of the business field. */
  key?: string
  dataIndex?: string
  width?: number
  minWidth?: number
  _resizeWidth?: number
  /** Keep this column out of proportional expansion. */
  exact?: boolean
}

export interface ColumnWidthsInput {
  containerWidth: number
  dataColumns: readonly WidthColumnInput[]
  operations: readonly { width?: number }[]
  fit: boolean
}

export interface ColumnWidthUpdate {
  index: number
  width: number
}

export interface ColumnWidthsResult {
  hasHorizontalOverflow: boolean
  bodyWidth: number
  columnRealWidth: Record<string, number>
  /** Ordered writes preserve the legacy adapter's per-column mutation behavior. */
  widthUpdates: ColumnWidthUpdate[]
}

// Match the existing numeric predicate, including its NaN handling.
const isNumber = (value: unknown): value is number =>
  Object.prototype.toString.call(value) === '[object Number]' && value === value

/**
 * Element Plus 风格列宽分配：
 * - 有 width（或拖拽宽度）→ 固定列
 * - 无 width → 弹性列：fit=true 时按 minWidth（默认 80）比例吸收剩余空间
 * - 列最小宽之和超过容器 → 开启横向滚动
 * - 列宽之和不足容器 → 剩余空间按各列基础宽度比例放大撑满（与 fit 无关；
 *   标记为 exact 的钉死列 不参与放大，保持原宽）
 */
export const calculateColumnWidths = ({
  containerWidth,
  dataColumns: sourceColumns,
  operations,
  fit,
}: ColumnWidthsInput): ColumnWidthsResult => {
  // Own the scratch records; callers' columns and arrays remain untouched.
  const dataColumns = sourceColumns.map((column, index) => ({ ...column, index }))
  const widthUpdates: ColumnWidthUpdate[] = []
  const writeWidth = (column: { index: number }, width: number) => {
    widthUpdates.push({ index: column.index, width })
  }
  const columnRealWidth: Record<string, number> = {}
  let operationsWidth = 0

  for (const item of operations) {
    operationsWidth += item.width ?? DEFAULT_OPERATION_WIDTH
  }

  if (!containerWidth || dataColumns.length === 0) {
    let bodyMinWidth = operationsWidth
    for (const column of dataColumns) {
      const dataIndex = column.key
      if (!dataIndex) {
        continue
      }
      const width = column._resizeWidth ?? column.width ?? column.minWidth ?? DEFAULT_COLUMN_MIN_WIDTH
      columnRealWidth[dataIndex] = width
      writeWidth(column, width)
      bodyMinWidth += width
    }
    return {
      hasHorizontalOverflow: false,
      bodyWidth: bodyMinWidth,
      columnRealWidth,
      widthUpdates,
    }
  }

  const flexColumns = dataColumns.filter((column) => {
    if (isNumber(column._resizeWidth)) {
      return false
    }
    return !isNumber(column.width)
  })

  let bodyMinWidth = operationsWidth

  if (flexColumns.length > 0 && fit) {
    for (const column of dataColumns) {
      if (isNumber(column._resizeWidth)) {
        bodyMinWidth += column._resizeWidth
      } else {
        bodyMinWidth += Number(column.width || column.minWidth || DEFAULT_COLUMN_MIN_WIDTH)
      }
    }

    if (bodyMinWidth <= containerWidth) {
      const totalFlexWidth = containerWidth - bodyMinWidth

      if (flexColumns.length === 1) {
        const column = flexColumns[0]
        const minWidth = Number(column.minWidth || DEFAULT_COLUMN_MIN_WIDTH)
        if (column.dataIndex) {
          columnRealWidth[column.key!] = minWidth + totalFlexWidth
          writeWidth(column, columnRealWidth[column.key!])
        }
      } else {
        const allColumnsWidth = flexColumns.reduce(
          (prev, column) => prev + Number(column.minWidth || DEFAULT_COLUMN_MIN_WIDTH),
          0,
        )
        const flexWidthPerPixel = totalFlexWidth / allColumnsWidth
        let noneFirstWidth = 0

        flexColumns.forEach((column, index) => {
          if (index === 0) {
            return
          }
          const minWidth = Number(column.minWidth || DEFAULT_COLUMN_MIN_WIDTH)
          const flexWidth = Math.floor(minWidth * flexWidthPerPixel)
          noneFirstWidth += flexWidth
          if (column.dataIndex) {
            columnRealWidth[column.key!] = minWidth + flexWidth
            writeWidth(column, columnRealWidth[column.key!])
          }
        })

        const first = flexColumns[0]
        const firstMinWidth = Number(first.minWidth || DEFAULT_COLUMN_MIN_WIDTH)
        if (first.dataIndex) {
          columnRealWidth[first.key!] = firstMinWidth + totalFlexWidth - noneFirstWidth
          writeWidth(first, columnRealWidth[first.key!])
        }
      }

      for (const column of dataColumns) {
        if (!column.dataIndex || columnRealWidth[column.key!]) {
          continue
        }
        const width = column._resizeWidth ?? column.width!
        columnRealWidth[column.key!] = width
        writeWidth(column, width)
      }

      return {
        hasHorizontalOverflow: false,
        bodyWidth: Math.max(bodyMinWidth, containerWidth),
        columnRealWidth,
        widthUpdates,
      }
    }

    for (const column of flexColumns) {
      const width = Number(column.minWidth || DEFAULT_COLUMN_MIN_WIDTH)
      if (column.dataIndex) {
        columnRealWidth[column.key!] = width
        writeWidth(column, width)
      }
    }
    for (const column of dataColumns) {
      if (!column.dataIndex || columnRealWidth[column.key!]) {
        continue
      }
      const width = column._resizeWidth ?? column.width!
      columnRealWidth[column.key!] = width
      writeWidth(column, width)
    }

    return {
      hasHorizontalOverflow: true,
      bodyWidth: bodyMinWidth,
      columnRealWidth,
      widthUpdates,
    }
  }

  for (const column of dataColumns) {
    let width: number
    if (isNumber(column._resizeWidth)) {
      width = column._resizeWidth
    } else if (!column.width && !column.minWidth) {
      width = DEFAULT_COLUMN_MIN_WIDTH
    } else {
      width = Number(column.width || column.minWidth)
    }
    if (column.dataIndex) {
      columnRealWidth[column.key!] = width
      writeWidth(column, width)
    }
    bodyMinWidth += width
  }

  // 列宽之和不足容器：剩余空间按各列基础宽度比例放大（钉死列保持原宽），
  // 保证表格至少铺满父容器宽度——与 fit 无关，fit 只决定有弹性列时剩余空间
  // 是全给弹性列（fit=true，显式 width 的列保持原宽）还是按比例分摊（fit=false）。
  // element 在 fit=false 时表格缩为列宽之和，cedar 按业务要求不缩。
  if (bodyMinWidth < containerWidth) {
    const scalable = dataColumns.filter((column) => column.dataIndex && !column.exact)
    const totalBase = scalable.reduce((prev, column) => prev + columnRealWidth[column.key!], 0)
    if (scalable.length > 0 && totalBase > 0) {
      const leftover = containerWidth - bodyMinWidth
      let assigned = 0
      scalable.forEach((column, index) => {
        const key = column.key!
        if (index === scalable.length - 1) {
          columnRealWidth[key] += leftover - assigned
        } else {
          const share = Math.floor((leftover * columnRealWidth[key]) / totalBase)
          columnRealWidth[key] += share
          assigned += share
        }
        writeWidth(column, columnRealWidth[key])
      })
      return {
        hasHorizontalOverflow: false,
        bodyWidth: containerWidth,
        columnRealWidth,
        widthUpdates,
      }
    }
  }

  return {
    hasHorizontalOverflow: bodyMinWidth > containerWidth,
    bodyWidth: bodyMinWidth,
    columnRealWidth,
    widthUpdates,
  }
}
