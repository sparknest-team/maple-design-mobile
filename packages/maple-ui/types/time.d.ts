import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, Variant as TimeVariant, VarComponent } from './varComponent'

export declare const timeProps: Record<keyof TimeProps, any>

export type TimeFormat = 'ampm' | '24hr'

export type TimeSize = 'small' | 'normal'

export type DisabledTime = {
  hours?: (hour: number) => boolean
  minutes?: (minute: number) => boolean
  seconds?: (second: number) => boolean
}

export interface TimeProps extends BasicAttributes {
  modelValue?: string
  open?: boolean
  format?: TimeFormat
  useSeconds?: boolean
  min?: string
  max?: string
  disabledTime?: DisabledTime
  timePickerProps?: Record<string, any>
  popupProps?: Record<string, any>
  variant?: TimeVariant
  size?: TimeSize
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
  onClear?: ListenerProp<(value: string | undefined) => void>
  onClose?: ListenerProp<(value: string | undefined) => void>
  onChange?: ListenerProp<(value: string | undefined) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: string | undefined) => void>
  'onUpdate:open'?: ListenerProp<(open: boolean) => void>
}

export interface TimeArrowIconData {
  focus: boolean
  popupOpen: boolean
}

export interface TimeClearIconData {
  clear: (e: Event) => void
}

export class Time extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<TimeProps>

  $props: TimeProps

  $slots: {
    selected(): VNode[]
    prefix(): VNode[]
    'clear-icon'(data: TimeClearIconData): VNode[]
    suffix(): VNode[]
    'arrow-icon'(data: TimeArrowIconData): VNode[]
  }

  focus(): void

  blur(): void
}

export class _TimeComponent extends Time {}
