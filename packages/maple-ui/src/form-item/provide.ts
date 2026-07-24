import { computed, inject, provide, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import { type FormItemValidateTrigger } from './props'

export interface FormItemEventHandlers {
  onChange?: () => void
  onInput?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
}

export interface FormItemProvider {
  error: ComputedRef<boolean>
  errorMessage: ComputedRef<string>
  disabled: ComputedRef<boolean>
  hasOuterLabel: ComputedRef<boolean>
  eventHandlers: ComputedRef<FormItemEventHandlers>
  validateWithTrigger: (trigger: FormItemValidateTrigger) => void
}

export const FORM_ITEM_BIND_CONTROL_KEY: InjectionKey<FormItemProvider> = Symbol('FORM_ITEM_BIND_CONTROL_KEY')

export function useFormItem(options: { disabled?: Ref<boolean> | ComputedRef<boolean> } = {}) {
  const formItem = inject(FORM_ITEM_BIND_CONTROL_KEY, null)

  const mergedDisabled = computed(() => options.disabled?.value || formItem?.disabled.value || false)
  const mergedError = computed(() => formItem?.error.value || false)
  const errorMessage = computed(() => formItem?.errorMessage.value || '')
  const eventHandlers = computed(() => formItem?.eventHandlers.value || {})
  const hasOuterLabel = computed(() => formItem?.hasOuterLabel.value || false)

  return {
    formItem,
    mergedDisabled,
    mergedError,
    errorMessage,
    eventHandlers,
    hasOuterLabel,
  }
}

export function bindFormItem(provider: FormItemProvider) {
  provide(FORM_ITEM_BIND_CONTROL_KEY, provider)
}
