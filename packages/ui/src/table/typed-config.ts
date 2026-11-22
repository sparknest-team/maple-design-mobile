import type { CSSProperties, VNodeChild } from 'vue'
import type { BaseType, ClassName } from '../_utils/types'
import type { TableProps } from './index'
import type {
  TableColumnData,
  TableData,
  TableExpandable,
  TableFilterable,
  TableOperationColumn,
  TableSortable,
} from './types'

type JoinPath<Key extends string | number, Path> = Path extends string
  ? Path extends `[${string}`
    ? `${Key}${Path}`
    : `${Key}.${Path}`
  : never

type ChildPath<Value, Depth extends unknown[]> = 0 extends 1 & Value
  ? never
  : Value extends Date | ((...args: never[]) => unknown)
    ? never
    : Value extends readonly (infer Item)[]
      ? | `${number}`
        | `[${number}]`
        | JoinPath<number, RowPath<NonNullable<Item>, Depth>>
        | (RowPath<NonNullable<Item>, Depth> extends infer Path
            ? Path extends string
              ? `[${number}].${Path}`
              : never
            : never)
      : RowPath<Value, Depth>

type RowPath<Row, Depth extends unknown[] = []> = Depth['length'] extends 5
  ? never
  : Row extends object
    ? {
        [Key in Extract<keyof Row, string | number>]:
          `${Key}` | JoinPath<Key, ChildPath<NonNullable<Row[Key]>, [...Depth, unknown]>>
      }[Extract<keyof Row, string | number>]
    : never

/** 可选类型入口的字段路径；支持嵌套字段和数组下标，最多五层。 */
export type TableDataPath<Row extends TableData> = RowPath<Row>

/** 树形子数据与父行使用同一业务结构。 */
export type TypedTableRow<Row extends TableData> = Row & { children?: TypedTableRow<Row>[] }

/** rowKey 使用行中值为 string/number 的字段，不是嵌套路径。 */
export type TypedTableRowKey<Row extends TableData> = {
  [Key in Extract<keyof Row, string>]-?: NonNullable<Row[Key]> extends BaseType ? Key : never
}[Extract<keyof Row, string>]

/** 排序比较器接收业务行；其余排序选项沿用现有协议。 */
export type TypedTableSortable<Row extends TableData> = Omit<TableSortable, 'sorter'> & {
  sorter?:
    boolean | ((a: Row, b: Row, extra: { dataIndex: TableDataPath<Row>; direction: 'ascend' | 'descend' }) => number)
}

/** 筛选器接收业务行，筛选项和筛选值沿用现有协议。 */
export type TypedTableFilterable<Row extends TableData> = Omit<TableFilterable, 'filter'> & {
  filter: (filteredValue: string[], record: Row) => boolean
}

type ColumnOwnedKey =
  | 'dataIndex'
  | 'render'
  | 'sortable'
  | 'filterable'
  | 'children'
  | 'parent'
  | 'bodyCellClass'
  | 'summaryCellClass'
  | 'bodyCellStyle'
  | 'summaryCellStyle'

/** 配置检查用列类型；使用 defineTableConfig 适配回已发布的 TableProps。 */
export type TypedTableColumn<Row extends TableData> = Omit<TableColumnData, ColumnOwnedKey> & {
  dataIndex?: TableDataPath<Row>
  render?: (data: { record: Row; column: TypedTableColumn<Row>; rowIndex: number }) => VNodeChild
  sortable?: TypedTableSortable<Row>
  filterable?: TypedTableFilterable<Row>
  children?: TypedTableColumn<Row>[]
  parent?: TypedTableColumn<Row>
  bodyCellClass?: ClassName | ((record: Row) => ClassName)
  summaryCellClass?: ClassName | ((record: Row) => ClassName)
  bodyCellStyle?: CSSProperties | ((record: Row) => CSSProperties)
  summaryCellStyle?: CSSProperties | ((record: Row) => CSSProperties)
}

/** 展开内容与图标接收业务行。 */
export type TypedTableExpandable<Row extends TableData> = Omit<TableExpandable, 'expandedRowRender' | 'icon'> & {
  expandedRowRender?: (record: Row) => VNodeChild
  icon?: (expanded: boolean, record: Row) => VNodeChild
}

type TypedSpanMethod<Row extends TableData> = (data: {
  record: Row
  column: TypedTableColumn<Row> | TableOperationColumn
  rowIndex: number
  columnIndex: number
}) => { rowspan?: number; colspan?: number } | void

type ConfigOwnedKey =
  | 'data'
  | 'columns'
  | 'rowKey'
  | 'expandable'
  | 'loadMore'
  | 'spanMethod'
  | 'summarySpanMethod'
  | 'rowClass'
  | 'summary'

/**
 * 主动选用的整体配置；不收窄原组件 Props。
 * 显式 rowKey 确定业务身份；合计函数必须返回完整业务行，自动 summary=true 继续走旧入口。
 */
export type TypedTableConfig<Row extends TableData> = Omit<TableProps, ConfigOwnedKey> & {
  data: TypedTableRow<Row>[]
  columns: TypedTableColumn<Row>[]
  rowKey: TypedTableRowKey<Row>
  expandable?: TypedTableExpandable<Row>
  loadMore?: (record: Row, done: (children?: TypedTableRow<Row>[]) => void) => void
  spanMethod?: TypedSpanMethod<Row>
  summarySpanMethod?: TypedSpanMethod<Row>
  rowClass?: ClassName | ((record: Row, rowIndex: number) => ClassName)
  summary?: false | ((params: { columns: TypedTableColumn<Row>[]; data: Row[] }) => TypedTableRow<Row>[])
}

/** 入参检查关联关系，返回同一对象供原 Table 的 Vue/TSX 调用；不复制、归一化或拦截数据。 */
export function defineTableConfig<Row extends TableData>(config: TypedTableConfig<Row>): TableProps {
  return config as unknown as TableProps
}
