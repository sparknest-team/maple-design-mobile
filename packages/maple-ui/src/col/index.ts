import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Component from './Col.vue'
import { colProps } from './props'

const Col = withInstall(Component)
export { Col, colProps }
export type { ColProps, ColBreakpoint, ColSizeDescriptor, FlexType } from './props'
export type ColInstance = InstanceType<typeof Component>
export const _ColComponent = Col
export default Col

withPropsDefaultsSetter(Col, colProps)
