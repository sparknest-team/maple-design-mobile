import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export type NumberKeyboardTheme = 'default' | 'custom'

export declare const numberKeyboardProps: Record<keyof NumberKeyboardProps, any>

export interface NumberKeyboardProps extends BasicAttributes {
  modelValue?: string
  open?: boolean
  title?: string
  theme?: NumberKeyboardTheme
  maxLength?: number | string
  extraKey?: string | string[]
  closeButtonText?: string
  deleteButtonText?: string
  showDeleteKey?: boolean
  randomKeyOrder?: boolean
  hideOnClickOutside?: boolean
  mask?: boolean
  maskClass?: string
  maskStyle?: Record<string, any>
  lockScroll?: boolean
  maskClosable?: boolean
  escToClose?: boolean
  popupContainer?: string | object | false
  safeArea?: boolean
  onInput?: ListenerProp<(key: string) => void>
  onDelete?: ListenerProp<() => void>
  onBlur?: ListenerProp<() => void>
  onClose?: ListenerProp<() => void>
  onOpen?: ListenerProp<() => void>
  onOpened?: ListenerProp<() => void>
  onClosed?: ListenerProp<() => void>
  onKeyEscape?: ListenerProp<() => void>
  'onUpdate:modelValue'?: ListenerProp<(value: string) => void>
  'onUpdate:open'?: ListenerProp<(value: boolean) => void>
}

export class NumberKeyboard extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<NumberKeyboardProps>

  $props: NumberKeyboardProps
}

export class _NumberKeyboardComponent extends NumberKeyboard {}
