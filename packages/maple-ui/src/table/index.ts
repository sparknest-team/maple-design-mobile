import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as tableProps } from './props'
import Table from './Table.vue'

withInstall(Table)
withPropsDefaultsSetter(Table, tableProps)

export { tableProps }

export type TableInstance = InstanceType<typeof Table>
export const _TableComponent: typeof Table = Table

export default Table
export type TableProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
