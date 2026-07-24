import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as timeRangeProps } from './props'
import TimeRange from './TimeRange.vue'

withInstall(TimeRange)
withPropsDefaultsSetter(TimeRange, timeRangeProps)

export type TimeRangeInstance = InstanceType<typeof TimeRange>
export type { TimeRangeProps, TimeRangePresentation } from './props'
export { timeRangeProps }

export const _TimeRangeComponent = TimeRange

export default TimeRange
