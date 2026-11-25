import { withInstall } from '../utils/components'
import { props as timePickerProps } from './picker-props'
import _Time from './presentation'
import { props as timeProps } from './props'
import TimePicker from './TimePicker.vue'

const Time: import('../utils/components').ComponentWithInstall<typeof _Time & { Picker: typeof TimePicker }> =
  withInstall(
    _Time,
    Object.assign(_Time, {
      Picker: TimePicker,
    }),
    { components: [_Time, TimePicker] },
  )

export { timeProps, timePickerProps, TimePicker, Time }

export type TimeInstance = InstanceType<typeof _Time> & import('./public-types').TimeExpose
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
export type TimePickerProps = import('../_utils/public-props').CompatiblePublicProps<
  typeof import('./picker-props').props
>
export type { TimeDisabledRules, TimeStep } from './time-rules'

export type { TimePickerField } from '../_components/picker-field/fields'

export type {
  TimeModelValue,
  TimeEmits,
  TimeReadScope,
  TimeSuffixIconScope,
  TimeActionsScope,
  TimeExpose,
} from './public-types'
export type { TimeSlots } from './slots'

export type { TimePickerEmits, TimePickerSlots } from './picker-contract'
