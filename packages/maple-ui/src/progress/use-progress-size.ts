import { computed } from 'vue'
import type { ProgressSize } from './size'

// Maple has no ConfigProvider size context; the independent default is md.
export function useProgressSize(size: () => ProgressSize | undefined) {
  return computed(() => size() ?? 'md')
}
