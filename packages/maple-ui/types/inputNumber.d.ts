import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const inputNumberProps: Record<keyof InputNumberProps, any>

export type InputNumberMode = 'embed' | 'button'
export type InputNumberControlType = 'stacked' | 'split'
export type InputNumberModelEvent = 'change' | 'input'

export interface InputNumberProps extends BasicAttributes {
  modelValue?: number
  defaultValue?: number
  mode?: InputNumberMode
  controlType?: InputNumberControlType
  precision?: string | number
  step?: string | number
  disabled?: boolean
  error?: boolean
  max?: string | number
  min?: string | number
  formatter?: (value: number) => string | number
  parser?: (value: string) => string | number
  placeholder?: string
  controls?: boolean
  size?: string
  clearable?: boolean
  modelEvent?: InputNumberModelEvent
  readonly?: boolean
  inputAttrs?: Record<string, any>
  color?: string
  inputWidth?: string | number
  inputTextSize?: string | number
  buttonSize?: string | number
  elevation?: boolean | string | number
  decimalLength?: string | number
  disableIncrement?: boolean
  disableDecrement?: boolean
  disableInput?: boolean
  lazyChange?: boolean
  incrementButton?: boolean
  decrementButton?: boolean
  press?: boolean
  ripple?: boolean
  onBeforeChange?: ListenerProp<(value: number, change: (value: number) => void) => void>
  onChange?: ListenerProp<(value: number, event?: Event) => void>
  onInput?: ListenerProp<(value: number, inputValue: string, event: Event) => void>
  onFocus?: ListenerProp<(event: FocusEvent) => void>
  onBlur?: ListenerProp<(event: FocusEvent) => void>
  onClear?: ListenerProp<(event: Event) => void>
  onKeydown?: ListenerProp<(event: KeyboardEvent) => void>
  onIncrement?: ListenerProp<(value: number) => void>
  onDecrement?: ListenerProp<(value: number) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: number) => void>
}

export class InputNumber extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<InputNumberProps>

  $props: InputNumberProps

  $slots: {
    minus(): VNode[]
    plus(): VNode[]
    prepend(): VNode[]
    append(): VNode[]
    prefix(): VNode[]
    suffix(): VNode[]
  }
}

export class _InputNumberComponent extends InputNumber {}
