import { withInstall } from '../utils/components'
import { props as timeRangePickerProps } from './picker-props'
import _TimeRange from './presentation'
import { props as timeRangeProps } from './props'
import TimeRangePicker from './TimeRangePicker.vue'

const TimeRange: import('../utils/components').ComponentWithInstall<
  typeof _TimeRange & { Picker: typeof TimeRangePicker }
> = withInstall(
  _TimeRange,
  Object.assign(_TimeRange, {
    Picker: TimeRangePicker,
  }),
  { components: [_TimeRange, TimeRangePicker] },
)

export { timeRangeProps, timeRangePickerProps, TimeRangePicker, TimeRange }

export type TimeRangeInstance = InstanceType<typeof _TimeRange> & import('../time/public-types').TimeRangeExpose
export type TimeRangePickerInstance = InstanceType<typeof TimeRangePicker>
export type { TimeRangeProps, TimeRangeEditMode } from './props'
export type { TimeRangePickerProps, TimeRangePickerPresentation } from './picker-props'

export const _TimeRangeComponent: typeof TimeRange = TimeRange
export const _TimeRangePickerComponent: typeof TimeRangePicker = TimeRangePicker

export default TimeRange

export type { TimePickerField } from '../_components/picker-field/fields'

export type {
  TimeRangeModelValue,
  TimeRangeEmits,
  TimeRangeReadScope,
  TimeRangeActionsScope,
  TimeRangeExpose,
} from '../time/public-types'
export type { TimeRangeSlots } from './slots'

export type { TimeRangePickerEmits, TimeRangePickerSlots } from '../time/picker-contract'

export type { RangeInputAttributes } from '../_components/picker-field/props'
