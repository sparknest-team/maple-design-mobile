import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as rowProps } from './props'
import Row from './Row.vue'

withInstall(Row)
withPropsDefaultsSetter(Row, rowProps)

export { rowProps }

export type RowInstance = InstanceType<typeof Row>
export type { RowProps, RowJustify, RowAlign, RowGutter } from './props'
export type { ResponsiveValue } from '../utils/responsive-observe'
export const _RowComponent = Row

export default Row
