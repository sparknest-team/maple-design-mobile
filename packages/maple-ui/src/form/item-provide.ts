import { computed, inject, provide, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import { type ComponentSize } from '../utils/constants'
import { resolveFormControlState } from '../utils/form-control-context'
import { type FormItemValidateTrigger } from './item-props'

export interface FormItemEventHandlers {
  onChange?: (event?: Event) => void
  onInput?: (event?: Event) => void
  onFocus?: (event?: Event) => void
  onBlur?: (event?: Event) => void
  onClear?: (event?: Event) => void
}

export interface FormItemProvider {
  error: ComputedRef<boolean>
  errorMessage: ComputedRef<string>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  size: ComputedRef<ComponentSize | undefined>
  hasOuterLabel: ComputedRef<boolean>
  feedback?: ComputedRef<string | undefined>
  eventHandlers: ComputedRef<FormItemEventHandlers>
  validateWithTrigger: (trigger: FormItemValidateTrigger) => void
}

export const FORM_ITEM_BIND_CONTROL_KEY: InjectionKey<FormItemProvider> = Symbol('FORM_ITEM_BIND_CONTROL_KEY')

export function useFormItem(
  options: {
    disabled?: Ref<boolean | undefined> | ComputedRef<boolean | undefined>
    readonly?: Ref<boolean | undefined> | ComputedRef<boolean | undefined>
    size?: Ref<ComponentSize | undefined> | ComputedRef<ComponentSize | undefined>
    error?: Ref<boolean | undefined> | ComputedRef<boolean | undefined>
    formDisabled?: Ref<boolean | undefined> | ComputedRef<boolean | undefined>
    formReadonly?: Ref<boolean | undefined> | ComputedRef<boolean | undefined>
    formSize?: Ref<ComponentSize | undefined> | ComputedRef<ComponentSize | undefined>
  } = {},
) {
  const formItem = inject(FORM_ITEM_BIND_CONTROL_KEY, null)

  const mergedDisabled = computed(() =>
    resolveFormControlState(options.disabled?.value, formItem?.disabled.value, options.formDisabled?.value, false),
  )
  const mergedReadonly = computed(() =>
    resolveFormControlState(options.readonly?.value, formItem?.readonly.value, options.formReadonly?.value, false),
  )
  const mergedSize = computed(() =>
    resolveFormControlState(options.size?.value, formItem?.size.value, options.formSize?.value, 'md'),
  )
  const mergedError = computed(() =>
    resolveFormControlState(options.error?.value, formItem?.error.value, undefined, false),
  )
  const errorMessage = computed(() => formItem?.errorMessage.value || '')
  const eventHandlers = computed(() => formItem?.eventHandlers.value || {})
  const hasOuterLabel = computed(() => formItem?.hasOuterLabel.value || false)
  const feedback = computed(() => formItem?.feedback?.value)

  return {
    formItem,
    mergedDisabled,
    mergedReadonly,
    mergedSize,
    mergedError,
    errorMessage,
    eventHandlers,
    hasOuterLabel,
    feedback,
  }
}

export function bindFormItem(provider: FormItemProvider) {
  provide(FORM_ITEM_BIND_CONTROL_KEY, provider)
}
