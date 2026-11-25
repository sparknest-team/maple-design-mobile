import { computed, onActivated, onBeforeUnmount, onDeactivated, ref, watch } from 'vue'

export interface TriggerStateOptions {
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
}
export interface TriggerStateEmit {
  (event: 'update:open', value: boolean): void
  (event: 'open-change', value: boolean): void
}

/** Each scheduled callback belongs to one request, even if the host reuses timer IDs. */
export function createDelayedTask() {
  let stop: (() => void) | undefined
  function cancel() {
    const dispose = stop
    stop = undefined
    dispose?.()
  }
  function schedule(run: () => void, delay = 0) {
    cancel()
    const dispose = () => clearTimeout(timer)
    const timer = setTimeout(() => {
      if (stop !== dispose) {
        return
      }
      stop = undefined
      run()
    }, delay)
    stop = dispose
  }
  return { schedule, cancel }
}

export function useTriggerState(options: TriggerStateOptions, emit: TriggerStateEmit) {
  const localOpen = ref(options.open ?? options.defaultOpen ?? false)
  const visible = computed(() => options.open ?? localOpen.value)
  const { schedule, cancel } = createDelayedTask()
  let active = true
  const request = (value: boolean, delay = 0) => {
    cancel()
    const canChange = () => active && !(value && options.disabled) && value !== visible.value
    if (!canChange()) {
      return
    }
    const commit = () => {
      localOpen.value = value
      emit('update:open', value)
      emit('open-change', value)
    }
    if (delay > 0) {
      schedule(() => {
        if (canChange()) {
          commit()
        }
      }, delay)
    } else {
      commit()
    }
  }
  watch(
    () => options.open,
    (value) => {
      cancel()
      if (value !== undefined) {
        localOpen.value = value
      }
    },
  )
  watch(
    () => options.disabled,
    (disabled) => {
      if (disabled) {
        request(false)
      }
    },
  )
  onActivated(() => {
    active = true
  })
  onDeactivated(() => {
    request(false)
    active = false
    cancel()
  })
  onBeforeUnmount(() => {
    active = false
    cancel()
  })
  return { visible, request, cancel }
}
