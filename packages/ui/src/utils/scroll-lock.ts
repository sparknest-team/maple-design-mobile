import { useActiveTarget } from './active-target'

export interface ScrollLockOptions {
  className?: string
  reserveScrollBar?: boolean
}
interface LockState {
  count: number
  restore: Array<() => void>
  classes: Map<string, { count: number; existed: boolean }>
}
const locks = new WeakMap<HTMLElement, LockState>()

function remember(style: CSSStyleDeclaration, property: string, state: LockState) {
  const value = style.getPropertyValue(property)
  const priority = style.getPropertyPriority(property)
  state.restore.push(() => style.setProperty(property, value, priority))
}

function lockOverflow(element: HTMLElement, state: LockState, reserveScrollBar: boolean) {
  const { body, documentElement: root, defaultView: view } = element.ownerDocument
  const { style } = element
  for (const property of Array.from(style)) {
    if (property === 'overflow' || property === 'overflow-x' || property === 'overflow-y') {
      remember(style, property, state)
    }
  }
  const hide = () => style.setProperty('overflow', 'hidden', 'important')
  if (element === body && element !== root) {
    state.restore.push(acquireScrollLock(root, { reserveScrollBar }))
    hide()
    return
  }
  const styles = reserveScrollBar && view ? view.getComputedStyle(element) : undefined
  if (!styles || !view || styles.overflow === 'hidden') {
    hide()
    return
  }
  const isRoot = element === root
  const paddingTarget = isRoot ? (body ?? root) : element
  const padding = paddingTarget === element ? styles : view.getComputedStyle(paddingTarget)
  const left = parseFloat(padding.paddingLeft) || 0
  const right = parseFloat(padding.paddingRight) || 0
  const beforeWidth = element.clientWidth
  const beforeLeft = element.clientLeft
  const beforeRect = isRoot ? paddingTarget.getBoundingClientRect() : undefined
  const bothEdges = styles.getPropertyValue('scrollbar-gutter').includes('both-edges')
  const available = isRoot
    ? beforeWidth && view.innerWidth - beforeWidth
    : element.offsetWidth -
      beforeWidth -
      (parseFloat(styles.borderLeftWidth) || 0) -
      (parseFloat(styles.borderRightWidth) || 0)
  hide()
  const released = Math.min(available, element.clientWidth - beforeWidth)
  if (released <= 0) {
    return
  }
  // Padding can enlarge a content-box container. Keep its native scrollbar track instead.
  if (!isRoot && styles.boxSizing === 'content-box' && view.CSS?.supports('scrollbar-gutter', 'stable')) {
    remember(style, 'scrollbar-gutter', state)
    style.setProperty('scrollbar-gutter', bothEdges ? 'stable both-edges' : 'stable', 'important')
    return
  }
  const leftReleased = beforeLeft - element.clientLeft
  const after = beforeRect && paddingTarget.getBoundingClientRect()
  let leftSpace = beforeRect && after ? beforeRect.left - after.left : 0
  let rightSpace = beforeRect && after ? after.right - beforeRect.right : 0
  if (leftSpace <= 0.5) {
    leftSpace = 0
  }
  if (rightSpace <= 0.5) {
    rightSpace = 0
  }
  if (!leftSpace && !rightSpace) {
    if (bothEdges) {
      leftSpace = rightSpace = leftReleased > 0 ? leftReleased : released
    } else if (leftReleased > 0 || (leftReleased === 0 && view.getComputedStyle(element).direction === 'rtl')) {
      leftSpace = released
    } else {
      rightSpace = released
    }
  }
  const reserve = (property: string, padding: number, space: number) => {
    if (space <= 0) {
      return
    }
    remember(paddingTarget.style, property, state)
    paddingTarget.style.setProperty(property, padding + space + 'px', 'important')
  }
  reserve('padding-left', left, leftSpace)
  reserve('padding-right', right, rightSpace)
}

/** Locks belong to DOM elements, and each acquisition has its own idempotent release. */
export function acquireScrollLock(
  element: HTMLElement,
  { className, reserveScrollBar = false }: ScrollLockOptions = {},
): () => void {
  const previous = locks.get(element)
  const state: LockState = previous ?? { count: 0, restore: [], classes: new Map() }
  if (!previous) {
    locks.set(element, state)
    lockOverflow(element, state, reserveScrollBar)
  }
  state.count++
  let entry = className ? state.classes.get(className) : undefined
  if (className) {
    if (!entry) {
      entry = { count: 0, existed: element.classList.contains(className) }
      state.classes.set(className, entry)
    }
    entry.count++
    element.classList.add(className)
  }
  let released = false
  return () => {
    if (released) {
      return
    }
    released = true
    if (className && entry && --entry.count === 0) {
      if (!entry.existed) {
        element.classList.remove(className)
      }
      state.classes.delete(className)
    }
    if (--state.count === 0) {
      for (const property of ['overflow', 'overflow-x', 'overflow-y']) {
        element.style.removeProperty(property)
      }
      for (const restore of state.restore) {
        restore()
      }
      locks.delete(element)
    }
  }
}

/** Resolve the target only while an enabled owner is mounted and active. */
export function useScrollLock(
  target: () => HTMLElement | undefined,
  enabled: () => boolean,
  options: ScrollLockOptions = {},
) {
  useActiveTarget(
    () => (enabled() ? target() : undefined),
    (element) => acquireScrollLock(element, options),
  )
}
