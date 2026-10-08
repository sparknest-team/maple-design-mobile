import { computed, inject, provide, ref, type InjectionKey, type Ref } from 'vue'

// Each field owner provides its own state. Standalone panels get a local fallback.
const rangeFieldKey: InjectionKey<Ref<number>> = Symbol('range-field-index')

export function provideRangeField() {
  const activeIndex = ref(0)
  provide(rangeFieldKey, activeIndex)
  return activeIndex
}

/** A panel inherits its field index, or owns one index shared by its local renderers. */
export function provideRangePanel() {
  const activeIndex = inject(rangeFieldKey, undefined) ?? ref(0)
  provide(rangeFieldKey, activeIndex)
  return activeIndex
}

export function useRangeFieldIndex(disabled: () => readonly boolean[] = () => []) {
  const activeIndex = inject(rangeFieldKey, undefined) ?? ref(0)
  return computed({
    get: () => {
      const index = activeIndex.value === 1 ? 1 : 0
      return disabled()[index] && !disabled()[index ^ 1] ? index ^ 1 : index
    },
    set: (index: number) => {
      if ((index === 0 || index === 1) && !disabled()[index]) {
        activeIndex.value = index
      }
    },
  })
}
