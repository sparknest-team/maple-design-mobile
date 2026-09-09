import { onActivated, onBeforeUnmount, onDeactivated, onMounted, watch } from 'vue'

export interface ScrollLockOptions {
  className?: string
  reserveScrollBar?: boolean
}
interface LockState {
  count: number
  styles: Map<string, [string, string]>
  classes: Map<string, { count: number; existed: boolean }>
}
const locks = new WeakMap<HTMLElement, LockState>()

/** Locks belong to DOM elements, and each acquisition has its own idempotent release. */
export function acquireScrollLock(element: HTMLElement, options: ScrollLockOptions = {}) {
  let state = locks.get(element)
  const view = element.ownerDocument.defaultView
  const remember = (state: LockState, property: string) => {
    if (!state.styles.has(property)) {
      state.styles.set(property, [
        element.style.getPropertyValue(property),
        element.style.getPropertyPriority(property),
      ])
    }
  }
  if (!state) {
    state = { count: 0, styles: new Map(), classes: new Map() }
    locks.set(element, state)
    remember(state, 'overflow')
    if (options.reserveScrollBar && view && view.getComputedStyle(element).overflow !== 'hidden') {
      const styles = view.getComputedStyle(element)
      const width =
        element === element.ownerDocument.body
          ? element.ownerDocument.documentElement.clientWidth
            ? view.innerWidth - element.ownerDocument.documentElement.clientWidth
            : 0
          : element.offsetWidth -
            element.clientWidth -
            (parseFloat(styles.borderLeftWidth) || 0) -
            (parseFloat(styles.borderRightWidth) || 0)
      if (width > 0) {
        remember(state, 'padding-right')
        element.style.setProperty('padding-right', `${(parseFloat(styles.paddingRight) || 0) + width}px`)
      }
    }
    element.style.setProperty('overflow', 'hidden')
  }
  state.count++
  if (options.className) {
    const entry = state.classes.get(options.className) ?? {
      count: 0,
      existed: element.classList.contains(options.className),
    }
    entry.count++
    state.classes.set(options.className, entry)
    element.classList.add(options.className)
  }
  let released = false
  return () => {
    if (released) {
      return
    }
    released = true
    if (options.className) {
      const entry = state!.classes.get(options.className)!
      if (--entry.count === 0) {
        if (!entry.existed) {
          element.classList.remove(options.className)
        }
        state!.classes.delete(options.className)
      }
    }
    if (--state!.count === 0) {
      for (const [property, [value, priority]] of state!.styles) {
        if (value) {
          element.style.setProperty(property, value, priority)
        } else {
          element.style.removeProperty(property)
        }
      }
      locks.delete(element)
    }
  }
}

/** No DOM access during SSR; rebind the actual locked target on container changes. */
export function useScrollLock(
  target: () => HTMLElement | undefined,
  enabled: () => boolean,
  options: ScrollLockOptions = {},
) {
  let mounted = false
  let suspended = false
  let lockedTarget: HTMLElement | undefined
  let release: (() => void) | undefined
  const clear = () => {
    release?.()
    release = undefined
    lockedTarget = undefined
  }
  const sync = () => {
    const next = mounted && !suspended && enabled() ? target() : undefined
    if (lockedTarget === next) {
      return
    }
    clear()
    if (next) {
      lockedTarget = next
      release = acquireScrollLock(next, options)
    }
  }
  watch([target, enabled], sync, { flush: 'sync' })
  onMounted(() => {
    mounted = true
    sync()
  })
  onActivated(() => {
    suspended = false
    sync()
  })
  onDeactivated(() => {
    suspended = true
    clear()
  })
  onBeforeUnmount(() => {
    mounted = false
    clear()
  })
}
