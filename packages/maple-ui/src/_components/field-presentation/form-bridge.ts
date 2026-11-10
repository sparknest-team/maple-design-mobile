import { computed, inject, provide } from 'vue'
import { FORM_ITEM_BIND_CONTROL_KEY, useFormItem } from '../../form/item-provide'
import { isolateFormItemLabel } from '../../form/label-context'

export const usePresentationForm = useFormItem
export function isolateEditorForm() {
  isolateFormItemLabel()
  const parent = inject(FORM_ITEM_BIND_CONTROL_KEY, undefined)
  if (parent) {
    provide(FORM_ITEM_BIND_CONTROL_KEY, {
      ...parent,
      eventHandlers: computed(() => ({})),
      hasOuterLabel: computed(() => false),
      error: computed(() => false),
      errorMessage: computed(() => ''),
      feedback: computed(() => undefined),
      validateWithTrigger: () => {},
    })
  }
}
