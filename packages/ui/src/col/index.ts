import { withInstall } from '../utils/components'
import Component from './Col.vue'
import { colProps } from './props'

const Col: import('../utils/components').ComponentWithInstall<typeof Component> = withInstall(Component)
export { Col, colProps }
export type { ColProps, ColBreakpoint, ColSizeDescriptor, FlexType } from './props'
export type ColInstance = InstanceType<typeof Component>
export const _ColComponent: typeof Col = Col
export default Col
