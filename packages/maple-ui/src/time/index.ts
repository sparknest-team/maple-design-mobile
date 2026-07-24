import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as timeProps } from './props'
import Time from './Time.vue'

withInstall(Time)
withPropsDefaultsSetter(Time, timeProps)

export type TimeInstance = InstanceType<typeof Time>
export type { TimeProps } from './props'
export { timeProps }

export const _TimeComponent = Time

export default Time
