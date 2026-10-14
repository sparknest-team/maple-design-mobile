import { nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, watch } from 'vue'

const selector = 'a[href],button,input,select,textarea,[tabindex], [contenteditable="true"]'
const focusOrigins = new WeakMap<HTMLElement, HTMLElement[]>()
function restorable(element: HTMLElement) {
  if (
    !element.isConnected ||
    element.matches(':disabled') ||
    element.closest('[hidden],[inert],[aria-hidden="true"]')
  ) {
    return false
  }
  const view = element.ownerDocument.defaultView
  for (let node: HTMLElement | null = element; node; node = node.parentElement) {
    const style = view?.getComputedStyle(node)
    if (style?.display === 'none' || style?.visibility === 'hidden') {
      return false
    }
  }
  return true
}
function available(element: HTMLElement) {
  return element.tabIndex >= 0 && restorable(element)
}

/** Modal ownership follows the popup stack, including teleported child Triggers. */
export function useModalFocus(
  root: () => HTMLElement | undefined,
  active: () => boolean,
  isTop: (event?: Event) => boolean,
  lockScroll: () => boolean = () => true,
  ownerDocument?: () => Document | undefined,
) {
  let previous: HTMLElement[] = []
  let element: HTMLElement | undefined
  let owner: Document | undefined
  let mounted = false
  let suspended = false
  let captured = false
  let touch: { x: number; y: number } | undefined
  // A modal may live in an iframe while its opener lives in a same-origin
  // ancestor. Follow only accessible DOM focus chains, never global realm types.
  function outsideFocus() {
    let doc = owner
    let focused = doc?.activeElement as HTMLElement | null
    try {
      while (doc) {
        const frame = doc.defaultView?.frameElement
        if (!frame) {
          break
        }
        doc = frame.ownerDocument
        if (doc.activeElement !== frame) {
          focused = doc.activeElement as HTMLElement | null
        }
      }
    } catch {
      /* Cross-origin ancestors are outside this focus contract. */
    }
    return focused
  }
  function ownsFocusChain() {
    let doc = owner
    try {
      while (doc) {
        const frame = doc.defaultView?.frameElement
        if (!frame) {
          break
        }
        doc = frame.ownerDocument
        if (doc.activeElement !== frame && doc.activeElement !== doc.body) {
          return false
        }
      }
    } catch {
      /* Stop at the accessible document boundary. */
    }
    return true
  }
  function focus() {
    const target = root()
    if (!mounted || suspended || !active() || !target || !isTop()) {
      return
    }
    element = target
    if (!target.contains(target.ownerDocument.activeElement)) {
      target.focus({ preventScroll: true })
    }
  }
  function restore() {
    const focused = owner?.activeElement
    const target = previous.find(restorable)
    if (target && ownsFocusChain() && (!focused || focused === owner?.body || element?.contains(focused))) {
      target.focus({ preventScroll: true })
    }
    if (element) {
      focusOrigins.delete(element)
    }
    previous = []
    captured = false
  }
  function capture() {
    if (!owner) {
      return
    }
    if (!captured) {
      const focused = outsideFocus()
      // Snapshot ancestor modal origins before a lower layer can close first.
      // Its hidden trigger is skipped later; a still-visible ancestor is kept.
      previous = focused && typeof focused.focus === 'function' ? [focused] : []
      for (let node = focused; node; node = node.parentElement) {
        const origins = focusOrigins.get(node)
        if (origins) {
          previous.push(...origins)
          break
        }
      }
      const target = root()
      if (target) {
        focusOrigins.set(target, [...previous])
      }
      captured = true
    }
    nextTick(focus)
  }
  function trap(event: KeyboardEvent) {
    const target = root()
    if (event.key !== 'Tab' || event.defaultPrevented || !active() || suspended || !target || !isTop(event)) {
      return
    }
    const items = Array.from(target.querySelectorAll<HTMLElement>(selector)).filter(available)
    const focused = target.ownerDocument.activeElement
    const first = items[0],
      last = items[items.length - 1]
    if (
      !items.length ||
      !target.contains(focused) ||
      focused === target ||
      (event.shiftKey ? focused === first : focused === last)
    ) {
      event.preventDefault()
      ;(event.shiftKey ? last : first)?.focus({ preventScroll: true })
      if (!items.length) {
        target.focus({ preventScroll: true })
      }
    }
  }
  function start(event: TouchEvent) {
    touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : undefined
  }
  function move(event: TouchEvent) {
    if (!touch || event.touches.length !== 1 || !active() || suspended || !lockScroll() || !isTop(event)) {
      return
    }
    const point = event.touches[0],
      dx = touch.x - point.clientX,
      dy = touch.y - point.clientY
    touch = { x: point.clientX, y: point.clientY }
    if (!dx && !dy) {
      return
    }
    const target = root()
    const horizontal = Math.abs(dx) > Math.abs(dy),
      delta = horizontal ? dx : dy
    let node = event.target as HTMLElement | null
    while (target && node && target.contains(node)) {
      const style = node.ownerDocument.defaultView?.getComputedStyle(node)
      const overflow = horizontal ? style?.overflowX : style?.overflowY
      const offset = horizontal ? node.scrollLeft : node.scrollTop
      const maximum = horizontal ? node.scrollWidth - node.clientWidth : node.scrollHeight - node.clientHeight
      if (/(auto|scroll)/.test(overflow ?? '') && maximum > 0 && (delta < 0 ? offset > 0 : offset < maximum - 1)) {
        return
      }
      if (node === target) {
        break
      }
      node = node.parentElement
    }
    if (event.cancelable) {
      event.preventDefault()
    }
  }
  function bind() {
    owner = root()?.ownerDocument
    owner?.addEventListener('keydown', trap, true)
    owner?.addEventListener('touchstart', start, { passive: true, capture: true })
    owner?.addEventListener('touchmove', move, { passive: false, capture: true })
  }
  function unbind() {
    owner?.removeEventListener('keydown', trap, true)
    owner?.removeEventListener('touchstart', start, true)
    owner?.removeEventListener('touchmove', move, true)
    touch = undefined
  }
  watch(
    [active, root, () => ownerDocument?.() ?? root()?.ownerDocument],
    ([value]) => {
      if (!mounted || suspended) {
        return
      }
      if (root()?.ownerDocument !== owner) {
        unbind()
        bind()
      }
      if (value) {
        capture()
      }
    },
    { flush: 'post' },
  )
  onMounted(() => {
    mounted = true
    bind()
    if (active()) {
      capture()
    }
  })
  onActivated(() => {
    suspended = false
    unbind()
    bind()
    if (active()) {
      capture()
    }
  })
  onDeactivated(() => {
    suspended = true
    unbind()
    restore()
  })
  onBeforeUnmount(() => {
    mounted = false
    unbind()
    restore()
  })
  return { focus, restore, trap }
}
