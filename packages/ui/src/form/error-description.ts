import { computed, inject, provide, useId, type ComputedRef, type InjectionKey } from 'vue'

const errorDescriptionKey: InjectionKey<ComputedRef<string | undefined>> = Symbol('form-error-description')

export function provideFormErrorDescription(visible: () => boolean, noStyle: () => boolean) {
  const parent = inject(errorDescriptionKey, undefined)
  const uniqueId = useId()
  const id = `mp-form-error-${uniqueId}`
  const current = computed(() => (noStyle() ? parent?.value : visible() ? id : undefined))
  provide(errorDescriptionKey, current)
  return { current, labelId: `mp-form-label-${uniqueId}` }
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
      const ids = typeof value === 'string' ? value.split(/\s+/).filter(Boolean) : []
      if (errorId?.value && !ids.includes(errorId.value)) {
        ids.push(errorId.value)
      }
      return ids.join(' ') || undefined
    },
  }
}
