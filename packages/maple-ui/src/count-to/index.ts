import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import CountTo from './CountTo.vue'
import { countToProps } from './props'

withInstall(CountTo)
withPropsDefaultsSetter(CountTo, countToProps)

export { countToProps }

export type CountToInstance = InstanceType<typeof CountTo>
export type { CountToProps } from './props'
export const _CountToComponent: typeof CountTo = CountTo

export default CountTo
