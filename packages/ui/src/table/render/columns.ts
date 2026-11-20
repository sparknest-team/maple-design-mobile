import type { TableColumnData } from '../types'
import { isArray, isNull, isUndefined } from '../../_utils/is'
import { getColumnLayoutKey, isTableExtraColumn, setExtraColumnLayoutKey } from '../extra-column'
import { orderPhysicalColumns } from '../column-direction'

const getDataColumnsNumber = (columns: TableColumnData[]): number => {
  let count = 0

  const travelColumns = (columns: TableColumnData[]) => {
    if (isArray(columns) && columns.length > 0) {
      for (const item of columns) {
        if (!item.children) {
          count += 1
        } else {
          travelColumns(item.children)
        }
      }
    }
  }
  travelColumns(columns)

  return count
}

// Get the total number of rows in the header
const getTotalHeaderRows = (columns: TableColumnData[]): number => {
  let count = 0
  if (isArray(columns) && columns.length > 0) {
    count = 1
    for (const item of columns) {
      if (item.children) {
        const depth = getTotalHeaderRows(item.children)
        if (depth > 0) {
          count = Math.max(count, depth + 1)
        }
      }
    }
  }
  return count
}

const setParentFixed = (column: TableColumnData, fixed: 'left' | 'right') => {
  let { parent } = column
  while (parent) {
    if (parent.fixed === fixed) {
      if (fixed === 'left') {
        parent.isLastLeftFixed = true
      } else {
        parent.isFirstRightFixed = true
      }
    }
    parent = parent.parent
  }
}

/** 若分组下所有叶子 fixed 一致，返回该值；否则 undefined */
const getUniformLeafFixed = (column: TableColumnData): 'left' | 'right' | undefined => {
  const leaves: TableColumnData[] = []
  const walk = (cols: TableColumnData[]) => {
    cols.forEach((col) => {
      if (isArray(col.children) && col.children.length) {
        walk(col.children)
      } else {
        leaves.push(col)
      }
    })
  }
  if (isArray(column.children) && column.children.length) {
    walk(column.children)
  }
  if (!leaves.length) return undefined
  const first = leaves[0].fixed
  if (first !== 'left' && first !== 'right') return undefined
  return leaves.every((leaf) => leaf.fixed === first) ? first : undefined
}

// Get the grouped header row data
export const getGroupColumns = (
  columns: TableColumnData[],
  columnMap: Map<string, TableColumnData>,
  columnWidth: Record<string, number>,
  dir: 'ltr' | 'rtl' = 'ltr',
) => {
  const totalHeaderRows = getTotalHeaderRows(columns)

  columnMap.clear()
  const dataColumns: TableColumnData[] = []
  const groupColumns: TableColumnData[][] = [...Array(totalHeaderRows)].map(() => [])

  const groupRanges = new Map<TableColumnData, [number, number]>()

  // For recording
  let lastLeftFixedIndex: number | undefined
  let firstRightFixedIndex: number | undefined
  let firstLeftFixedIndex: number | undefined
  let lastRightFixedIndex: number | undefined

  const travelColumns = (
    columns: TableColumnData[],
    {
      level = 0,
      parent,
      fixed,
    }: {
      level?: number
      parent?: TableColumnData
      fixed?: 'left' | 'right'
    } = {},
  ) => {
    for (const item of columns) {
      const cell: TableColumnData = { ...item, parent }
      if (isArray(cell.children)) {
        const colSpan = getDataColumnsNumber(cell.children)
        if (colSpan > 1) {
          cell.colSpan = colSpan
        }
        // 子列全部同侧冻结时，分组表头也要带上 fixed，否则横滚时表头不会跟着固定
        if (!cell.fixed) {
          const uniformFixed = getUniformLeafFixed(cell)
          if (uniformFixed) {
            cell.fixed = uniformFixed
          }
        }
        groupColumns[level].push(cell)
        const start = dataColumns.length
        travelColumns(cell.children, {
          level: level + 1,
          parent: cell,
          fixed: cell.fixed,
        })
        groupRanges.set(cell, [start, dataColumns.length])
      } else {
        // Minimum header
        const rowSpan = totalHeaderRows - level
        if (rowSpan > 1) {
          cell.rowSpan = rowSpan
        }
        if (fixed || cell.fixed) {
          cell.fixed = cell.fixed ?? fixed
          if (cell.fixed === 'left') {
            lastLeftFixedIndex = dataColumns.length
            firstLeftFixedIndex ??= dataColumns.length
          } else if (isUndefined(firstRightFixedIndex)) {
            firstRightFixedIndex = dataColumns.length
          }
        }

        if (cell.fixed === 'right') lastRightFixedIndex = dataColumns.length
        if (isUndefined(cell.dataIndex) || isNull(cell.dataIndex)) {
          cell.dataIndex = `__arco_data_index_${dataColumns.length}`
        }

        if (isTableExtraColumn(cell) && columnMap.has(cell.dataIndex)) {
          let layoutKey = `@cedar-extra:${cell.dataIndex}`
          while (columnMap.has(layoutKey)) layoutKey += '@'
          setExtraColumnLayoutKey(cell, layoutKey)
        }
        const layoutKey = getColumnLayoutKey(cell)!
        if (columnWidth[layoutKey]) {
          cell._resizeWidth = columnWidth[layoutKey]
        }

        // dataColumns和groupColumns公用一个cell的引用
        if (!isTableExtraColumn(cell) || !columnMap.has(cell.dataIndex)) {
          columnMap.set(cell.dataIndex, cell)
        }
        dataColumns.push(cell)
        groupColumns[level].push(cell)
      }
    }
  }

  travelColumns(columns)

  if (dir === 'rtl') { lastLeftFixedIndex = firstLeftFixedIndex; firstRightFixedIndex = lastRightFixedIndex }
  if (!isUndefined(lastLeftFixedIndex)) {
    dataColumns[lastLeftFixedIndex].isLastLeftFixed = true
    setParentFixed(dataColumns[lastLeftFixedIndex], 'left')
  }
  if (!isUndefined(firstRightFixedIndex)) {
    dataColumns[firstRightFixedIndex].isFirstRightFixed = true
    setParentFixed(dataColumns[firstRightFixedIndex], 'right')
  }

  // Each header section scrolls or sticks with its own contiguous leaf columns.
  const visualGroups = groupColumns.map(row => row.flatMap(cell => {
    const range = groupRanges.get(cell)
    if (!range) return [cell]
    const leaves = orderPhysicalColumns(dataColumns.slice(...range), leaf => leaf.fixed, dir)
    if (dir === 'ltr' && leaves.every(leaf => leaf.fixed === cell.fixed)) return [cell]

    const sections: TableColumnData[][] = []
    for (const leaf of leaves) {
      const last = sections[sections.length - 1]
      if (last && last[0].fixed === leaf.fixed) last.push(leaf)
      else sections.push([leaf])
    }
    return sections.map(section => ({
      ...cell,
      children: section,
      colSpan: section.length,
      fixed: section[0].fixed,
      isLastLeftFixed: section.some(leaf => leaf.isLastLeftFixed),
      isFirstRightFixed: section.some(leaf => leaf.isFirstRightFixed),
    }))
  }))
  return { dataColumns, groupColumns: visualGroups }
}
