import type { InputHTMLAttributes, VNode } from 'vue'
import type { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent, Variant } from './varComponent'

export declare const textareaProps: Record<keyof TextareaProps, any>

export interface TextareaProps extends BasicAttributes {
  modelValue?: string
  modelModifiers?: { trim?: boolean }
  rows?: string | number
  maxLength?: string | number
  readonly?: boolean
  resize?: boolean
  autofocus?: boolean
  ariaLabel?: string
  enterkeyhint?: InputHTMLAttributes['enterKeyHint']
  textareaAttrs?: Record<string, any>
  size?: 'small' | 'normal'
  variant?: Variant
  placeholder?: string
  line?: boolean
  hint?: boolean
  textColor?: string
  focusColor?: string
  blurColor?: string
  disabled?: boolean
  clearable?: boolean
  onFocus?: ListenerProp<(e: FocusEvent) => void>
  onBlur?: ListenerProp<(e: FocusEvent) => void>
  onInput?: ListenerProp<(value: string, e: Event) => void>
  onChange?: ListenerProp<(value: string, e: Event) => void>
  onKeydown?: ListenerProp<(e: KeyboardEvent) => void>
  onClear?: ListenerProp<(value: string) => void>
  onClick?: ListenerProp<(e: Event) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: string) => void>
}

export interface TextareaClearIconData {
  clear: (e: Event) => void
}

export class Textarea extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<TextareaProps>
  $props: TextareaProps
  $slots: {
    suffix(): VNode[]
    'clear-icon'(data: TextareaClearIconData): VNode[]
  }
  focus(): void
  blur(): void
}

export class _TextareaComponent extends Textarea {}
