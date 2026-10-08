import { computed } from 'vue'
import { useFormItem } from '../../form/item-provide'
import { useForm } from '../../form/provide'
import type { TimeFieldProps } from '../field-state'

export function useTimeFieldForm(options: () => TimeFieldProps) {
  const { form } = useForm()
  const item = useFormItem({ error: computed(() => options().error) })
  return {
    disabled: computed(() => Boolean(form?.disabled.value || options().disabled)),
    readonly: computed(() => Boolean(form?.readonly.value || options().readonly)),
    error: item.mergedError,
    size: computed(() => options().size),
    hint: computed(() => !item.hasOuterLabel.value && options().hint),
    feedback: item.feedback,
    events: item.eventHandlers,
  }
}
