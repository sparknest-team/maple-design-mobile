import { computed } from 'vue'

export { default as Scrollbar } from '../_components/selection-scrollbar'
export function useListEmpty() {
  return computed(() => undefined)
}
