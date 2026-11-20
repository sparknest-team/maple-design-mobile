/** Minimal structural inputs: this module does not import the UI column model. */
export interface FrozenColumn {
  dataIndex?: string
  fixed?: 'left' | 'right'
  width?: number
  _resizeWidth?: number
  _realWidth?: number
  children?: readonly FrozenColumn[]
}

export interface FrozenOperation {
  name: string
  fixed?: boolean
  width?: number
  _realWidth?: number
}

export type LayoutMode = 'fixed' | 'auto'
export type LayoutDirection = 'ltr' | 'rtl'

const columnWidth = (column: FrozenColumn, mode?: LayoutMode) => mode === 'auto'
  ? column._realWidth ?? column.width ?? 0
  : column._resizeWidth ?? column._realWidth ?? column.width ?? 0

const firstLeaf = (column: FrozenColumn): FrozenColumn => column.children?.length ? firstLeaf(column.children[0]) : column
const lastLeaf = (column: FrozenColumn): FrozenColumn => column.children?.length ? lastLeaf(column.children[column.children.length - 1]) : column

/** LTR operation lookup deliberately uses the first matching name, as before. */
export function operationFixedOffset(column: FrozenOperation, operations: readonly FrozenOperation[]): number {
  const index = operations.findIndex(item => item.name === column.name)
  if (index <= 0) return 0
  return operations.slice(0, index).reduce((sum, item) => sum + (item._realWidth ?? item.width ?? 0), 0)
}

export function frozenColumnOffset(
  column: FrozenColumn,
  {
    dataColumns,
    operations,
    keyOf,
  }: {
    dataColumns: readonly FrozenColumn[]
    operations: readonly FrozenOperation[]
    /** The adapter owns special-column identity; the kernel knows no symbols. */
    keyOf: (column: FrozenColumn) => string | undefined
  },
  mode?: LayoutMode,
  direction: LayoutDirection = 'ltr',
): number {
  if (direction === 'rtl') {
    const boundary = column.fixed === 'left' ? lastLeaf(column) : firstLeaf(column)
    const index = dataColumns.findIndex(item => keyOf(item) === keyOf(boundary))
    const outside = column.fixed === 'left' ? dataColumns.slice(index + 1) : dataColumns.slice(0, index)
    return outside.filter(item => item.fixed === column.fixed).reduce((sum, item) => sum + columnWidth(item, mode), 0)
  }

  let offset = 0
  if (column.fixed === 'left') {
    for (const operation of operations) offset += operation._realWidth ?? operation.width ?? 40
    const boundary = firstLeaf(column)
    for (const item of dataColumns) {
      if (keyOf(boundary) === keyOf(item)) break
      offset += columnWidth(item, mode)
    }
    return offset
  }

  const boundary = lastLeaf(column)
  for (let index = dataColumns.length - 1; index >= 0; index--) {
    const item = dataColumns[index]
    if (keyOf(boundary) === keyOf(item)) break
    if (item.fixed === 'right') offset += columnWidth(item, mode)
  }
  return offset
}

export function operationStickyOffset(
  column: FrozenOperation,
  operations: readonly FrozenOperation[],
  direction: LayoutDirection = 'ltr',
  dataColumns: readonly FrozenColumn[] = [],
  mode?: LayoutMode,
): number {
  if (direction !== 'rtl') return operationFixedOffset(column, operations)
  // RTL uses reference identity, including the legacy -1 lookup behavior.
  return operations.slice(operations.indexOf(column) + 1)
    .filter(item => item.fixed)
    .reduce((sum, item) => sum + (item._realWidth ?? item.width ?? 40), 0)
    + dataColumns.filter(item => item.fixed === 'left').reduce((sum, item) => sum + columnWidth(item, mode), 0)
}
