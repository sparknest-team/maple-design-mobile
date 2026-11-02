import { computed, type ComputedRef } from 'vue'
import type { ComponentSize } from '../utils/constants'

// Maple has no global size/RTL provider. Explicit size/default setters and DOM dir remain supported.
export function useTabsConfiguration(size: ComputedRef<ComponentSize | undefined>) {
  return { size: computed(() => size.value ?? 'md') }
}
