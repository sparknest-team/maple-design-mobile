import { VNode } from 'vue'
import { AllowedTime } from './timePicker'
import { BasicAttributes, Variant as DateVariant, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const dateProps: Record<keyof DateProps, any>

export type DateType = 'year' | 'month' | 'date'

export type DateSize = 'small' | 'normal'

export interface DateProps extends BasicAttributes {
  modelValue?: string | string[]
  show?: boolean
  type?: DateType
  presentation?: 'calendar' | 'picker' | 'calendarClock' | 'calendarPicker'
  showTime?: boolean
  useSeconds?: boolean
  multiple?: boolean
  min?: string
  max?: string
  allowedDates?: (val: string) => boolean
  allowedTime?: AllowedTime
  separator?: string
  datePickerProps?: Record<string, any>
  popupProps?: Record<string, any>
  variant?: DateVariant
  size?: DateSize
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
  onClear?: ListenerProp<(value: string | string[] | undefined) => void>
  onClose?: ListenerProp<(value: string | string[] | undefined) => void>
  onChange?: ListenerProp<(value: string | string[] | undefined) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: string | string[] | undefined) => void>
  'onUpdate:show'?: ListenerProp<(show: boolean) => void>
}

export interface DateArrowIconData {
  focus: boolean
  popupOpen: boolean
}

export interface DateClearIconData {
  clear: (e: Event) => void
}

export class Date extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<DateProps>

  $props: DateProps

  $slots: {
    selected(): VNode[]
    'prepend-icon'(): VNode[]
    'clear-icon'(data: DateClearIconData): VNode[]
    'append-icon'(): VNode[]
    'arrow-icon'(data: DateArrowIconData): VNode[]
  }

  focus(): void

  blur(): void
}

export class _DateComponent extends Date {}
