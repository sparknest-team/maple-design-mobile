import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const counterProps: Record<keyof CounterProps, any>

export interface CounterProps extends BasicAttributes {
  modelValue?: number
  min?: string | number
  max?: string | number
  step?: string | number
  color?: string
  inputWidth?: string | number
  inputTextSize?: string | number
  buttonSize?: string | number
  elevation?: boolean | string | number
  decimalLength?: string | number
  disabled?: boolean
  readonly?: boolean
  disableIncrement?: boolean
  disableDecrement?: boolean
  disableInput?: boolean
  lazyChange?: boolean
  incrementButton?: boolean
  decrementButton?: boolean
  press?: boolean
  ripple?: boolean
  onBeforeChange?: ListenerProp<(value: number, change: (value: number) => void) => void>
  onChange?: ListenerProp<(value: number) => void>
  onIncrement?: ListenerProp<(value: number) => void>
  onDecrement?: ListenerProp<(value: number) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: number) => void>
}

export class Counter extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<CounterProps>

  $props: CounterProps
}

export class _CounterComponent extends Counter {}
