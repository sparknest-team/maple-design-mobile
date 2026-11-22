import type { VNode } from 'vue'
import { isArray, isNull, isUndefined } from '../_utils/is'
import { BaseType } from '../_utils/types'
import { isArrayChildren, isNamedComponent, isSlotsChildren, resolveProps } from '../_utils/vue-utils'
import { TableColumnData, TableDataWithRaw } from './types'

export { getGroupColumns } from './render/columns'

export {
  getOperationFixedNumber,
  getFixedNumber,
  getOperationFixedCls,
  getFixedCls,
  getStyle,
  getOperationStyle,
} from './render/cell-layout'

/**
 * Obtain table column data through the <TableColumnData> component
 * @param {VNode[]} vns
 */
export const getColumnsFromSlot = (vns: VNode[]) => {
  const columns: TableColumnData[] = []
  for (const vn of vns) {
    if (isNamedComponent(vn, 'TableColumn')) {
      const column = resolveProps(vn) as TableColumnData
      if (isSlotsChildren(vn, vn.children)) {
        if (vn.children.default) {
          column.children = getColumnsFromSlot(vn.children.default())
        }
        if (vn.children.cell) {
          column.render = vn.children.cell
        }
        if (vn.children.title) {
          column.title = vn.children.title
        }
      }
      columns.push(column)
    } else if (isArrayChildren(vn, vn.children)) {
      columns.push(...getColumnsFromSlot(vn.children))
    } else if (isArray(vn)) {
      columns.push(...getColumnsFromSlot(vn))
    }
  }
  return columns
}

export function mapArrayWithChildren<T extends Array<{ [key: string]: any; children?: T }>>(arr: T): T {
  return arr.map((item) => {
    const newItem = { ...item }
    if (newItem.children) {
      newItem.children = mapArrayWithChildren(newItem.children)
    }
    return newItem
  }) as T
}

export function mapRawTableData<T extends TableDataWithRaw[]>(arr: T): TableDataWithRaw['raw'][] {
  return arr.map((item) => {
    const rawItem = item.raw
    if (item.children && rawItem.children) {
      rawItem.children = mapRawTableData(item.children)
    }
    return item.raw
  })
}

export const getLeafKeys = (record: TableDataWithRaw) => {
  const keys: BaseType[] = []
  if (record.children) {
    for (const item of record.children) {
      if (item.isLeaf) {
        keys.push(item.key)
      } else {
        keys.push(...getLeafKeys(item))
      }
    }
  }
  return keys
}

export const getSelectionStatus = (selectedRowKeys: BaseType[], leafKeys: BaseType[]) => {
  let checked = false
  let indeterminate = false
  const selectedLeafKeys = leafKeys.filter((key) => selectedRowKeys.includes(key))
  if (selectedLeafKeys.length > 0) {
    if (selectedLeafKeys.length >= leafKeys.length) {
      checked = true
    } else {
      indeterminate = true
    }
  }

  return {
    checked,
    indeterminate,
  }
}
