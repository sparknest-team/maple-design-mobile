import { computed } from 'vue'

export function useLoadingPlatform() {
  const customLoading = computed(() => undefined)

  return { customLoading }
}
