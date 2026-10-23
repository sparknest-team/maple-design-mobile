import { computed, inject, provide, toRef } from 'vue'
import { fieldControlFormEvents, fieldEditorBoundary } from '../_components/field-presentation/context'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import { inputGroupKey } from './context'
import type { InputProps } from './props'

/** Connect field controls to Maple's existing Form system. */
export function useInputForm(props: Readonly<Pick<InputProps, 'size' | 'disabled' | 'readonly' | 'error'>>) {
  const boundary = inject(fieldEditorBoundary, false)
  const ownFormEvents = inject(fieldControlFormEvents, undefined)
  const notifyForm = computed(() => !boundary || ownFormEvents?.value === true)
  provide(
    fieldControlFormEvents,
    computed(() => false),
  )
  const group = inject(inputGroupKey, undefined)
  const { form } = useForm()
  const state = useFormItem({
    size: computed(() => props.size ?? group?.size.value),
    disabled: computed(() => props.disabled ?? group?.disabled.value),
    readonly: computed(() => props.readonly ?? group?.readonly.value),
    error: toRef(props, 'error'),
    formSize: form?.size,
    formDisabled: form?.disabled,
    formReadonly: form?.readonly,
  })
  return {
    ...state,
    group,
    eventHandlers: computed(() => (notifyForm.value ? state.eventHandlers.value : {})),
    hasOuterLabel: computed(() => notifyForm.value && state.hasOuterLabel.value),
  }
}
