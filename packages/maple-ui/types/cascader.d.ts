import {
  BasicAttributes,
  Size as CascaderSize,
  Variant as CascaderVariant,
  ListenerProp,
  SetPropsDefaults,
  VarComponent,
} from './varComponent'

export declare const cascaderProps: Record<keyof CascaderProps, any>

export type CascaderPresentation = 'menu' | 'picker'

export type CascaderFieldNames = {
  label?: string
  value?: string
  children?: string
  disabled?: string
}

export interface CascaderOption {
  label?: string
  value?: any
  disabled?: boolean
  children?: CascaderOption[]

  [key: PropertyKey]: any
}

export interface CascaderProps extends BasicAttributes {
  modelValue?: any
  options?: CascaderOption[]
  presentation?: CascaderPresentation
  show?: boolean
  labelKey?: string
  valueKey?: string
  childrenKey?: string
  fieldNames?: CascaderFieldNames
  multiple?: boolean
  checkStrictly?: boolean
  pathMode?: boolean
  expandTrigger?: 'click' | 'hover'
  filterable?: boolean
  clearable?: boolean
  placeholder?: string
  size?: CascaderSize
  variant?: CascaderVariant
  line?: boolean
  hint?: boolean
  textColor?: string
  focusColor?: string
  blurColor?: string
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  tag?: boolean
  separator?: string
  closeOnSelect?: boolean
  pickerProps?: Record<string, any>
  popupProps?: Record<string, any>
  onFocus?: ListenerProp<() => void>
  onBlur?: ListenerProp<() => void>
  onClick?: ListenerProp<(e: Event) => void>
  onClear?: ListenerProp<(value: any) => void>
  onClose?: ListenerProp<(value: any) => void>
  onChange?: ListenerProp<(value: any) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: any) => void>
  'onUpdate:show'?: ListenerProp<(show: boolean) => void>
}

export interface CascaderArrowIconData {
  focus: boolean
  menuOpen: boolean
}

export interface CascaderClearIconData {
  clear: (e: Event) => void
}

export class Cascader extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<CascaderProps>

  $props: CascaderProps

  $slots: {
    selected(): import('vue').VNode[]
    option(data: { option: CascaderOption; active: boolean }): import('vue').VNode[]
    'prepend-icon'(): import('vue').VNode[]
    'clear-icon'(data: CascaderClearIconData): import('vue').VNode[]
    'append-icon'(): import('vue').VNode[]
    'arrow-icon'(data: CascaderArrowIconData): import('vue').VNode[]
  }

  focus(): void

  blur(): void
}

export class _CascaderComponent extends Cascader {}
