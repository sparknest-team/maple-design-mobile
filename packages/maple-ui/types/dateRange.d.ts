import { VNode } from 'vue'
import { DatePickerType } from './datePicker'
import { DateRangePickerPresentation } from './dateRangePicker'
import { AllowedTime } from './timePicker'
import {
  BasicAttributes,
  Variant as DateRangeVariant,
  ListenerProp,
  SetPropsDefaults,
  VarComponent,
} from './varComponent'

export declare const dateRangeProps: Record<keyof DateRangeProps, any>

export type DateRangeType = DatePickerType

export type DateRangePresentation = DateRangePickerPresentation

export type DateRangeSize = 'small' | 'normal'

export interface DateRangeProps extends BasicAttributes {
  modelValue?: string[]
  show?: boolean
  presentation?: DateRangePresentation
  type?: DateRangeType
  showTime?: boolean
  useSeconds?: boolean
  min?: string
  max?: string
  allowedDates?: (val: string) => boolean
  allowedTime?: AllowedTime
  separator?: string
  datePickerProps?: Record<string, any>
  pickerProps?: Record<string, any>
  timePickerProps?: Record<string, any>
  popupProps?: Record<string, any>
  dateRangePickerProps?: Record<string, any>
  variant?: DateRangeVariant
  size?: DateRangeSize
  placeholder?: string
  line?: boolean
  hint?: boolean
  textColor?: string
  focusColor?: string
  blurColor?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  onFocus?: ListenerProp<() => void>
  onBlur?: ListenerProp<() => void>
  onClick?: ListenerProp<(e: Event) => void>
  onClear?: ListenerProp<(value: string[]) => void>
  onClose?: ListenerProp<(value: string[]) => void>
  onChange?: ListenerProp<(value: string[]) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: string[]) => void>
  'onUpdate:show'?: ListenerProp<(show: boolean) => void>
}

export interface DateRangeArrowIconData {
  focus: boolean
  popupOpen: boolean
}

export interface DateRangeClearIconData {
  clear: (e: Event) => void
}

export class DateRange extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<DateRangeProps>

  $props: DateRangeProps

  $slots: {
    selected(): VNode[]
    'prepend-icon'(): VNode[]
    'clear-icon'(data: DateRangeClearIconData): VNode[]
    'append-icon'(): VNode[]
    'arrow-icon'(data: DateRangeArrowIconData): VNode[]
  }

  focus(): void

  blur(): void
}

export class _DateRangeComponent extends DateRange {}
