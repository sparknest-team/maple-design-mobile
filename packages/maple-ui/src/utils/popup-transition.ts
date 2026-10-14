import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'

export function usePopupTransition(
  active: () => boolean,
  unmount: () => boolean,
  emit: (event: 'open' | 'close' | 'opened' | 'closed') => void,
) {
  let live = false,
    suspended = false
  let phase: 'opening' | 'opened' | 'closing' | 'closed' = active() ? 'opening' : 'closed'
  const rendered = ref(active()),
    leaving = ref(false)
  const shouldRender = computed(() => active() || leaving.value || (!unmount() && rendered.value))
  function opened() {
    if (live && !suspended && active() && phase === 'opening') {
      phase = 'opened'
      emit('opened')
    }
  }
  function closed() {
    if (live && !suspended && !active() && phase === 'closing') {
      phase = 'closed'
      leaving.value = false
      emit('closed')
    }
  }
  watch(
    active,
    (open) => {
      leaving.value = !open
      phase = open ? 'opening' : 'closing'
      if (open) {
        rendered.value = true
      }
      emit(open ? 'open' : 'close')
    },
    { immediate: active() },
  )
  onMounted(() => {
    live = true
    if (active()) {
      nextTick(opened)
    }
  })
  onActivated(() => {
    suspended = false
  })
  onDeactivated(() => {
    suspended = true
    leaving.value = false
  })
  onBeforeUnmount(() => {
    live = false
  })
  return { rendered, leaving, shouldRender, opened, closed }
}
