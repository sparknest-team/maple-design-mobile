import type { App, AppContext } from 'vue'
import { createVNode, defineComponent, h, nextTick, render, shallowReactive } from 'vue'
import { useFeedbackZIndex } from '../context/zIndex'
import { resolvePopupContainer } from '../utils/popup-container'
import { useVisualSurface } from '../utils/visual-surface'
import MessageContextRoot from './context-root'
import MessageComponentSource from './Message.vue'
import { messageProps } from './props'
import type {
  MessageContent,
  MessageItem,
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

let defaultOptions = { ...baseOptions }
let defaultAppContext: AppContext | null = null
let seed = 0
const managers = new Set<MessageManager>()

function renderContent(content: MessageContent | undefined): import('vue').VNodeChild {
  return typeof content === 'function' ? content() : content
}

class MessageManager {
  // Keep Vue content/VNodes intact while tracking queue and item field updates.
  readonly items = shallowReactive<MessageItem[]>([])
  readonly host: HTMLElement
  readonly position: MessagePosition
  private readonly contexts = new WeakMap<MessageItem, { appContext: AppContext | null; key: symbol }>()
  private destroyed = false
  private readonly instances = new Map<string | number, { restartTimer?: () => void }>()

  constructor(target: HTMLElement, position: MessagePosition, appContext?: AppContext) {
    this.position = position
    this.host = target.ownerDocument.createElement('div')
    target.appendChild(this.host)

    const Host = defineComponent({
      setup: () => {
        this.host.setAttribute('data-card-feedback-host', '')
        const zIndex = useFeedbackZIndex(() => target.ownerDocument)
        useVisualSurface(
          () => (this.items.length ? this.host : undefined),
          () => zIndex.value,
        )
        return () =>
          h(
            'div',
            {
              style: { '--mp-internal-message-z-index': zIndex.value },
              class: ['mp-message-list', `mp-message-list-${position}`],
            },
            this.items.map((item) => {
              const { id, revision, content, icon, action, onOpen, onOpened, onClose, onClosed, ...componentProps } =
                item
              void revision
              void onClosed
              return h(MessageContextRoot, {
                key: this.contexts.get(item)!.key,
                appContext: this.contexts.get(item)!.appContext,
                renderVNode: () =>
                  h(
                    MessageComponentSource as any,
                    {
                      ...componentProps,
                      key: id,
                      ref: (instance: { restartTimer?: () => void } | null) => {
                        if (instance) {
                          this.instances.set(id, instance)
                        } else {
                          this.instances.delete(id)
                        }
                      },
                      popupContainer: false,
                      'onUpdate:open': (open: boolean) => {
                        if (!open) {
                          this.close(item)
                        }
                      },
                      onOpen,
                      onOpened,
                      onClose: () => onClose?.(item.id),
                      onClosed: () => this.finishClose(item),
                    } as any,
                    {
                      default: () => renderContent(content),
                      icon: icon == null ? undefined : () => renderContent(icon),
                      action: action == null ? undefined : () => renderContent(action),
                    } as any,
                  ),
              })
            }),
          )
      },
    })
    const vnode = createVNode(Host)
    vnode.appContext = appContext ?? defaultAppContext
    render(vnode, this.host)
  }

  add(options: MessageOptions, appContext: AppContext | null): MessageReturn {
    const id = options.id ?? `__message_${++seed}`
    const existing = this.items.find((item) => item.id === id)
    if (existing) {
      if (appContext && this.contexts.get(existing)?.appContext !== appContext) {
        this.contexts.set(existing, { appContext, key: Symbol('message-render-scope') })
      }
      Object.assign(existing, options, { id, open: true, revision: existing.revision + 1 })
      if (existing.resetOnUpdate) {
        nextTick(() => {
          if (this.items.includes(existing)) {
            this.instances.get(id)?.restartTimer?.()
          }
        })
      }
      return this.handle(existing)
    }
    const item = shallowReactive({ ...options, id, open: true, revision: 0 }) as MessageItem
    this.contexts.set(item, { appContext, key: Symbol('message-render-scope') })
    this.items.push(item)
    return this.handle(item)
  }

  private close(item: MessageItem) {
    if (!item.open || !this.items.includes(item)) {
      return
    }
    item.open = false
    if (!this.instances.has(item.id)) {
      this.finishClose(item)
    }
  }

  clear() {
    ;[...this.items].forEach((item) => this.close(item))
  }

  private handle(item: MessageItem): MessageReturn {
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

  private finishClose(item: MessageItem) {
    if (item.open) {
      return
    }
    const index = this.items.indexOf(item)
    if (index < 0) {
      return
    }
    this.items.splice(index, 1)
    this.contexts.delete(item)
    try {
      return item.onClosed?.(item.id)
    } finally {
      this.destroyIfEmpty()
    }
  }

  private destroyIfEmpty() {
    if (this.items.length || this.destroyed) {
      return
    }
    this.destroyed = true
    render(null, this.host)
    this.host.remove()
    managers.delete(this)
  }
}

function resolveTarget(options: MessageOptions): HTMLElement | undefined {
  if (typeof document === 'undefined') {
    return undefined
  }
  const target = resolvePopupContainer(options.popupContainer)
  return typeof target === 'string' ? (document.querySelector<HTMLElement>(target) ?? document.body) : target
}

function findManager(target: HTMLElement, position: MessagePosition, appContext?: AppContext) {
  const existing = [...managers].find(
    (manager) => manager.host.parentElement === target && manager.position === position,
  )
  if (existing) {
    return existing
  }
  const manager = new MessageManager(target, position, appContext)
  managers.add(manager)
  return manager
}

function normalizeOptions(options: MessageOptions | string = {}): MessageOptions {
  return typeof options === 'string' ? { content: options } : { ...options }
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

function createStatusMethod(status: MessageStatus, loading = false) {
  return (options: MessageOptions | string, appContext?: AppContext) => {
    const resolved = { ...normalizeOptions(options), status }
    if (loading && resolved.duration == null) {
      resolved.duration = 0
    }
    return Message(resolved, appContext)
  }
}

Message.info = createStatusMethod('info')
Message.success = createStatusMethod('success')
Message.warning = createStatusMethod('warning')
Message.error = createStatusMethod('danger')
Message.loading = createStatusMethod('loading', true)
Message.clear = (position?: MessagePosition) => {
  ;[...managers].filter((manager) => !position || manager.position === position).forEach((manager) => manager.clear())
}
Message.setDefaultOptions = (options: MessageOptions) => {
  defaultOptions = { ...baseOptions, ...options }
}
Message.resetDefaultOptions = () => {
  defaultOptions = { ...baseOptions }
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
