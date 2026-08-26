import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as switchProps } from './props'
import Switch from './Switch.vue'

withInstall(Switch)
withPropsDefaultsSetter(Switch, switchProps)

export { switchProps }
export type { SwitchVariant } from './props'

export type SwitchInstance = InstanceType<typeof Switch>
export const _SwitchComponent = Switch

export default Switch
