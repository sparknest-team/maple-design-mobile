import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Countdown from './Countdown.vue'
import { countdownProps } from './props'

withInstall(Countdown)
withPropsDefaultsSetter(Countdown, countdownProps)

export { countdownProps }

export type CountdownInstance = InstanceType<typeof Countdown>
export type { CountdownProps, TimeData } from './props'
export const _CountdownComponent: typeof Countdown = Countdown

export default Countdown
