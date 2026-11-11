import { isRef, onBeforeUnmount, onDeactivated, unref, watch, type Ref, type WatchStopHandle } from 'vue'
import { inBrowser, isFunction } from '@maple-design/shared-vue'
import { onSmartMounted } from './onSmartMounted.js'

export type UseEventListenerTarget =
  EventTarget | Ref<EventTarget | undefined | null> | (() => EventTarget | undefined | null)

export interface UseEventListenerOptions {
  capture?: boolean
  passive?: boolean
}

export function useEventListener<T extends keyof DocumentEventMap>(
  target: UseEventListenerTarget,
  type: T,
  listener: (event: DocumentEventMap[T]) => void,
  options?: UseEventListenerOptions,
): () => void

export function useEventListener(
  target: UseEventListenerTarget,
  type: string,
  listener: EventListener,
  options?: UseEventListenerOptions,
): () => void

export function useEventListener(
  target: UseEventListenerTarget,
  type: string,
  listener: EventListener,
  options: UseEventListenerOptions = {},
): () => void {
  if (!inBrowser()) {
    return () => {}
  }

  const { passive = false, capture = false } = options
  let boundTarget: EventTarget | undefined
  let active = false
  let cleaned = false
  let stop: WatchStopHandle | undefined
  const resolveTarget = () => (isFunction(target) ? target() : unref(target)) ?? undefined

  const detach = () => {
    boundTarget?.removeEventListener(type, listener, { capture })
    boundTarget = undefined
  }
  const bind = () => {
    if (!active || cleaned) {
      return
    }
    const next = resolveTarget()
    if (next === boundTarget) {
      return
    }
    detach()
    next?.addEventListener(type, listener, { passive, capture })
    boundTarget = next
  }
  const cleanup = () => {
    if (cleaned) {
      return
    }
    cleaned = true
    active = false
    stop?.()
    detach()
  }

  if (isRef(target) || isFunction(target)) {
    stop = watch(resolveTarget, bind)
  }
  onSmartMounted(() => {
    active = true
    bind()
  })
  onDeactivated(() => {
    active = false
    detach()
  })
  onBeforeUnmount(cleanup)
  return cleanup
}
