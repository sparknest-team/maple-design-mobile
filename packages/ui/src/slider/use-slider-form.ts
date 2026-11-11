import { computed } from 'vue'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import type { SliderProps } from './props'

export function useSliderForm(props: SliderProps) {
  const { form } = useForm()
  return useFormItem({
    disabled: computed(() => props.disabled),
    error: computed(() => props.error),
    readonly: computed(() => props.readonly),
    formDisabled: form?.disabled,
    formReadonly: form?.readonly,
  })
}
