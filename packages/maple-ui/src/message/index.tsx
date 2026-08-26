import type { App, Component, TeleportProps, VNode } from 'vue'
import { reactive, TransitionGroup } from 'vue'
import { call, isFunction, isPlainObject, isString } from '@maplejs/maple-shared'
import context from '../context'
import type { LoadingSize, LoadingType } from '../loading/props'
import { mountInstance, withInstall, withPropsDefaultsSetter } from '../utils/components'
import VarMessageCore from './core.vue'
import VarMessage from './Message.vue'
import { props as messageProps } from './props'

export type MessageType = 'success' | 'warning' | 'info' | 'error' | 'loading' | 'normal'

export const MESSAGE_TYPE: Array<MessageType> = ['loading', 'success', 'warning', 'info', 'error', 'normal']

export type SlotType = string | VNode | (() => VNode)

export type MessagePosition = 'top' | 'center' | 'bottom'

export interface MessageReturn {
  close: () => void
}

export interface MessageOptions {
  id?: string | number
  type?: MessageType
  content?: SlotType
  icon?: SlotType
  action?: SlotType
  position?: MessagePosition
  loadingType?: LoadingType
  loadingSize?: LoadingSize
  lockScroll?: boolean
  contentClass?: string
  duration?: number
  elevation?: boolean | string | number
  vertical?: boolean
  forbidClick?: boolean
  showIcon?: boolean
  closable?: boolean
  onOpen?: () => void
  onClose?: (id?: string | number) => void
  onOpened?: () => void
  onClosed?: () => void
  // internal
  popupContainer?: TeleportProps['to']
  open?: boolean
}

interface UniqMessageOptions {
  id: string | number
  reactiveMessageOptions: MessageOptions
  _update?: string
}

interface Message {
  (options?: MessageOptions | string): MessageReturn

  install(app: App): void

  success(options: MessageOptions | string): MessageReturn

  warning(options: MessageOptions | string): MessageReturn

  info(options: MessageOptions | string): MessageReturn

  error(options: MessageOptions | string): MessageReturn

  loading(options: MessageOptions | string): MessageReturn

  normal(options: MessageOptions | string): MessageReturn

  clear(position?: MessagePosition): void

  setDefaultOptions(options: MessageOptions): void

  resetDefaultOptions(): void

  Component: Component
}

let sid = 0
let isMount = false
let unmount: () => void

const defaultOptionsValue: MessageOptions = {
  type: undefined,
  content: '',
  icon: '',
  action: '',
  position: 'top',
  duration: 3000,
  elevation: true,
  vertical: false,
  contentClass: undefined,
  loadingType: 'circle',
  loadingSize: 'normal',
  lockScroll: false,
  popupContainer: 'body',
  forbidClick: false,
  showIcon: true,
  closable: false,
  onOpen: () => {},
  onOpened: () => {},
  onClose: () => {},
  onClosed: () => {},
}

const uniqMessageOptions: Array<UniqMessageOptions> = reactive<UniqMessageOptions[]>([])

let defaultOptions: MessageOptions = { ...defaultOptionsValue }

const closedCallbacks = new Map<string | number, () => void>()

const transitionGroupProps: any = {
  name: 'mp-message-fade',
  tag: 'div',
  class: 'mp-message-group',
}

const getSlotValue = (value?: SlotType) => () => (isFunction(value) ? value() : value)

function removeById(id: string | number) {
  const index = uniqMessageOptions.findIndex((option) => option.id === id)
  if (index === -1) {
    return
  }

  const [option] = uniqMessageOptions.splice(index, 1)
  closedCallbacks.set(String(id), () => call(option.reactiveMessageOptions.onClosed))
  call(option.reactiveMessageOptions.onClose, id)
}

function closeById(id: string | number) {
  removeById(id)
}

const TransitionGroupHost = {
  setup() {
    return () => {
      const messageList = uniqMessageOptions.map(({ id, reactiveMessageOptions, _update }: UniqMessageOptions) => {
        const transitionGroupEl = document.querySelector('.mp-message-group')
        if (reactiveMessageOptions.forbidClick || reactiveMessageOptions.type === 'loading') {
          ;(transitionGroupEl as HTMLElement)?.classList.add('mp-pointer-auto')
        } else {
          ;(transitionGroupEl as HTMLElement)?.classList.remove('mp-pointer-auto')
        }

        const style = {
          position: 'relative' as const,
          ...getTop(reactiveMessageOptions.position),
        }

        const { content, icon, action } = reactiveMessageOptions

        const slots = {
          default: getSlotValue(content),
          icon: getSlotValue(icon),
          action: getSlotValue(action),
        }

        return (
          <VarMessageCore
            {...reactiveMessageOptions}
            key={id}
            style={style}
            data-id={id}
            _update={_update}
            open={true}
            onUpdate:open={(value: boolean) => {
              if (!value) {
                closeById(id)
              }
            }}
            v-slots={slots}
          />
        )
      })

      return (
        <TransitionGroup
          {...transitionGroupProps}
          style={{ zIndex: context.zIndex }}
          onAfterEnter={opened}
          onAfterLeave={afterLeave}
        >
          {messageList}
        </TransitionGroup>
      )
    }
  },
}

