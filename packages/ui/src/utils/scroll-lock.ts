import { onActivated, onBeforeUnmount, onDeactivated, onMounted, watch } from 'vue'

export interface ScrollLockOptions {
  className?: string
  reserveScrollBar?: boolean
}
interface LockState {
  count: number
  styles: Map<string, [HTMLElement, string, string]>
  overflow: Array<[string, string, string]>
  releaseRoot?: () => void
  classes: Map<string, { count: number; existed: boolean }>
}
const locks = new WeakMap<HTMLElement, LockState>()

/** Locks belong to DOM elements, and each acquisition has its own idempotent release. */
export function acquireScrollLock(element: HTMLElement, options: ScrollLockOptions = {}) {
  let state = locks.get(element)
  const view = element.ownerDocument.defaultView
  const remember = (state: LockState, property: string, target: HTMLElement = element) => {
    if (!state.styles.has(property)) {
      state.styles.set(property, [
        target,
        target.style.getPropertyValue(property),
        target.style.getPropertyPriority(property),
      ])
    }
  }
  if (!state) {
    const overflow: Array<[string, string, string]> = []
    for (let i = 0; i < element.style.length; i++) {
      const property = element.style.item(i)
      if (property === 'overflow' || property === 'overflow-x' || property === 'overflow-y') {
        overflow.push([property, element.style.getPropertyValue(property), element.style.getPropertyPriority(property)])
      }
    }
    state = { count: 0, styles: new Map(), classes: new Map(), overflow }
    locks.set(element, state)
    const styles = view?.getComputedStyle(element)
    const initialOverflow = styles?.overflow
    const isRoot = element === element.ownerDocument.documentElement
    const paddingTarget = isRoot ? (element.ownerDocument.body ?? element) : element
    const paddingStyles = view?.getComputedStyle(paddingTarget)
    const initialPaddingLeft = paddingStyles?.paddingLeft
    const initialPaddingRight = paddingStyles?.paddingRight
    const metric = element === element.ownerDocument.body ? element.ownerDocument.documentElement : element
    const beforeWidth = metric.clientWidth
    const beforeLeft = metric.clientLeft
    const beforeRect = isRoot ? paddingTarget.getBoundingClientRect() : undefined
    const bothEdges = view?.getComputedStyle(metric).getPropertyValue('scrollbar-gutter').includes('both-edges')
    const available =
      isRoot || element === element.ownerDocument.body
        ? view && beforeWidth
          ? view.innerWidth - beforeWidth
          : 0
        : element.offsetWidth -
          beforeWidth -
          (parseFloat(styles?.borderLeftWidth ?? '') || 0) -
          (parseFloat(styles?.borderRightWidth ?? '') || 0)
    // The root owns viewport compensation until the last root or body lock ends.
    if (element === element.ownerDocument.body && metric !== element) {
      state.releaseRoot = acquireScrollLock(metric, { reserveScrollBar: options.reserveScrollBar })
    }
    // Locking must override author overflow rules, including !important declarations.
    element.style.setProperty('overflow', 'hidden', 'important')
    if (element !== element.ownerDocument.body && options.reserveScrollBar && view && initialOverflow !== 'hidden') {
      // A stable gutter can remain after locking; reserve only space actually released.
      const released = Math.min(Math.max(0, available), Math.max(0, metric.clientWidth - beforeWidth))
      if (released > 0) {
        const leftReleased = Math.max(0, beforeLeft - metric.clientLeft)
        const reserve = (property: 'padding-left' | 'padding-right', padding: string | undefined, width: number) => {
          remember(state!, property, paddingTarget)
          paddingTarget.style.setProperty(property, `${(parseFloat(padding ?? '') || 0) + width}px`)
        }
        const afterRect = beforeRect && paddingTarget.getBoundingClientRect()
        const leftShift = beforeRect && afterRect ? beforeRect.left - afterRect.left : 0
        const rightShift = beforeRect && afterRect ? afterRect.right - beforeRect.right : 0
        if (beforeRect && (leftShift > 0.5 || rightShift > 0.5)) {
          if (leftShift > 0.5) {
            reserve('padding-left', initialPaddingLeft, leftShift)
          }
          if (rightShift > 0.5) {
            reserve('padding-right', initialPaddingRight, rightShift)
          }
        } else if (bothEdges) {
          // Some engines omit the opposite gutter from clientWidth/clientLeft.
          const each = leftReleased || released
          reserve('padding-left', initialPaddingLeft, each)
          reserve('padding-right', initialPaddingRight, each)
        } else {
          const direction = view.getComputedStyle(metric).direction
          const onLeft = leftReleased > 0 || (beforeLeft === metric.clientLeft && direction === 'rtl')
          reserve(
            onLeft ? 'padding-left' : 'padding-right',
            onLeft ? initialPaddingLeft : initialPaddingRight,
            released,
          )
        }
      }
    }
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
      element.style.removeProperty('overflow')
      element.style.removeProperty('overflow-x')
      element.style.removeProperty('overflow-y')
      for (const [property, value, priority] of state!.overflow) {
        element.style.setProperty(property, value, priority)
      }
      for (const [property, [target, value, priority]] of state!.styles) {
        if (value) {
          target.style.setProperty(property, value, priority)
        } else {
          target.style.removeProperty(property)
        }
      }
      locks.delete(element)
      state!.releaseRoot?.()
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
