import { computed, type Slot } from 'vue'

/** Maple configures empty content through the component's local empty slot. */
export function useEmptySlot() {
  return computed<Slot | undefined>(() => undefined)
}
