import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as timePickerProps } from './picker-props'
import _Time from './presentation'
import { props as timeProps } from './props'
import TimePicker from './TimePicker.vue'

const Time = withInstall(
  _Time,
  Object.assign(_Time, {
    Picker: TimePicker,
  }),
  { components: [_Time, TimePicker] },
)

withPropsDefaultsSetter(Time, timeProps)
withPropsDefaultsSetter(TimePicker, timePickerProps)

export { timeProps, timePickerProps, TimePicker }

export type TimeInstance = InstanceType<typeof _Time>
export type TimePickerInstance = InstanceType<typeof TimePicker>
export type { TimeProps } from './props'
export type { TimeValue } from './time-value'
export type {
  TimePanelPresentationProps,
  TimePopupPresentationProps,
  TimeWheelPresentationProps,
} from './presentation-props'

export const _TimeComponent: typeof Time = Time
export const _TimePickerComponent: typeof TimePicker = TimePicker

export default Time
export type TimePickerProps = import('vue').ExtractPublicPropTypes<typeof import('./picker-props').props>
export type { TimeDisabledRules, TimeStep } from './time-rules'

export type { TimePickerField } from '../_components/picker-field/fields'
