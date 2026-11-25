import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'

export function onActiveLifecycle(activate: () => void, deactivate: () => void) {
  onMounted(activate)
  onActivated(activate)
  onDeactivated(deactivate)
  onBeforeUnmount(deactivate)
}

/** Release the old DOM target before attaching to its replacement or suspending the owner. */
export function useActiveTarget<T extends EventTarget>(target: () => T | undefined, attach: (value: T) => () => void) {
  const active = ref(false)
  const activate = () => {
    active.value = true
  }
  const deactivate = () => {
    active.value = false
  }
  watch(
    () => (active.value ? target() : undefined),
    (value, _, cleanup) => {
      if (value) {
        cleanup(attach(value))
      }
    },
    { flush: 'sync' },
  )
  onActiveLifecycle(activate, deactivate)
}
