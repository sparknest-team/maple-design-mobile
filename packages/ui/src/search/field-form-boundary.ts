import { computed, inject, provide } from 'vue'
import { FORM_ITEM_BIND_CONTROL_KEY } from '../form/item-provide'

/** The field selector changes Search's criterion, not a second Form value. */
export function useSearchFieldBoundary() {
  const context = inject(FORM_ITEM_BIND_CONTROL_KEY, undefined)
  if (context) {
    provide(
      FORM_ITEM_BIND_CONTROL_KEY,
      Object.create(context, {
        eventHandlers: { value: computed(() => ({})) },
        validateWithTrigger: { value: () => {} },
      }),
    )
  }
}
