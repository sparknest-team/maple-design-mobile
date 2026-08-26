import { VNode } from 'vue'
import { DisabledTime, TimePickerFormat } from './timePicker'
import { TimeRangePickerPresentation } from './timeRangePicker'
import {
  BasicAttributes,
  ListenerProp,
  SetPropsDefaults,
  Variant as TimeRangeVariant,
  VarComponent,
} from './varComponent'

export declare const timeRangeProps: Record<keyof TimeRangeProps, any>

export type TimeRangeFormat = TimePickerFormat

export type TimeRangeSize = 'small' | 'normal'

export type TimeRangePresentation = TimeRangePickerPresentation

export type { DisabledTime }

export interface TimeRangeProps extends BasicAttributes {
  modelValue?: string[]
  open?: boolean
  presentation?: TimeRangePresentation
  format?: TimeRangeFormat
  useSeconds?: boolean
  min?: string
  max?: string
  disabledTime?: DisabledTime
  separator?: string
  timePickerProps?: Record<string, any>
  pickerProps?: Record<string, any>
  popupProps?: Record<string, any>
  timeRangePickerProps?: Record<string, any>
  variant?: TimeRangeVariant
  size?: TimeRangeSize
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
  'onUpdate:open'?: ListenerProp<(open: boolean) => void>
}

export interface TimeRangeArrowIconData {
  focus: boolean
  popupOpen: boolean
}

export interface TimeRangeClearIconData {
  clear: (e: Event) => void
}

export class TimeRange extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<TimeRangeProps>

  $props: TimeRangeProps

  $slots: {
    selected(): VNode[]
    prefix(): VNode[]
    'clear-icon'(data: TimeRangeClearIconData): VNode[]
    suffix(): VNode[]
    'arrow-icon'(data: TimeRangeArrowIconData): VNode[]
  }

  focus(): void

  blur(): void
}

export class _TimeRangeComponent extends TimeRange {}
