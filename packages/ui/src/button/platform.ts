import { computed } from 'vue'
import type { ComponentSize } from '../utils/constants'

// Maple has no application-level size provider; retain its existing md fallback.
export function useButtonDefaultSize() {
  return computed<ComponentSize>(() => 'md')
}
