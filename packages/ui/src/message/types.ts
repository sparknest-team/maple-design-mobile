import type { App, AppContext, VNodeChild } from 'vue'
import type { PopupContainer } from '../utils/popup-container'
import type MessageComponentSource from './Message.vue'

export const messageStatuses = ['default', 'info', 'success', 'warning', 'danger', 'loading'] as const
export type MessageStatus = (typeof messageStatuses)[number]

export const messageVariants = ['neutral', 'tonal', 'solid'] as const
export type MessageVariant = (typeof messageVariants)[number]

export const messagePositions = ['top', 'center', 'bottom'] as const
export type MessagePosition = (typeof messagePositions)[number]

export type MessageContent = VNodeChild | (() => VNodeChild)

export interface MessageOptions {
  id?: string | number
  variant?: MessageVariant
  status?: MessageStatus
  content?: MessageContent
  icon?: MessageContent
  action?: MessageContent
  position?: MessagePosition
  duration?: number
  showIcon?: boolean
  closable?: boolean
  pauseOnHover?: boolean
  resetOnUpdate?: boolean
  closeButtonAriaLabel?: string
  popupContainer?: PopupContainer
  open?: boolean
  onOpen?: () => void
  onOpened?: () => void
  onClose?: (id: string | number) => void
  onClosed?: (id: string | number) => void
}

export type MessageConfig = MessageOptions

export interface MessageReturn {
  close: () => void
}

export interface MessageMethod {
  (options?: MessageOptions | string, appContext?: AppContext): MessageReturn
  info: (options: MessageOptions | string, appContext?: AppContext) => MessageReturn
  success: (options: MessageOptions | string, appContext?: AppContext) => MessageReturn
  warning: (options: MessageOptions | string, appContext?: AppContext) => MessageReturn
  error: (options: MessageOptions | string, appContext?: AppContext) => MessageReturn
  loading: (options: MessageOptions | string, appContext?: AppContext) => MessageReturn
  clear: (position?: MessagePosition) => void
  setDefaultOptions: (options: MessageOptions) => void
  resetDefaultOptions: () => void
  install: (app: App) => void
  Component: typeof MessageComponentSource & { install: (app: App) => void }
}

export interface MessageItem extends MessageOptions {
  id: string | number
  open: boolean
  revision: number
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: MessageMethod
  }
}
