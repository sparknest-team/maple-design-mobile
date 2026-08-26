import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import CountTo from './CountTo.vue'
import { props as countToProps } from './props'

withInstall(CountTo)
withPropsDefaultsSetter(CountTo, countToProps)

export { countToProps }

export type CountToInstance = InstanceType<typeof CountTo>
export const _CountToComponent = CountTo

export default CountTo
