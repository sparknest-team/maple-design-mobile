import { computed } from 'vue'
import { useFormItem } from '../../form/item-provide'
import { useForm } from '../../form/provide'
import type { DateFieldProps } from '../field-state'

export function useDateFieldForm(options: () => DateFieldProps) {
  const { form } = useForm()
  const item = useFormItem({ error: computed(() => options().error) })
  return {
    disabled: computed(() =>
      Boolean(form?.disabled.value || (!Array.isArray(options().disabled) && options().disabled)),
    ),
    readonly: computed(() => Boolean(form?.readonly.value || options().readonly)),
    error: item.mergedError,
    size: computed(() => options().size),
    hint: computed(() => !item.hasOuterLabel.value && options().hint),
    feedback: item.feedback,
    events: item.eventHandlers,
  }
}
