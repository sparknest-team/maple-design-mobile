import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const counterProps: Record<keyof CounterProps, any>

export interface CounterProps extends BasicAttributes {
  modelValue?: number
  defaultValue?: number
  min?: string | number
  max?: string | number
  step?: string | number
  precision?: string | number
  color?: string
  inputWidth?: string | number
  inputTextSize?: string | number
  buttonSize?: string | number
  elevation?: boolean | string | number
  decimalLength?: string | number
  disabled?: boolean
  error?: boolean
  readonly?: boolean
  placeholder?: string
  formatter?: (value: number) => string | number
  parser?: (value: string) => string | number
  inputAttrs?: Record<string, any>
  controls?: boolean
  modelEvent?: 'change' | 'input'
  disableIncrement?: boolean
  disableDecrement?: boolean
  disableInput?: boolean
  lazyChange?: boolean
  incrementButton?: boolean
  decrementButton?: boolean
  press?: boolean
  ripple?: boolean
  beforeChange?: ListenerProp<(value: number, change: (value: number) => void) => void>
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

export class Counter extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<CounterProps>

  $props: CounterProps
}

export class _CounterComponent extends Counter {}
