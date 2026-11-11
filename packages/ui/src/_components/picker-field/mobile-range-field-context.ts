import { inject, provide, type InjectionKey } from 'vue'
import { useRangeFieldIndex as useSharedRangeFieldIndex } from './range-field-context'

// Mobile calendar, wheel and clock renderers inherit endpoint locks from their panel.
const rangeDisabledKey: InjectionKey<() => readonly boolean[]> = Symbol('range-disabled-parts')

export function useRangeDisabledParts() {
  return inject(rangeDisabledKey, () => [])
}

export function provideRangeDisabledParts(parts: () => readonly boolean[]) {
  const parent = useRangeDisabledParts()
  const merged = () => {
    const own = parts()
    const inherited = parent()
    return [Boolean(own[0] || inherited[0]), Boolean(own[1] || inherited[1])]
  }
  provide(rangeDisabledKey, merged)
  return merged
}

export function useRangeFieldIndex(disabled: () => readonly boolean[] = useRangeDisabledParts()) {
  return useSharedRangeFieldIndex(disabled)
}
