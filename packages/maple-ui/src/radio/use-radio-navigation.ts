import { computed, onActivated, onDeactivated, onMounted, onScopeDispose, onUpdated, shallowRef } from 'vue'

export interface RadioNavigationItem {
  element(): HTMLElement | null | undefined
  checked(): boolean
  disabled(): boolean
  readonly(): boolean
  select(event: KeyboardEvent): void
}
export interface RadioNavigation {
  register(item: RadioNavigationItem): () => void
  tabIndex(item: RadioNavigationItem): number | undefined
  keydown(event: KeyboardEvent): void
}

/** Local registry; no window listeners or cross-group focus state. */
export function useRadioNavigation(hasSelection: () => boolean): RadioNavigation {
  const members = new Set<RadioNavigationItem>()
  const ordered = shallowRef<RadioNavigationItem[]>([])
  let disposed = false
  const mounted = shallowRef(false)
  function refresh() {
    if (disposed) {
      return
    }
    const next = [...members].sort((a, b) => {
      const left = a.element(),
        right = b.element()
      if (!left || !right || left === right) {
        return 0
      }
      const position = left.compareDocumentPosition(right)
      if (position & 1) {
        return 0
      }
      return position & 4 ? -1 : position & 2 ? 1 : 0
    })
    if (next.length !== ordered.value.length || next.some((item, i) => item !== ordered.value[i])) {
      ordered.value = next
    }
  }
  const enabled = computed(() => ordered.value.filter((item) => !item.disabled()))
  const entry = computed(() => enabled.value.find((item) => item.checked()) ?? enabled.value[0])
  const register = (item: RadioNavigationItem) => {
    if (!disposed) {
      members.add(item)
    }
    refresh()
    return () => {
      members.delete(item)
      refresh()
    }
  }
  onMounted(() => {
    mounted.value = true
    refresh()
  })
  onUpdated(refresh)
  onScopeDispose(() => {
    disposed = true
    members.clear()
    ordered.value = []
  })
  return {
    register,
    tabIndex: (item) =>
      item.disabled()
        ? undefined
        : !mounted.value && hasSelection() && !item.checked()
          ? -1
          : item === entry.value
            ? 0
            : -1,
    keydown(event) {
      if (disposed || event.altKey || event.ctrlKey || event.metaKey || event.repeat) {
        return
      }
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
        return
      }
      refresh()
      const items = enabled.value
      const from = items.findIndex((item) => item.element() === event.target)
      if (from < 0) {
        return
      }
      event.preventDefault()
      event.stopPropagation()
      let to = from
      if (event.key === 'Home') {
        to = 0
      } else if (event.key === 'End') {
        to = items.length - 1
      } else {
        to = (from + (event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length
      }
      const item = items[to]
      item.element()?.focus()
      if (!item.readonly()) {
        item.select(event)
      }
    },
  }
}

export function useRadioRegistration(navigation: RadioNavigation | undefined, item: RadioNavigationItem) {
  let remove = navigation?.register(item)
  const stop = () => {
    remove?.()
    remove = undefined
  }
  onActivated(() => {
    stop()
    remove = navigation?.register(item)
  })
  onDeactivated(stop)
  onScopeDispose(stop)
  return computed(() => (navigation ? navigation.tabIndex(item) : item.disabled() ? undefined : 0))
}
