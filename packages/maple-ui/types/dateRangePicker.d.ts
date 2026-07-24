import { VNode } from 'vue'
import { DatePickerType } from './datePicker'
import { AllowedTime } from './timePicker'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const dateRangePickerProps: Record<keyof DateRangePickerProps, any>

export type DateRangePickerType = DatePickerType

export type DateRangePickerPresentation = 'calendar' | 'picker' | 'calendarClock' | 'calendarPicker'

export interface DateRangePickerProps extends BasicAttributes {
  modelValue?: string[]
  presentation?: DateRangePickerPresentation
  type?: DateRangePickerType
  showTime?: boolean
  useSeconds?: boolean
  min?: string
  max?: string
  allowedDates?: (val: string) => boolean
  allowedTime?: AllowedTime
  datePickerProps?: Record<string, any>
  pickerProps?: Record<string, any>
  timePickerProps?: Record<string, any>
  readonly?: boolean
  elevation?: boolean | string | number
  onChange?: ListenerProp<(value: string[]) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: string[]) => void>
}

export class DateRangePicker extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<DateRangePickerProps>

  $props: DateRangePickerProps

  $slots: {
    actions(): VNode[]
  }
}

export class _DateRangePickerComponent extends DateRangePicker {}
