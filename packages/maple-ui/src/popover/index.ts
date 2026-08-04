import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Popover from './Popover.vue'
import { props as popoverProps } from './props'

withInstall(Popover)
withPropsDefaultsSetter(Popover, popoverProps)

export { popoverProps }

export const _PopoverComponent = Popover

export default Popover
