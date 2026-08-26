import { VNode, VNodeChild } from 'vue'
import {
  BasicAttributes,
  Direction as CheckboxGroupDirection,
  ListenerProp,
  SetPropsDefaults,
  VarComponent,
} from './varComponent'

export declare const checkboxGroupProps: Record<keyof CheckboxGroupProps, any>

export type CheckboxGroupOptionLabelRender = (option: CheckboxGroupOption, checked: boolean) => VNodeChild

export interface CheckboxGroupOption {
  label?: string | VNode | CheckboxGroupOptionLabelRender
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export { CheckboxGroupDirection }

export interface CheckboxGroupProps extends BasicAttributes {
  modelValue?: any[]
  max?: string | number
  fieldNames?: {
    label?: string
    value?: string
    children?: string
    disabled?: string
  }
  options?: CheckboxGroupOption[]
  direction?: CheckboxGroupDirection
  onChange?: ListenerProp<(value: Array<any>) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: Array<any>) => void>
}

export class CheckboxGroup extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<CheckboxGroupProps>

  $props: CheckboxGroupProps

  $slots: {
    default(): VNode[]
  }

  checkAll(): any[]

  inverseAll(): any[]
}

export class _CheckboxGroupComponent extends CheckboxGroup {}
