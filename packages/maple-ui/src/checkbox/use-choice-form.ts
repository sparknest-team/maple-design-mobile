import { toRef } from 'vue'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import type { ComponentSize } from '../utils/constants'

export function useChoiceForm(props: {
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  size?: ComponentSize
}) {
  const { form } = useForm()
  return useFormItem({
    size: toRef(props, 'size'),
    formSize: form?.size,
    disabled: toRef(props, 'disabled'),
    readonly: toRef(props, 'readonly'),
    error: toRef(props, 'error'),
    formDisabled: form?.disabled,
    formReadonly: form?.readonly,
  })
}
