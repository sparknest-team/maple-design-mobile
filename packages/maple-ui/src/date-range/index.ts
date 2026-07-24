import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import DateRange from './DateRange.vue'
import { props as dateRangeProps } from './props'

withInstall(DateRange)
withPropsDefaultsSetter(DateRange, dateRangeProps)

export type DateRangeInstance = InstanceType<typeof DateRange>
export type { DateRangeProps, DateRangeType, DateRangePresentation } from './props'
export { dateRangeProps }

export const _DateRangeComponent = DateRange

export default DateRange
