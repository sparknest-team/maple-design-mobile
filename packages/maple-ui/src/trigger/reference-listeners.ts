import {
  callWithAsyncErrorHandling,
  ErrorCodes,
  getCurrentInstance,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onUpdated,
  watch,
  type Ref,
} from 'vue'
import type { TriggerElement } from './reference'

const referenceListener =
  /^(onClick|onMouseenter|onMouseleave|onFocusin|onFocusout|onContextmenu)((?:Once|Capture|Passive)*)$/

export function isTriggerReferenceListener(key: string): boolean {
  return referenceListener.test(key)
}

type ReferenceHandler = (event: Event) => unknown

type Listener = {
  element?: TriggerElement
  attached: boolean
  consumed: boolean
  options: AddEventListenerOptions
  event: string
  value: ReferenceHandler | ReferenceHandler[]
  invoke: EventListener
}

/** Native reference attributes keep native modifier and element ownership. */
export function useTriggerReferenceListeners(
  reference: Readonly<Ref<TriggerElement | undefined>>,
  attrs: Record<string, unknown>,
) {
  const instance = getCurrentInstance()
  const listeners = new Map<string, Listener>()
  let active = true
  const detach = (listener: Listener) => {
    listener.element?.removeEventListener(listener.event, listener.invoke, listener.options)
    listener.attached = false
  }
  const sync = () => {
    for (const [key, listener] of listeners) {
      if (typeof attrs[key] !== 'function' && !Array.isArray(attrs[key])) {
        detach(listener)
        listeners.delete(key)
      }
    }
    for (const [key, value] of Object.entries(attrs)) {
      const match = referenceListener.exec(key)
      if (!match || (typeof value !== 'function' && !Array.isArray(value))) {
        continue
      }
      let listener = listeners.get(key)
      if (!listener) {
        listener = {
          attached: false,
          consumed: false,
          options: {
            once: match[2].includes('Once'),
            capture: match[2].includes('Capture'),
            passive: match[2].includes('Passive'),
          },
          event: match[1].slice(2).toLowerCase(),
          value: value as ReferenceHandler | ReferenceHandler[],
          invoke: () => {},
        }
        const current = listener
        current.invoke = (event) => {
          if (!active || current.element !== event.currentTarget || current.consumed) {
            return
          }
          if (current.options.once) {
            current.consumed = true
            current.attached = false
          }
          callWithAsyncErrorHandling(current.value, instance, ErrorCodes.NATIVE_EVENT_HANDLER, [event])
        }
        listeners.set(key, current)
      }
      listener.value = value as ReferenceHandler | ReferenceHandler[]
      const next = reference.value
      if (listener.element !== next) {
        detach(listener)
        // Keep the last owner across a temporary KeepAlive detachment. A new
        // reference is a new native element and receives a new Once lifetime.
        if (next) {
          listener.element = next
          listener.consumed = false
        }
      }
      if (active && next && !listener.attached && !listener.consumed) {
        next.addEventListener(listener.event, listener.invoke, listener.options)
        listener.attached = true
      }
    }
  }
  watch(reference, sync, { immediate: true, flush: 'sync' })
  onUpdated(sync)
  onDeactivated(() => {
    active = false
    listeners.forEach(detach)
  })
  onActivated(() => {
    active = true
    sync()
  })
  onBeforeUnmount(() => {
    active = false
    listeners.forEach(detach)
    listeners.clear()
  })
}
