import {
  computed,
  getCurrentInstance,
  inject,
  onScopeDispose,
  provide,
  shallowRef,
  type ComputedRef,
  type InjectionKey,
  type PropType,
} from 'vue'

export type EmptyValue<T> = T | null | (() => T | null)
/** Omitted preserves the component default. A factory may explicitly return undefined. */
export function emptyValueProp<T>() {
  return {
    type: [String, Number, Boolean, Object, Array, Function] as PropType<EmptyValue<T>>,
    default: undefined,
  }
}
export function resolveEmptyValue<T>(props: { emptyValue?: EmptyValue<T> }, fallback: T): T | null {
  const configured = props.emptyValue
  const value =
    configured === undefined ? fallback : typeof configured === 'function' ? (configured as () => T)() : configured
  return (Array.isArray(value) ? value.slice() : value) as T | null
}

/** Input recognition only; never used to decide controlled ownership. */
export const DEFAULT_EMPTY_VALUES: readonly unknown[] = Object.freeze([undefined, null, ''])
export interface EmptyValuePolicyProps {
  emptyValues?: readonly unknown[]
  emptyText?: string
}
export const emptyValuesProp = {
  type: Array as PropType<readonly unknown[]>,
  default: undefined,
}
export const emptyTextProp = { type: String, default: undefined }

/** Empty containers stay empty; members do not make a non-empty collection empty. */
export function isEmptyValue(value: unknown, values: readonly unknown[] = DEFAULT_EMPTY_VALUES): boolean {
  return (Array.isArray(value) && value.length === 0) || values.includes(value)
}
interface EmptyValuePolicy {
  emptyValues: ComputedRef<readonly unknown[] | undefined>
  emptyText: ComputedRef<string | undefined>
  hasCustomEmptyValues: ComputedRef<boolean>
  isEmpty: (value: unknown) => boolean
}
interface EmptyValueContext extends EmptyValuePolicy {
  registerField?: (policy: EmptyValuePolicy) => () => void
}
const emptyValueContextKey: InjectionKey<EmptyValueContext> = Symbol('empty-value-policy')

function createEmptyPolicy(
  props: EmptyValuePolicyProps,
  parent?: EmptyValueContext,
  defaults: readonly unknown[] = DEFAULT_EMPTY_VALUES,
) {
  const emptyValues = computed(() => props.emptyValues ?? parent?.emptyValues.value)
  const emptyText = computed(() => props.emptyText ?? parent?.emptyText.value)
  return {
    emptyValues,
    emptyText,
    hasCustomEmptyValues: computed(() => emptyValues.value !== undefined),
    isEmpty: (value: unknown) => isEmptyValue(value, emptyValues.value ?? defaults),
  }
}

/** Form/Item settings remain reactive; only Item registers its primary fields. */
export function provideEmptyValues(props: EmptyValuePolicyProps, registerFields = false) {
  const parent = inject(emptyValueContextKey, undefined)
  const policy = createEmptyPolicy(props, parent)
  const fields = new Map<symbol, EmptyValuePolicy>()
  const active = shallowRef<EmptyValuePolicy>()
  const context: EmptyValueContext = { ...policy }
  if (registerFields) {
    context.registerField = (field) => {
      const key = Symbol('primary-field')
      fields.set(key, field)
      active.value = field
      return () => {
        fields.delete(key)
        const remaining = [...fields.values()]
        active.value = remaining[remaining.length - 1]
      }
    }
  }
  provide(emptyValueContextKey, context)
  return {
    ...policy,
    hasCustomEmptyValues: computed(() => active.value?.hasCustomEmptyValues.value ?? policy.hasCustomEmptyValues.value),
    isEmpty: (value: unknown) => (active.value ?? policy).isEmpty(value),
  }
}

/** Resolve recognition/display separately from clear output and model ownership. */
export function useEmptyValues(
  props: EmptyValuePolicyProps,
  defaults: readonly unknown[] = DEFAULT_EMPTY_VALUES,
  register = false,
) {
  const parent = getCurrentInstance() ? inject(emptyValueContextKey, undefined) : undefined
  const policy = createEmptyPolicy(props, parent, defaults)
  if (register && parent?.registerField) {
    onScopeDispose(parent.registerField(policy))
  }
  return {
    ...policy,
    emptyText: computed(() => policy.emptyText.value ?? '-'),
  }
}
