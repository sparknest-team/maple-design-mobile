import type { Slot } from 'vue'

/** Maple currently configures empty content through the component's empty slot. */
export function useEmptySlot(): Slot | undefined {
  return undefined
}
