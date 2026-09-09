import { computed, nextTick, ref, watch, type Ref } from 'vue'
import { call } from '@maplejs/maple-shared'

// Deferred inference also supports the TypeScript 5.3 package build.
type ModelEvent<T> = [T][T extends any ? 0 : never]

export interface UseVModelOptions<P, K extends keyof P, E extends string = `update:${K & (string | number)}`> {
  passive?: boolean
  eventName?: E
  defaultValue?: P[K]
  emit?: (event: ModelEvent<E>, value: P[K]) => void
}

export function useVModel<
  P extends Record<string, any>,
  K extends keyof P,
  E extends string = `update:${K & (string | number)}`,
>(props: P, key: K, options: UseVModelOptions<P, K, E> = {}): Ref<P[K]> {
  const { passive = true, eventName, defaultValue, emit } = options
  const event = (eventName ?? `${emit ? 'update' : 'onUpdate'}:${key.toString()}`) as E

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
