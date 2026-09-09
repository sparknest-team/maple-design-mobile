import { computed, onBeforeUnmount, onDeactivated, ref, watch } from 'vue'

export interface TriggerStateOptions {
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
}
export type TriggerStateEmit = (event: 'update:open' | 'open-change', value: boolean) => void

export function useTriggerState(options: TriggerStateOptions, emit: TriggerStateEmit) {
  const localOpen = ref(options.open ?? options.defaultOpen ?? false)
  const visible = computed(() => options.open ?? localOpen.value)
  let timer: ReturnType<typeof setTimeout> | undefined
  const cancel = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    timer = undefined
  }
  const request = (value: boolean, delay = 0) => {
    cancel()
    if ((value && options.disabled) || value === visible.value) {
      return
    }
    const commit = () => {
      timer = undefined
      if ((value && options.disabled) || value === visible.value) {
        return
      }
      localOpen.value = value
      emit('update:open', value)
      emit('open-change', value)
    }
    if (delay > 0) {
      timer = setTimeout(commit, delay)
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
        cancel()
        request(false)
      }
    },
  )
  onDeactivated(() => {
    cancel()
    request(false)
  })
  onBeforeUnmount(cancel)
  return { visible, request, cancel }
}
