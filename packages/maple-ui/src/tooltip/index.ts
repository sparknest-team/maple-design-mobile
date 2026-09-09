import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as tooltipProps } from './props'
import Tooltip from './Tooltip.vue'

withInstall(Tooltip)
withPropsDefaultsSetter(Tooltip, tooltipProps)

export { tooltipProps }

export type TooltipInstance = InstanceType<typeof Tooltip>
export const _TooltipComponent: typeof Tooltip = Tooltip

export default Tooltip
export type TooltipProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
export type { TooltipStatus } from './props'
