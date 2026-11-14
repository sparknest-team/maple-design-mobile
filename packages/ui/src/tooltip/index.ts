import { withInstall } from '../utils/components'
import { tooltipProps } from './props'
import TooltipSource from './Tooltip.vue'

const Tooltip = withInstall(TooltipSource)
export { tooltipProps }

export type TooltipInstance = InstanceType<typeof Tooltip>
export const _TooltipComponent: typeof Tooltip = Tooltip

export default Tooltip
export type { TooltipProps } from './props'
export type { TooltipSize, TooltipStatus } from './props'
