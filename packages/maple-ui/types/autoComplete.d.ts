import { VNode, VNodeChild, type InputHTMLAttributes } from 'vue'
import {
  Variant as AutoCompleteVariant,
  BasicAttributes,
  ListenerProp,
  SetPropsDefaults,
  VarComponent,
} from './varComponent'

export declare const autoComponentProps: Record<keyof AutoCompleteProps, any>

export type AutoCompleteOptionLabelRender = (option: AutoCompleteOption, checked: boolean) => VNodeChild

export type AutoCompleteOptionLabel = string | VNode | AutoCompleteOptionLabelRender

export type AutoCompleteSize = 'small' | 'normal'

export interface AutoCompleteOption {
  label?: AutoCompleteOptionLabel
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export interface AutoCompleteProps extends BasicAttributes {
  modelValue?: string
  labelKey?: string
  valueKey?: string
  options?: AutoCompleteOption[]
  line?: boolean
  size?: AutoCompleteSize
  variant?: AutoCompleteVariant
  placeholder?: string
  hint?: boolean
  textColor?: string
  focusColor?: string
  blurColor?: string
  maxlength?: string | number
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  getShow?: (v: string) => boolean
  enterkeyhint?: InputHTMLAttributes['enterKeyHint']
  onFocus?: ListenerProp<() => void>
  onBlur?: ListenerProp<() => void>
  onClick?: ListenerProp<(e: Event) => void>
  onClear?: ListenerProp<(value: string) => void>
  onChange?: ListenerProp<(value: string, e: Event) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: string) => void>
}

export interface AutoCompleteClearIconData {
  clear: (e: Event) => void
}

export class AutoComplete extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<AutoCompleteProps>

  $props: AutoCompleteProps

  $slots: {
    prefix(): VNode[]
    suffix(): VNode[]
    'clear-icon'(data: AutoCompleteClearIconData): VNode[]
  }

  focus(): void

  blur(): void
}

export class _AutoCompleteComponent extends AutoComplete {}
