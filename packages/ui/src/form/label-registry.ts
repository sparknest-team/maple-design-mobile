import {
  computed,
  inject,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  ref,
  shallowReactive,
  shallowRef,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from 'vue'

/** Tracks logical controls, not DOM nodes, so an editor can move to a popup. */
export function createFormLabelRegistry(
  labelId: ComputedRef<string | undefined>,
  ready: Readonly<Ref<boolean>> = ref(true),
) {
  const controls = shallowReactive(new Set<symbol>())
  return {
    count: computed(() => controls.size),
    groupLabel: computed(() => (ready.value && controls.size > 1 ? labelId.value : undefined)),
    register() {
      const key = Symbol('form-label-control')
      controls.add(key)
      let active = true
      return {
        label: computed(() => (ready.value && active && controls.size === 1 ? labelId.value : undefined)),
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
  const ready = ref(false)
  const registry = createFormLabelRegistry(labelId, ready)
  onMounted(() => {
    ready.value = true
  })
  provide(formLabelKey, registry)
  return registry
}

/** Unstyled items can share the nearest registry by not creating a provider. */
export function useFormLabelControl() {
  const registry = inject(formLabelKey, undefined)
  if (!registry) {
    return undefined
  }
  const control = shallowRef<ReturnType<FormLabelRegistry['register']> | undefined>(registry.register())
  const retire = () => {
    control.value?.unregister()
    control.value = undefined
  }
  onDeactivated(retire)
  onBeforeUnmount(retire)
  onActivated(() => {
    if (!control.value) {
      control.value = registry.register()
    }
  })
  return computed(() => control.value?.label.value)
}
