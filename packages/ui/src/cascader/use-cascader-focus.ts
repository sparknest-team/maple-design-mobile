import { nextTick, onBeforeUnmount, onDeactivated, watch, type Ref } from 'vue'

/** Transfer focus only while the navigation still owns the original focus. */
export function useCascaderFocus(activeKey: Readonly<Ref<string | undefined>>) {
  let cancelPendingFocus: (() => void) | undefined
  watch(activeKey, () => cancelPendingFocus?.(), { flush: 'sync' })
  onDeactivated(() => cancelPendingFocus?.())
  onBeforeUnmount(() => cancelPendingFocus?.())

  return (root: HTMLElement, option: Element, originPanel: Element | null | undefined, panelSelector: string) => {
    const key = activeKey.value
    const document = root.ownerDocument
    const nodeRoot = root.getRootNode()
    const focusRoot = 'activeElement' in nodeRoot ? (nodeRoot as Document | ShadowRoot) : document
    if (!key || !root.contains(option) || focusRoot.activeElement !== option) {
      return
    }
    cancelPendingFocus?.()
    const view = document.defaultView
    if (!view) {
      return
    }
    let observer: MutationObserver | undefined
    const timer: { id?: number } = {}
    let done = false
    const cleanup = () => {
      if (done) {
        return
      }
      done = true
      observer?.disconnect()
      if (timer.id !== undefined) {
        view.clearTimeout(timer.id)
      }
      document.removeEventListener('focusin', onFocus, true)
      document.removeEventListener('pointerdown', cleanup, true)
      if (cancelPendingFocus === cleanup) {
        cancelPendingFocus = undefined
      }
    }
    const onFocus = (next: FocusEvent) => {
      if (next.target !== option && !next.composedPath().includes(option)) {
        cleanup()
      }
    }
    const attempt = () => {
      if (done) {
        return
      }
      const focused = focusRoot.activeElement
      const docFocus = document.activeElement
      const lostToRemoval =
        !option.isConnected &&
        (docFocus === document.body || docFocus === document.documentElement) &&
        (focused === null || focused === document.body || focused === document.documentElement)
      if (
        !root.isConnected ||
        root.getRootNode() !== nodeRoot ||
        activeKey.value !== key ||
        (focused !== option && !lostToRemoval)
      ) {
        cleanup()
        return
      }
      const next = Array.from(root.querySelectorAll<HTMLElement>('[data-cascader-key]')).find(
        (element) => element.dataset.cascaderKey === key && element.closest(panelSelector) === originPanel,
      )
      if (next) {
        cleanup()
        next.focus()
      }
    }
    document.addEventListener('focusin', onFocus, true)
    document.addEventListener('pointerdown', cleanup, true)
    cancelPendingFocus = cleanup
    if (view.MutationObserver) {
      observer = new view.MutationObserver(attempt)
      observer.observe(root, { childList: true, subtree: true })
    }
    timer.id = view.setTimeout(cleanup, 1000)
    void nextTick(attempt)
  }
}
