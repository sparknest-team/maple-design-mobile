import type { InjectionKey, Slots } from 'vue'
import { BaseType } from '../_utils/types'
import { Filters, Sorter, TableColumnData, TableData, TableDataWithRaw } from './types'

export interface TableContext {
  readingDirection?: 'ltr' | 'rtl'
  hasPhysicalLeftOperations?: boolean
  physicalDataColumns?: TableColumnData[]
  loadMore?: (record: TableData, done: (children?: TableData[]) => void) => void
  addLazyLoadData: (children: TableData[] | undefined, record: TableDataWithRaw) => void
  slots: Slots
  sorter: Sorter | undefined
  currentAllEnabledRowKeys: BaseType[]
  currentSelectedRowKeys: BaseType[]
  checkStrictly: boolean
  filters: Filters
  filterIconAlignLeft: boolean
  resizingColumn: string
  addColumn: (id: number, column: TableColumnData) => void
  removeColumn: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onSelect: (checked: boolean, record: TableDataWithRaw) => void
  onSelectAllLeafs: (record: TableDataWithRaw, checked: boolean) => void

  onSorterChange: (dataIndex: string, direction: 'ascend' | 'descend' | '', ev: Event) => void
  onFilterChange: (dataIndex: string, filteredValues: string[], ev: Event) => void
  onThKeydown?: (dataIndex: string, event: KeyboardEvent) => void
  onThMouseDown: (dataIndex: string, ev: MouseEvent) => void

  /** 末列扩展列 dataIndex（配合 #extra-column-header / #extra-column-cell） */
  extraColumnDataIndex?: string

  /**
   * 当前生效的 table-layout（reactive provide 自动解包为字符串）。
   * auto 布局下列宽由浏览器按内容分配，冻结偏移须用渲染后测量回写的 _realWidth，
   * 忽略拖拽写入的 _resizeWidth（浏览器并不执行它）。
   */
  tableLayout?: 'fixed' | 'auto'
}

export interface TableColumnContext {
  addChild: (id: number, column: TableColumnData) => void
  removeChild: (id: number) => void
}

export const tableInjectionKey: InjectionKey<TableContext> = Symbol('CedarTable')

export const tableColumnInjectionKey: InjectionKey<TableColumnContext> = Symbol('CedarTableColumn')
