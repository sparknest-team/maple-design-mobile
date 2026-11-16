import { computed, inject, provide, type ComputedRef, type InjectionKey } from 'vue'
import { useId } from '../utils/vue-compat'

const errorDescriptionKey: InjectionKey<ComputedRef<string | undefined>> = Symbol('form-error-description')

export function provideFormErrorDescription(
  visible: () => boolean,
  noStyle: () => boolean,
  helpVisible: () => boolean = () => false,
) {
  const parent = inject(errorDescriptionKey, undefined)
  const uniqueId = useId()
  const id = `mp-form-error-${uniqueId}`
  const helpId = `mp-form-error-help-${uniqueId}`
  const current = computed(() => (noStyle() ? parent?.value : visible() ? id : helpVisible() ? helpId : undefined))
  provide(errorDescriptionKey, current)
  return { current, helpId, labelId: `mp-form-label-${uniqueId}` }
}

export function provideFormErrorDescriptionBoundary() {
  provide(
    errorDescriptionKey,
    computed(() => undefined),
  )
}

export function useFormErrorDescription() {
  const errorId = inject(errorDescriptionKey, undefined)
  return {
    errorId,
    describe(value: unknown) {
      const ids = typeof value === 'string' ? value.split(/[ \t\n\f\r]+/).filter(Boolean) : []
      if (errorId?.value && !ids.includes(errorId.value)) {
        ids.push(errorId.value)
      }
      return ids.join(' ') || undefined
    },
  }
}
