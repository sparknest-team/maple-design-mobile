import { computed } from 'vue'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import type { RateProps } from './props'

export function useRateForm(props: RateProps) {
  const { form } = useForm()
  return useFormItem({
    disabled: computed(() => props.disabled),
    readonly: computed(() => props.readonly),
    formDisabled: form?.disabled,
    formReadonly: form?.readonly,
  })
}
