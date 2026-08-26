import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const switchProps: Record<keyof SwitchProps, any>

export interface SwitchProps extends BasicAttributes {
  modelValue?: any
  checkedValue?: any
  uncheckedValue?: any
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  ripple?: boolean
  handleElevation?: boolean | string | number
  checkedColor?: string
  loadingColor?: string
  uncheckedColor?: string
  size?: string | number
  lazyChange?: boolean
  variant?: 'standard' | 'md3'
  onClick?: ListenerProp<(event: Event) => void>
  onChange?: ListenerProp<(value: any) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: any) => void>
  beforeChange?: ListenerProp<(value: any, change: (value: any) => void) => void>
}

export class Switch extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<SwitchProps>

  $props: SwitchProps
}

export class _SwitchComponent extends Switch {}
