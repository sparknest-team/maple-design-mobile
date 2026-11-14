import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import CountToSource from './CountTo.vue'
import { countToProps } from './props'

const CountTo = withInstall(CountToSource)
withPropsDefaultsSetter(CountTo, countToProps)

export { countToProps }

export type CountToInstance = InstanceType<typeof CountTo>
export type { CountToProps, CountToSlots, CountToEmits, CountToExpose } from './props'
export const _CountToComponent: typeof CountTo = CountTo

export default CountTo
