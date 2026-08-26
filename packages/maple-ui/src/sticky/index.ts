import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as stickyProps } from './props'
import Sticky from './Sticky.vue'

withInstall(Sticky)
withPropsDefaultsSetter(Sticky, stickyProps)

export { stickyProps }

export type StickyInstance = InstanceType<typeof Sticky>
export const _StickyComponent = Sticky

export default Sticky
