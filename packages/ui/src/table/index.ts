import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { tableProps } from './props'
import _Column from './table-column'
import _Table from './table-impl'
import _Tbody from './table-tbody'
import _Td from './table-td'
import _Th from './table-th'
import _Thead from './table-thead'
import _Tr from './table-tr'

const Table: import('../utils/components').ComponentWithInstall<
  typeof _Table & {
    Thead: typeof _Thead
    Tbody: typeof _Tbody
    Tr: typeof _Tr
    Th: typeof _Th
    Td: typeof _Td
    Column: typeof _Column
  }
> = withInstall(
  _Table,
  Object.assign(_Table, {
    Thead: _Thead,
    Tbody: _Tbody,
    Tr: _Tr,
    Th: _Th,
    Td: _Td,
    Column: _Column,
  }),
  { components: [_Table, _Thead, _Tbody, _Tr, _Th, _Td, _Column] },
)

withPropsDefaultsSetter(Table, tableProps)

export type TableInstance = InstanceType<typeof _Table>
export type TheadInstance = InstanceType<typeof _Thead>
export type TbodyInstance = InstanceType<typeof _Tbody>
export type TrInstance = InstanceType<typeof _Tr>
export type ThInstance = InstanceType<typeof _Th>
export type TdInstance = InstanceType<typeof _Td>
export type TableColumnInstance = InstanceType<typeof _Column>

export type {
  TablePaginationConfig,
  TablePaginationScope,
  TableData,
  TableSortable,
  TableFilterData,
  TableFilterable,
  TableColumnData,
  TableBorder,
  TableRowSelection,
  TableExpandable,
  TableDraggable,
  TableComponents,
  TableOperationColumn,
  TableChangeExtra,
} from './types'
export type { TableExtraColumnConfig } from './extra-column'
export {
  TABLE_EXTRA_COLUMN_KEY,
  resolveExtraColumnConfig,
  getExtraColumnWidth,
  DEFAULT_EXTRA_COLUMN_WIDTH,
} from './extra-column'

export { _Thead as Thead, _Tbody as Tbody, _Tr as Tr, _Th as Th, _Td as Td, _Column as TableColumn }

export const _TableComponent: typeof Table = Table
export const _TheadComponent: typeof _Thead = _Thead
export const _TbodyComponent: typeof _Tbody = _Tbody
export const _TrComponent: typeof _Tr = _Tr
export const _ThComponent: typeof _Th = _Th
export const _TdComponent: typeof _Td = _Td
export const _TableColumnComponent: typeof _Column = _Column

export { Table }

export { tableProps }

export default Table
export type TableProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').tableProps>

export { defineTableConfig } from './typed-config'
export type {
  TableDataPath,
  TypedTableRow,
  TypedTableRowKey,
  TypedTableColumn,
  TypedTableSortable,
  TypedTableFilterable,
  TypedTableExpandable,
  TypedTableConfig,
} from './typed-config'
