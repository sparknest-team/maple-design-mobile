import { VNode, VNodeChild } from 'vue'
import {
  BasicAttributes,
  ListenerProp,
  Direction as RadioGroupDirection,
  SetPropsDefaults,
  VarComponent,
} from './varComponent'

export declare const radioGroupProps: Record<keyof RadioGroupProps, any>

export type RadioGroupOptionLabelRender = (option: RadioGroupOption, checked: boolean) => VNodeChild

export interface RadioGroupOption {
  label?: string | VNode | RadioGroupOptionLabelRender
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export { RadioGroupDirection }

export interface RadioGroupProps extends BasicAttributes {
  modelValue?: any
  direction?: RadioGroupDirection
  options?: RadioGroupOption[]
  ariaLabel?: string
  labelKey?: string
  valueKey?: string
  onChange?: ListenerProp<(value: any) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: any) => void>
}

export class RadioGroup extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<RadioGroupProps>

  $props: RadioGroupProps

  $slots: {
    default(): VNode[]
  }
}

export class _RadioGroupComponent extends RadioGroup {}
