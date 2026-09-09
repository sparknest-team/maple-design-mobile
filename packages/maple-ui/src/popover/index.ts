import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Popover from './Popover.vue'
import { props as popoverProps } from './props'

withInstall(Popover)
withPropsDefaultsSetter(Popover, popoverProps)

export { popoverProps }

export type PopoverInstance = InstanceType<typeof Popover>
export const _PopoverComponent: typeof Popover = Popover

export default Popover
export type PopoverProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
