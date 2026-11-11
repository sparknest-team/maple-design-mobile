import { computed, onBeforeUnmount, onDeactivated, onMounted, ref, watch, type Ref } from 'vue'

export function useTriggerRender(
  visible: Ref<boolean>,
  unmountOnClose: () => boolean,
  emit: (event: 'open' | 'close' | 'opened' | 'closed') => void,
) {
  const retained = ref(visible.value)
  const phase = ref<'idle' | 'enter' | 'leave'>('idle')
  let alive = true
  let mounted = false
  watch(
    visible,
    (value) => {
      if (value) {
        retained.value = true
      }
      if (mounted) {
        emit(value ? 'open' : 'close')
      }
    },
    { flush: 'sync' },
  )
  onMounted(() => {
    mounted = true
    if (visible.value) {
      emit('open')
    }
  })
  onBeforeUnmount(() => {
    alive = false
    phase.value = 'idle'
  })
  onDeactivated(() => {
    phase.value = 'idle'
    retained.value = visible.value
  })
  const finish = (direction: 'enter' | 'leave') => {
    if (!alive || phase.value !== direction || visible.value !== (direction === 'enter')) {
      return
    }
    phase.value = 'idle'
    if (direction === 'leave') {
      retained.value = false
    }
    emit(direction === 'enter' ? 'opened' : 'closed')
  }
  return {
    rendered: computed(() => !unmountOnClose() || visible.value || retained.value),
    displayed: computed(() => visible.value || retained.value),
    animating: computed(() => phase.value !== 'idle'),
    hooks: {
      onBeforeEnter: () => {
        if (visible.value) {
          phase.value = 'enter'
        }
      },
      onAfterEnter: () => finish('enter'),
      onEnterCancelled: () => {
        if (phase.value === 'enter') {
          phase.value = 'idle'
        }
      },
      onBeforeLeave: () => {
        phase.value = 'leave'
      },
      onAfterLeave: () => finish('leave'),
      onLeaveCancelled: () => {
        if (phase.value === 'leave') {
          phase.value = 'idle'
        }
      },
    },
  }
}
