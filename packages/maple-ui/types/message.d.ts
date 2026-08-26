import { App, TeleportProps, VNode } from 'vue'
import { LoadingSize, LoadingType } from './loading'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export type MessagePosition = 'top' | 'center' | 'bottom'

export type MessageType = 'success' | 'warning' | 'info' | 'error' | 'loading' | 'normal'

export declare const messageProps: Record<keyof MessageProps, any>

export interface MessageProps extends BasicAttributes {
  type?: MessageType
  content?: string
  position?: MessagePosition
  loadingType?: LoadingType
  loadingSize?: LoadingSize
  loadingColor?: string
  loadingRadius?: string | number
  popupContainer?: TeleportProps['to'] | false
  lockScroll?: boolean
  contentClass?: string
  duration?: number
  elevation?: boolean | string | number
  vertical?: boolean
  open?: boolean
  forbidClick?: boolean
  showIcon?: boolean
  closable?: boolean
  onOpen?: ListenerProp<() => void>
  onClose?: ListenerProp<(id?: string | number) => void>
  onOpened?: ListenerProp<() => void>
  onClosed?: ListenerProp<() => void>
  'onUpdate:open'?: ListenerProp<(open: boolean) => void>
}

export class MessageComponent extends VarComponent {
  $props: MessageProps

  $slots: {
    default(): VNode[]
    icon(): VNode[]
    action(): VNode[]
  }
}

export interface MessageReturn {
  close: () => void
}

export interface MessageOptions {
  id?: string | number
  type?: MessageType
  position?: MessagePosition
  content?: string | VNode | (() => VNode)
  icon?: string | VNode | (() => VNode)
  action?: string | VNode | (() => VNode)
  duration?: number
  elevation?: boolean | string | number
  contentClass?: string
  vertical?: boolean
  loadingType?: string
  loadingSize?: string
  loadingColor?: string
  loadingRadius?: string
  lockScroll?: boolean
  forbidClick?: boolean
  showIcon?: boolean
  closable?: boolean
  onOpen?: () => void
  onClose?: (id?: string | number) => void
  onOpened?: () => void
  onClosed?: () => void
}

export interface IMessage {
  (options?: MessageOptions | string): MessageReturn

  Component: typeof MessageComponent

  install(app: App): void

  setPropsDefaults: SetPropsDefaults<MessageProps>

  success(options: MessageOptions | string): MessageReturn

  warning(options: MessageOptions | string): MessageReturn

  info(options: MessageOptions | string): MessageReturn

  error(options: MessageOptions | string): MessageReturn

  loading(options: MessageOptions | string): MessageReturn

  normal(options: MessageOptions | string): MessageReturn

  setDefaultOptions(options: MessageOptions): void

  resetDefaultOptions(): void

  clear(position?: MessagePosition): void
}

export declare const Message: IMessage

export class _MessageComponent extends MessageComponent {}
