import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { rowProps } from './props'
import Component from './Row.vue'

const Row = withInstall(Component)
export { Row, rowProps }
export type { RowProps, RowGutter, RowAlign, RowJustify } from './props'
export type RowInstance = InstanceType<typeof Component>
export const _RowComponent = Row
export default Row

withPropsDefaultsSetter(Row, rowProps)
