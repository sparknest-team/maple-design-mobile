import { unref, type Ref } from 'vue'
import { inBrowser, isFunction } from '@maplejs/maple-shared'
import { useEventListener } from './useEventListener.js'

export type UseClickOutsideTarget = Element | Ref<Element | undefined | null> | (() => Element | undefined | null)

export function useClickOutside(target: UseClickOutsideTarget, type: string, listener: EventListener) {
  if (!inBrowser()) {
    return
  }

  const handler = (event: Event) => {
    const element = isFunction(target) ? target() : unref(target)

    if (element && !event.composedPath().includes(element) && !element.contains(event.target as Node)) {
      listener(event)
    }
  }

  useEventListener(document, type, handler)
}
