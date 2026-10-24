import { withInstall } from '../utils/components'
import Popover from './Popover.vue'
import { popoverProps } from './props'

withInstall(Popover)

export { popoverProps }

export type PopoverInstance = InstanceType<typeof Popover>
export const _PopoverComponent: typeof Popover = Popover

export default Popover
export type { PopoverPlacement, PopoverProps, PopoverTrigger } from './props'
