import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as tableProps } from './props'
import TableSource from './Table.vue'

const Table = withInstall(TableSource)
withPropsDefaultsSetter(Table, tableProps)

export { tableProps }

export type TableInstance = InstanceType<typeof Table>
export const _TableComponent: typeof Table = Table

export default Table
export type TableProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
