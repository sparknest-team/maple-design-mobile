import { computed, onMounted, ref, watch } from 'vue'
import { getHighestPopupZIndex } from '../utils/popup-layer'
import context from './index'

export function useZIndex(source: () => boolean, count: number) {
  // SSR and the first hydration render must not depend on earlier client popups.
  const zIndex = ref(2000)
  let mounted = false
  const allocate = () => {
    context.zIndex += process.env.NODE_ENV === 'test' ? 0 : count
    zIndex.value = context.zIndex
  }
  watch(source, (active) => {
    if (mounted && active) {
      allocate()
    }
  })
  onMounted(() => {
    mounted = true
    if (source()) {
      allocate()
    } else {
      zIndex.value = context.zIndex
    }
  })
  return { zIndex }
}

/** Feedback stays above active popups without becoming a modal interaction layer. */
export function useFeedbackZIndex(ownerDocument: () => Document | undefined) {
  const mounted = ref(false)
  onMounted(() => {
    mounted.value = true
  })
  return computed(() => (mounted.value ? Math.max(context.zIndex, getHighestPopupZIndex(ownerDocument())) + 1 : 2000))
}
