import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { rowProps } from './props'
import Component from './Row.vue'

const Row: import('../utils/components').ComponentWithInstall<typeof Component> = withInstall(Component)
export { Row, rowProps }
export type { RowProps, RowGutter, RowAlign, RowJustify } from './props'
export type RowInstance = InstanceType<typeof Component>
export const _RowComponent: typeof Row = Row
export default Row

withPropsDefaultsSetter(Row, rowProps)
