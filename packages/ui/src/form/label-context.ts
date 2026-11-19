import { computed, inject, provide, ref, type ComputedRef, type InjectionKey } from 'vue'

type FormLabel = { id: string; target?: string }
const labelKey: InjectionKey<ComputedRef<FormLabel | undefined>> = Symbol('form-item-label')

export function provideFormItemLabel(options: {
  generated: string
  noStyle: () => boolean
  visible: () => boolean
  attributes: () => Record<string, unknown> | undefined
}) {
  const group = ref(false)
  const parent = inject(labelKey, undefined)
  const ownId = computed(() => {
    if (options.noStyle() || !options.visible()) {
      return undefined
    }
    const explicit = options.attributes()?.id
    if (explicit === undefined || explicit === null) {
      return options.generated
    }
    return typeof explicit === 'string' && explicit.length > 0 && !/[ \t\n\f\r]/.test(explicit) ? explicit : undefined
  })
  const label = computed(() => {
    if (options.noStyle()) {
      return parent?.value
    }
    if (!ownId.value) {
      return undefined
    }
    const attributes = options.attributes()
    const target = attributes?.for ?? attributes?.htmlFor
    if (group.value && !target) return undefined
    return { id: ownId.value, target: typeof target === 'string' && target ? target : undefined }
  })
  provide(labelKey, label)
  return { label, ownId, group }
}

export function useFormItemLabel() {
  return inject(labelKey, undefined)
}

export function isolateFormItemLabel() {
  provide(
    labelKey,
    computed(() => undefined),
  )
}
