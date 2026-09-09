import { nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, watch } from 'vue'

const selector = 'a[href],button,input,select,textarea,[tabindex], [contenteditable="true"]'
function available(element: HTMLElement) {
  if (
    element.tabIndex < 0 ||
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

/** Modal ownership follows the popup stack, including teleported child Triggers. */
export function useModalFocus(
  root: () => HTMLElement | undefined,
  active: () => boolean,
  isTop: (event?: Event) => boolean,
  lockScroll: () => boolean = () => true,
) {
  let previous: HTMLElement | null = null
  let element: HTMLElement | undefined
  let owner: Document | undefined
  let mounted = false
  let suspended = false
  let captured = false
  let touch: { x: number; y: number } | undefined
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
    if (previous?.isConnected && (!focused || focused === owner?.body || element?.contains(focused))) {
      previous.focus({ preventScroll: true })
    }
    previous = null
    captured = false
  }
  function capture() {
    if (!owner) {
      return
    }
    if (!captured) {
      const focused = owner?.activeElement as HTMLElement | null
      previous = focused && typeof focused.focus === 'function' ? focused : null
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
    [active, root],
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
