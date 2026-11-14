import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import CellSource from './Cell.vue'
import { props as cellProps } from './props'

const Cell = withInstall(CellSource)
withPropsDefaultsSetter(Cell, cellProps)

export { cellProps }

export type CellInstance = InstanceType<typeof Cell>
export const _CellComponent: typeof Cell = Cell

export default Cell
export type CellProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>

export type { CellSlots, CellEmits } from './props'
