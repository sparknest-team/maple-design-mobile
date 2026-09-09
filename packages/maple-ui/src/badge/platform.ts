import { computed } from 'vue'

// Maple inherits dir from the document or the caller; it has no ConfigProvider.
export function useBadgeDirection() {
  return computed(() => undefined)
}
