import { computed, inject, onBeforeUnmount, provide, shallowReactive, type ComputedRef, type InjectionKey } from 'vue'

/** Tracks logical controls, not DOM nodes, so an editor can move to a popup. */
export function createFormLabelRegistry(labelId: ComputedRef<string | undefined>) {
  const controls = shallowReactive(new Set<symbol>())
  return {
    count: computed(() => controls.size),
    groupLabel: computed(() => (controls.size > 1 ? labelId.value : undefined)),
    register() {
      const key = Symbol('form-label-control')
      controls.add(key)
      let active = true
      return {
        label: computed(() => (active && controls.size === 1 ? labelId.value : undefined)),
        unregister() {
          if (!active) {
            return
          }
          active = false
          controls.delete(key)
        },
      }
    },
  }
}

type FormLabelRegistry = ReturnType<typeof createFormLabelRegistry>
const formLabelKey: InjectionKey<FormLabelRegistry> = Symbol('form-label-registry')

/** A styled nested item creates its own ownership boundary. */
export function provideFormLabelRegistry(labelId: ComputedRef<string | undefined>) {
  const registry = createFormLabelRegistry(labelId)
  provide(formLabelKey, registry)
  return registry
}

/** Unstyled items can share the nearest registry by not creating a provider. */
export function useFormLabelControl() {
  const registry = inject(formLabelKey, undefined)
  const control = registry?.register()
  if (control) {
    onBeforeUnmount(control.unregister)
  }
  return control?.label
}
