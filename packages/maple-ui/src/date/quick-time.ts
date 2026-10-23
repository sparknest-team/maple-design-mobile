import { computed, type ComputedRef } from 'vue'
import type { DisabledTime } from './time-constraints'

/** Quick choices never round the actual model; only an explicit selection writes a value. */
export function useQuickTime(time: ComputedRef<string>, rules: ComputedRef<DisabledTime | undefined>) {
  const options = computed(() =>
    Array.from({ length: 48 }, (_, index) => {
      const hour = Math.floor(index / 2),
        minute = (index % 2) * 30
      const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      return { text: value, value, hour, minute }
    }).filter(
      ({ hour, minute }) =>
        !rules.value?.hours?.(hour) &&
        !rules.value?.minutes?.(minute, hour) &&
        !rules.value?.seconds?.(0, hour, minute),
    ),
  )
  const columns = computed(() =>
    options.value.length ? options.value : [{ text: time.value.slice(0, 5), value: time.value.slice(0, 5) }],
  )
  const value = computed(() => {
    const [hour, minute] = time.value.split(':').map(Number)
    const nearest = options.value.reduce<(typeof options.value)[number] | undefined>(
      (closest, option) =>
        !closest ||
        Math.abs(option.hour * 60 + option.minute - hour * 60 - minute) <
          Math.abs(closest.hour * 60 + closest.minute - hour * 60 - minute)
          ? option
          : closest,
      undefined,
    )
    return [nearest?.value ?? time.value.slice(0, 5)]
  })
  return { options, columns, value }
}
