import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import CountdownSource from './Countdown.vue'
import { countdownProps } from './props'

const Countdown = withInstall(CountdownSource)
withPropsDefaultsSetter(Countdown, countdownProps)

export { countdownProps }

export type CountdownInstance = InstanceType<typeof Countdown>
export type { CountdownProps, TimeData, CountdownSlots, CountdownEvents, CountdownExpose } from './props'
export const _CountdownComponent: typeof Countdown = Countdown

export default Countdown
