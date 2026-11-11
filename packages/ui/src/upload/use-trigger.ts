import { onActivated, onBeforeUnmount, onDeactivated, ref, watch } from 'vue'

// Inspect rendered descendants so custom components and local slot updates work too.
const interactive =
  'button,input:not([type="hidden"]),textarea,select,a[href],summary,[contenteditable]:not([contenteditable="false"]),[role="button"],[role="link"],[role="checkbox"],[role="radio"],[role="switch"],[role="textbox"],[role="combobox"],[role="listbox"],[role="slider"],[role="spinbutton"]'

export function useUploadTrigger() {
  const triggerRef = ref<HTMLElement>()
  const hasInteractiveTrigger = ref(false)
  const consumed = new WeakSet<Event>()
  let currentClick: Event | undefined
  let clearClick: ReturnType<typeof setTimeout> | undefined
  let observer: MutationObserver | undefined
  let active = true
  let epoch = 0
  function disconnect() {
    observer?.disconnect()
    observer = undefined
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
      hasInteractiveTrigger.value =
        Boolean(root.querySelector(interactive)) ||
        Array.from(root.querySelectorAll<HTMLElement>('[tabindex]')).some((node) => node.tabIndex >= 0)
    }
    update()
    const Observer = root.ownerDocument.defaultView?.MutationObserver
    if (Observer) {
      observer = new Observer(update)
      observer.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['role', 'tabindex', 'href', 'type', 'contenteditable'],
      })
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
