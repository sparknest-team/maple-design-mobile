import { withInstall } from '../utils/components'
import SwitchSource from './presentation'
import { props as switchProps } from './props'

const Switch = withInstall(SwitchSource)

export { switchProps }
export type { SwitchVariant, SwitchSize, SwitchValue, SwitchBeforeChange } from './props'

export type SwitchInstance = InstanceType<typeof Switch>
export const _SwitchComponent: typeof Switch = Switch

export default Switch
export type SwitchProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
