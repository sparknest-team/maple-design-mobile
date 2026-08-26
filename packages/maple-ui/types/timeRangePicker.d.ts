import { VNode } from 'vue'
import { DisabledTime, TimePickerFormat } from './timePicker'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const timeRangePickerProps: Record<keyof TimeRangePickerProps, any>

export type TimeRangePickerPresentation = 'clock' | 'picker'

export interface TimeRangePickerProps extends BasicAttributes {
  modelValue?: string[]
  presentation?: TimeRangePickerPresentation
  format?: TimePickerFormat
  useSeconds?: boolean
  min?: string
  max?: string
  disabledTime?: DisabledTime
  timePickerProps?: Record<string, any>
  pickerProps?: Record<string, any>
  readonly?: boolean
  elevation?: boolean | string | number
  onChange?: ListenerProp<(value: string[]) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: string[]) => void>
}

export class TimeRangePicker extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<TimeRangePickerProps>

  $props: TimeRangePickerProps

  $slots: {
    actions(): VNode[]
  }
}

export class _TimeRangePickerComponent extends TimeRangePicker {}
