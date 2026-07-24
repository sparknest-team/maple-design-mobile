import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, Variant as SelectVariant, SetPropsDefaults, VarComponent } from './varComponent'

export declare const selectProps: Record<keyof SelectProps, any>

export type SelectPresentation = 'menu' | 'picker'

export type SelectTextAlign = 'left' | 'right' | 'center'

export type SelectFieldNames = {
  label?: string
  value?: string
  children?: string
  disabled?: string
}

export type SelectSize = 'small' | 'normal'

export type SelectOptionLabelRender = (option: SelectOption, checked: boolean) => VNodeChild

export type SelectOptionLabel = string | VNode | SelectOptionLabelRender

export interface SelectOption {
  label?: SelectOptionLabel
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export interface SelectProps extends BasicAttributes {
  modelValue?: any
  options?: SelectOption[]
  labelKey?: string
  valueKey?: string
  presentation?: SelectPresentation
  show?: boolean
  fieldNames?: SelectFieldNames
  pickerProps?: Record<string, any>
  popupProps?: Record<string, any>
  variant?: SelectVariant
  size?: SelectSize
  placeholder?: string
  multiple?: boolean
  offsetY?: number | string
  tag?: boolean
  line?: boolean
  hint?: boolean
  textColor?: string
  focusColor?: string
  blurColor?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  separator?: string
  textAlign?: SelectTextAlign
  onFocus?: ListenerProp<(e: Event) => void>
  onBlur?: ListenerProp<(e: Event) => void>
  onClick?: ListenerProp<(e: Event) => void>
  onClear?: ListenerProp<(value: any) => void>
  onClose?: ListenerProp<(value: any) => void>
  onChange?: ListenerProp<(value: any) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: any) => void>
  'onUpdate:show'?: ListenerProp<(show: boolean) => void>
}

export interface SelectArrowIconData {
  focus: boolean
  menuOpen: boolean
}

export interface SelectClearIconData {
  clear: (e: Event) => void
}

export class Select extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<SelectProps>

  $props: SelectProps

  $slots: {
    selected(): VNode[]
    'prepend-icon'(): VNode[]
    'clear-icon'(data: SelectClearIconData): VNode[]
    'append-icon'(): VNode[]
    'arrow-icon'(data: SelectArrowIconData): VNode[]
  }

  focus(): void

  blur(): void
}

export class _SelectComponent extends Select {}
