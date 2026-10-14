import { computed, inject, provide } from 'vue'
import { FORM_ITEM_BIND_CONTROL_KEY } from '../form/item-provide'

export function useSliderInputForm() {
  const parent = inject(FORM_ITEM_BIND_CONTROL_KEY, undefined)
  if (parent) {
    provide(FORM_ITEM_BIND_CONTROL_KEY, { ...parent, eventHandlers: computed(() => ({})) })
  }
}
