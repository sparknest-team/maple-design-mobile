import { isShadowRoot } from '../_utils/is-shadow-root'
import { onActivated, onBeforeUnmount, onDeactivated, ref, watch } from 'vue'
import { isInteractiveAriaRole } from '../_utils/aria-role'
import { isEditable } from '../_utils/is-editable'

// Inspect rendered descendants so custom components and local slot updates work too.
const interactive = 'button,input:not([type="hidden"]),textarea,select,a[href],summary'

export function useUploadTrigger(initialInteractive = false) {
  const triggerRef = ref<HTMLElement>()
  const hasInteractiveTrigger = ref(initialInteractive)
  const consumed = new WeakSet<Event>()
  let currentClick: Event | undefined
  let clearClick: ReturnType<typeof setTimeout> | undefined
  let observer: MutationObserver | undefined
  let releaseEnvironment: (() => void) | undefined
  let active = true
  let epoch = 0
  function disconnect() {
    observer?.disconnect()
    observer = undefined
    releaseEnvironment?.()
    releaseEnvironment = undefined
  }
  function connect() {
    disconnect()
    const root = triggerRef.value
    if (!active || !root) {
      return
    }
    const update = () => {
      if (!active || triggerRef.value !== root) {
        return
      }
      hasInteractiveTrigger.value = Array.from(
        root.querySelectorAll<HTMLElement>(`${interactive},[contenteditable],[tabindex],[role]`),
      ).some((node) => {
        if (node.tagName === 'INPUT' && (node as HTMLInputElement).type === 'hidden') {
          return false
        }
        if (
          !node.matches(interactive) &&
          !isEditable(node) &&
          node.tabIndex < 0 &&
          !isInteractiveAriaRole(node.getAttribute('role'))
        ) {
          return false
        }
        const view = root.ownerDocument.defaultView
        const visibility = view?.getComputedStyle(node).visibility
        if (visibility === 'hidden' || visibility === 'collapse') {
          return false
        }
        let ancestor: Element | null = node
        while (ancestor && ancestor !== root) {
          if (ancestor.hasAttribute('hidden') || ancestor.hasAttribute('inert')) {
            return false
          }
          if (view?.getComputedStyle(ancestor).display === 'none') {
            return false
          }
          ancestor = ancestor.parentElement
        }
        return true
      })
    }
    update()
    const view = root.ownerDocument.defaultView
    if (view) {
      const preferences = ['(prefers-reduced-motion: reduce)', '(prefers-color-scheme: dark)', '(forced-colors: active)']
        .map(query => view.matchMedia?.(query))
      for (const preference of preferences) preference?.addEventListener?.('change', update)
      view.addEventListener('resize', update)
      releaseEnvironment = () => {
        for (const preference of preferences) preference?.removeEventListener?.('change', update)
        view.removeEventListener('resize', update)
      }
    }
    const Observer = view?.MutationObserver
    if (Observer) {
      const path: Node[] = [root]
      let ancestor: Node | null = root.parentNode
      while (ancestor) {
        path.push(ancestor)
        ancestor = ancestor.parentNode ?? (isShadowRoot(ancestor) ? ancestor.host : null)
      }
      const waitingForConnection = !root.isConnected
      observer = new Observer((records) => {
        if (waitingForConnection && root.isConnected) {
          connect()
          return
        }
        const moved = records.some(
          (record) =>
            record.type === 'childList' &&
            Array.from(record.removedNodes).some((removed) =>
              path.some((node) => removed === node || removed.contains(node)),
            ),
        )
        if (moved) {
          connect()
          return
        }
        if (records.some((record) => record.type === 'attributes' || root.contains(record.target))) {
          update()
        }
      })
      observer.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['role', 'tabindex', 'href', 'type', 'contenteditable', 'hidden', 'inert', 'class', 'style'],
      })
      // While detached the next parent is unknown. Stop watching document-wide on reconnection.
      if (waitingForConnection) observer.observe(root.ownerDocument, { childList: true, subtree: true })
      // Follow inherited visibility and rebind if an observed ancestor moves.
      for (const node of path.slice(1)) {
        if (node.nodeType === 1) {
          observer.observe(node, { childList: true, attributes: true, attributeFilter: ['class', 'style'] })
        } else {
          observer.observe(node, { childList: true })
        }
      }
    }
  }
  watch(triggerRef, connect, { flush: 'post' })
  onActivated(() => {
    active = true
    connect()
  })
  function retire() {
    active = false
    epoch++
    currentClick = undefined
    clearTimeout(clearClick)
    disconnect()
  }
  onDeactivated(retire)
  onBeforeUnmount(retire)
  function captureClick(event: Event) {
    currentClick = event
    // Browsers can run microtasks between capture, target and bubble listeners.
    clearTimeout(clearClick)
    clearClick = setTimeout(() => {
      if (currentClick === event) {
        currentClick = undefined
      }
    })
  }
  function claim(event = currentClick) {
    if (!active || (event && consumed.has(event))) {
      return false
    }
    if (event) {
      consumed.add(event)
    }
    return true
  }
  function chooser(operation: () => Promise<void>, event: Event) {
    const lifetime = epoch
    return () => (lifetime === epoch && claim(event) ? operation() : Promise.resolve())
  }
  return {
    triggerRef,
    hasInteractiveTrigger,
    captureClick,
    claim,
    chooser,
    isClaimed: (event: Event) => consumed.has(event),
  }
}
