import type { App, AppContext } from 'vue'
import { defineComponent, h, nextTick, render, shallowReactive } from 'vue'
import { useFeedbackZIndex } from '../context/zIndex'
import { resolvePopupContainer } from '../utils/popup-container'
import { useVisualSurface } from '../utils/visual-surface'
import renderMessageRoot from './context-root'
import MessageComponentSource from './Message.vue'
import { messageProps } from './props'
import type {
  MessageContent,
  MessageMethod,
  MessageOptions,
  MessagePosition,
  MessageReturn,
  MessageStatus,
} from './types'

const baseOptions: MessageOptions = {
  variant: 'neutral',
  status: 'default',
  position: 'top',
  duration: 3000,
  showIcon: true,
  closable: false,
  pauseOnHover: false,
  resetOnUpdate: false,
  closeButtonAriaLabel: 'Close message',
}

let defaultOptions = baseOptions
let defaultAppContext: AppContext | null = null
let seed = 0
const managers = new Set<MessageManager>()

function contentSlot(content: MessageContent | undefined) {
  if (content == null) {
    return undefined
  }
  return () => (typeof content === 'function' ? content() : content)
}

interface QueueItem {
  id: string | number
  options: MessageOptions
  open: boolean
  appContext: AppContext | null
  key: symbol
  instance?: { restartTimer?: () => void } | null
}

class MessageManager {
  private readonly items = shallowReactive(new Map<string | number, QueueItem>())
  readonly host: HTMLElement
  readonly position: MessagePosition

  constructor(target: HTMLElement, position: MessagePosition, appContext?: AppContext) {
    this.position = position
    this.host = target.ownerDocument.createElement('div')
    target.appendChild(this.host)

    const Host = defineComponent({
      setup: () => {
        this.host.setAttribute('data-card-feedback-host', '')
        const zIndex = useFeedbackZIndex(() => target.ownerDocument)
        useVisualSurface(
          () => (this.items.size ? this.host : undefined),
          () => zIndex.value,
        )
        return () =>
          h(
            'div',
            {
              style: { '--mp-internal-message-z-index': zIndex.value },
              class: ['mp-message-list', `mp-message-list-${position}`],
            },
            Array.from(this.items.values(), (item) => {
              const { id, content, icon, action, ...componentProps } = item.options
              return renderMessageRoot(item.key, item.appContext, () =>
                h(
                  MessageComponentSource as any,
                  {
                    ...componentProps,
                    open: item.open,
                    ref: (instance: { restartTimer?: () => void } | null) => {
                      item.instance = instance
                    },
                    popupContainer: false,
                    'onUpdate:open': (open: boolean) => {
                      if (!open) {
                        this.close(item)
                      }
                    },

                    onClose: () => item.options.onClose?.(item.id),
                    onClosed: () => this.finishClose(item),
                  } as any,
                  {
                    default: contentSlot(content),
                    icon: contentSlot(icon),
                    action: contentSlot(action),
                  } as any,
                ),
              )
            }),
          )
      },
    })
    const vnode = h(Host)
    vnode.appContext = appContext ?? defaultAppContext
    render(vnode, this.host)
  }

  add(options: MessageOptions, appContext: AppContext | null): MessageReturn {
    let id = options.id
    if (id == null) {
      do {
        id = `__message_${++seed}`
      } while (this.items.has(id))
    }
    let item = this.items.get(id)
    if (item) {
      if (appContext && item.appContext !== appContext) {
        item.appContext = appContext
        item.key = Symbol('message')
      }
      item.options = { ...item.options, ...options }
      item.open = true
      if (item.options.resetOnUpdate) {
        const current = item
        nextTick(() => current.instance?.restartTimer?.())
      }
    } else {
      item = shallowReactive<QueueItem>({ id, options, open: true, appContext, key: Symbol('message') })
      this.items.set(id, item)
    }
    return this.handle(item)
  }

  private close(item: QueueItem) {
    if (!item.open) {
      return
    }
    item.open = false
    if (!item.instance) {
      this.finishClose(item)
    }
  }

  clear() {
    ;[...this.items.values()].forEach((item) => this.close(item))
  }

  private handle(item: QueueItem): MessageReturn {
    let closed = false
    return {
      close: () => {
        if (closed) {
          return
        }
        closed = true
        this.close(item)
      },
    }
  }

  private finishClose(item: QueueItem) {
    if (item.open || this.items.get(item.id) !== item) {
      return
    }
    this.items.delete(item.id)
    try {
      return item.options.onClosed?.(item.id)
    } finally {
      if (!this.items.size && managers.delete(this)) {
        render(null, this.host)
        this.host.remove()
      }
    }
  }
}

function resolveTarget(options: MessageOptions): HTMLElement | undefined {
  if (typeof document === 'undefined') {
    return undefined
  }
  const target = resolvePopupContainer(options.popupContainer)
  return typeof target === 'string' ? document.body : target
}

function findManager(target: HTMLElement, position: MessagePosition, appContext?: AppContext) {
  for (const manager of managers) {
    if (manager.host.parentElement === target && manager.position === position) {
      return manager
    }
  }
  const manager = new MessageManager(target, position, appContext)
  managers.add(manager)
  return manager
}

function normalizeOptions(options: MessageOptions | string = {}): MessageOptions {
  return typeof options === 'string' ? { content: options } : options
}

const Message = ((options: MessageOptions | string = {}, appContext?: AppContext) => {
  const resolved = { ...defaultOptions, ...normalizeOptions(options) }
  const target = resolveTarget(resolved)
  if (!target) {
    return { close: () => {} }
  }
  const context = appContext ?? defaultAppContext
  return findManager(target, resolved.position ?? 'top', context ?? undefined).add(resolved, context)
}) as MessageMethod

function createStatusMethod(status: MessageStatus) {
  return (options: MessageOptions | string, appContext?: AppContext) => {
    const resolved = { ...normalizeOptions(options), status }
    if (status === 'loading' && resolved.duration == null) {
      resolved.duration = 0
    }
    return Message(resolved, appContext)
  }
}

Message.info = createStatusMethod('info')
Message.success = createStatusMethod('success')
Message.warning = createStatusMethod('warning')
Message.error = createStatusMethod('danger')
Message.loading = createStatusMethod('loading')
Message.clear = (position?: MessagePosition) => {
  for (const manager of [...managers]) {
    if (!position || manager.position === position) {
      manager.clear()
    }
  }
}
Message.setDefaultOptions = (options: MessageOptions) => {
  defaultOptions = { ...baseOptions, ...options }
}
Message.resetDefaultOptions = () => {
  defaultOptions = baseOptions
}

const MessageComponent: typeof MessageComponentSource & { install: (app: App) => void } = Object.assign(
  MessageComponentSource,
  {
    install(app: App) {
      app.component(MessageComponentSource.name!, MessageComponentSource)
    },
  },
)
Message.Component = MessageComponent
Message.install = (app: App) => {
  defaultAppContext = app._context
  app.component(MessageComponentSource.name!, MessageComponentSource)
  app.config.globalProperties.$message = Message
}

export type {
  MessageVariant,
  MessageConfig,
  MessageContent,
  MessageItem,
  MessageMethod,
  MessageOptions,
  MessagePosition,
  MessageReturn,
  MessageStatus,
} from './types'
export type { MessageProps } from './props'
export { messageProps }
export const _MessageComponent: typeof MessageComponent = MessageComponent
export type MessageInstance = InstanceType<typeof MessageComponentSource>
export { Message }
export default Message
