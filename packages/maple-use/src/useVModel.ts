import { computed, nextTick, ref, watch, type Ref } from 'vue'
import { call } from '@maplejs/maple-shared'

export interface UseVModelOptions<P, K extends keyof P> {
  passive?: boolean
  eventName?: string
  defaultValue?: P[K]
  emit?: (event: any, value: any) => void
}

export function useVModel<P extends Record<string, any>, K extends keyof P>(
  props: P,
  key: K,
  options: UseVModelOptions<P, K> = {},
): Ref<P[K]> {
  const { passive = true, eventName, defaultValue, emit } = options
  const event = eventName ?? `${emit ? 'update' : 'onUpdate'}:${key.toString()}`

  const getValue = () => (props[key] ?? defaultValue)!

  if (!passive) {
    return computed<P[K]>({
      get() {
        return getValue()
      },
      set(value) {
        emit ? emit(event, value) : call(props[event], value)
      },
    }) as Ref<P[K]>
  }

  // Vue's ref() unwraps generic values, which makes assignments to P[K]
  // incorrectly resolve to the internal UnwrapRefSimple generic `S`.
  const proxy = ref(getValue()) as Ref<P[K]>
  let shouldEmit = true

  watch(
    () => props[key],
    () => {
      shouldEmit = false
      proxy.value = getValue()

      nextTick(() => {
        shouldEmit = true
      })
    },
  )

  watch(
    () => proxy.value,
    (newValue: P[K]) => {
      if (!shouldEmit) {
        return
      }

      emit ? emit(event, newValue) : call(props[event], newValue)
    },
  )

  return proxy
}