function resolveDuration(type: MessageType | undefined, duration: number | undefined) {
  if (duration != null) {
    return duration
  }

  return type === 'loading' ? 0 : (defaultOptionsValue.duration as number)
}

const Message: Message = function (options?: MessageOptions | string): MessageReturn {
  const messageOptions: MessageOptions = normalizeOptions(options)
  const id = messageOptions.id ?? `__mp_message_${++sid}`

  const existing = uniqMessageOptions.find((option) => option.id === id)
  if (existing) {
    return updateMessage(id, messageOptions)
  }

  const reactiveMessageOptions: MessageOptions = reactive<MessageOptions>({
    ...defaultOptions,
    ...messageOptions,
    id,
    duration: resolveDuration(
      messageOptions.type ?? defaultOptions.type,
      messageOptions.duration ?? defaultOptions.duration,
    ),
  })

  if (!isMount) {
    isMount = true
    unmount = mountInstance(TransitionGroupHost).unmountInstance
  }

  addUniqOption({
    id,
    reactiveMessageOptions,
  })

  return {
    close() {
      closeById(id)
    },
  }
} as Message

MESSAGE_TYPE.forEach((type) => {
  Message[type] = (options: MessageOptions | string): MessageReturn => {
    let nextOptions: MessageOptions

    if (isPlainObject(options)) {
      nextOptions = { ...options, type }
    } else {
      nextOptions = {
        content: options,
        type,
      }
    }

    if (type === 'loading' && nextOptions.duration == null) {
      nextOptions.duration = 0
    }

    return Message(nextOptions)
  }
})

Message.clear = function (position?: MessagePosition) {
  const targets = position
    ? uniqMessageOptions.filter((option) => option.reactiveMessageOptions.position === position)
    : [...uniqMessageOptions]

  targets.forEach((option) => {
    closeById(option.id)
  })
}

Message.setDefaultOptions = function (options: MessageOptions) {
  defaultOptions = { ...defaultOptionsValue, ...options }
}

Message.resetDefaultOptions = function () {
  defaultOptions = { ...defaultOptionsValue }
}

function opened(element: HTMLElement): void {
  const id = element.getAttribute('data-id')
  const option = uniqMessageOptions.find((option) => String(option.id) === id)
  if (option) {
    call(option.reactiveMessageOptions.onOpened)
  }
}

function afterLeave(element: HTMLElement): void {
  const id = element.getAttribute('data-id')
  if (id != null) {
    closedCallbacks.get(id)?.()
    closedCallbacks.delete(id)
  }

  if (uniqMessageOptions.length === 0 && isMount) {
    call(unmount)
    isMount = false
  }
}

function addUniqOption(uniqMessageOptionItem: UniqMessageOptions) {
  uniqMessageOptions.push(uniqMessageOptionItem)
}

function normalizeOptions(options: MessageOptions | string = {}): MessageOptions {
  return isString(options) ? { content: options } : { ...options }
}

function updateMessage(id: string | number, messageOptions: MessageOptions): MessageReturn {
  const option = uniqMessageOptions.find((item) => item.id === id)!
  const nextDuration =
    messageOptions.duration == null ? option.reactiveMessageOptions.duration : messageOptions.duration

  Object.assign(option.reactiveMessageOptions, {
    ...messageOptions,
    id,
    duration: nextDuration,
  })

  option._update = `update-${Date.now()}`

  return {
    close() {
      closeById(id)
    },
  }
}

function getTop(position = 'top') {
  if (position === 'bottom') {
    return { top: '85%' }
  }

  return { top: position === 'top' ? '5%' : '45%' }
}

Message.Component = VarMessage
withInstall(VarMessage)
withInstall(VarMessage, Message)
withPropsDefaultsSetter(Message, messageProps)

export { messageProps }

export const _MessageComponent = VarMessage
export type MessageInstance = InstanceType<typeof VarMessage>

export default Message
