import { computed, inject, toRef } from 'vue'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import { inputGroupKey } from './context'
import type { InputProps } from './props'

/** Connect field controls to Maple's existing Form system. */
export function useInputForm(props: Readonly<Pick<InputProps, 'size' | 'disabled' | 'readonly' | 'error'>>) {
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
  return { ...state, group }
}
