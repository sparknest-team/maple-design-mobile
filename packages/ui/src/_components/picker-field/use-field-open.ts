import { computed, ref } from 'vue'

/** A controlled popup requests changes; only its owner can accept them. */
export function useFieldOpen(options: {
  value: () => boolean | undefined
  defaultValue?: () => boolean | undefined
  blocked: () => boolean
  onChange: (value: boolean) => void
}) {
  const localOpen = ref(Boolean(options.defaultValue?.()))
  const open = computed({
    get: () => options.value() ?? localOpen.value,
    set: (next: boolean) => {
      if (next === open.value || (next && options.blocked())) {
        return
      }
      localOpen.value = next
      options.onChange(next)
    },
  })
  return open
}
