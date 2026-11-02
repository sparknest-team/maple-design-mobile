import { nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, watch } from 'vue'
import { resolveDirection } from '../_utils/direction'

interface MenuKeyboardOptions {
  reference: () => HTMLElement | SVGElement | undefined
  panel: () => HTMLElement | undefined
  visible: () => boolean
  disabled: () => boolean
  isTopLayer: (event: Event) => boolean
  openKey?: 'ArrowRight'
  open?: () => void
  close: () => void
  escape?: () => void
  restoreFocus?: () => void
}

export function useMenuKeyboard(options: MenuKeyboardOptions) {
  let view: Window | null | undefined
  let disposed = false
  function items() {
    const panel = options.panel()
    return Array.from(panel?.querySelectorAll<HTMLElement>('[data-menu-item]') ?? []).filter(
      (item) => item.closest('[data-menu-panel]') === panel && item.getAttribute('aria-disabled') !== 'true',
    )
  }
  function focus(key: string) {
    const list = items()
    const active = options.panel()?.ownerDocument.activeElement
    const index = list.findIndex((item) => item === active || item.contains(active ?? null))
    const target =
      key === 'Home'
        ? 0
        : key === 'End'
          ? list.length - 1
          : index < 0
            ? key === 'ArrowUp'
              ? list.length - 1
              : 0
            : (index + (key === 'ArrowUp' ? -1 : 1) + list.length) % list.length
    list[target]?.focus()
  }
  async function handle(event: KeyboardEvent) {
    if (disposed || options.disabled() || event.defaultPrevented) {
      return
    }
    const key = event.key
    const reference = options.reference()
    const active = reference?.ownerDocument.activeElement
    if (!options.visible()) {
      const openKeyPressed = options.openKey
        ? key === (resolveDirection(reference) === 'rtl' ? 'ArrowLeft' : options.openKey)
        : key === 'ArrowDown' || key === 'ArrowUp'
      if (options.open && openKeyPressed && (active === reference || !!reference?.contains(active ?? null))) {
        event.preventDefault()
        options.open()
        await nextTick()
        if (!disposed && options.visible()) {
          focus(key)
        }
      }
      return
    }
    if (!options.isTopLayer(event)) {
      return
    }
    // Menu-backed inputs keep native caret navigation and text entry.
    if (
      active?.closest('input, textarea, [contenteditable="true"], [role="textbox"]') &&
      ['Home', 'End', 'Enter', ' '].includes(key)
    ) {
      return
    }
    if (
      key === 'Escape' ||
      (options.openKey && key === (resolveDirection(reference) === 'rtl' ? 'ArrowRight' : 'ArrowLeft'))
    ) {
      event.preventDefault()
      options.close()
      if (key === 'Escape') {
        options.escape?.()
      }
      await nextTick()
      if (!disposed && !options.visible()) {
        if (options.restoreFocus) {
          options.restoreFocus()
        } else {
          reference?.focus()
        }
      }
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) {
      event.preventDefault()
      focus(key)
    } else if (key === 'Enter') {
      const item = items().find((item) => item === active)
      if (item) {
        event.preventDefault()
        item.click()
      }
    }
  }
  let mounted = false
  const unbind = () => {
    view?.removeEventListener('keydown', handle)
    view = undefined
  }
  function bind() {
    unbind()
    if (!mounted || disposed) {
      return
    }
    view = options.reference()?.ownerDocument.defaultView ?? options.panel()?.ownerDocument.defaultView
    view?.addEventListener('keydown', handle)
  }
  onMounted(() => {
    mounted = true
    bind()
  })
  onActivated(() => {
    disposed = false
    bind()
  })
  onDeactivated(() => {
    disposed = true
    unbind()
  })
  watch(options.reference, bind, { flush: 'post' })
  onBeforeUnmount(() => {
    disposed = true
    unbind()
  })
  return { focus }
}
