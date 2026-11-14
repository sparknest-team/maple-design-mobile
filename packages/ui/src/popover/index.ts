import { withInstall } from '../utils/components'
import PopoverSource from './Popover.vue'
import { popoverProps } from './props'

const Popover = withInstall(PopoverSource)
export { popoverProps }

export type PopoverInstance = InstanceType<typeof Popover>
export const _PopoverComponent: typeof Popover = Popover

export default Popover
export type { PopoverPlacement, PopoverProps, PopoverTrigger } from './props'
