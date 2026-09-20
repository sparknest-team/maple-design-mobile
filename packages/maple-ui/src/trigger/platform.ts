import { computed, type Ref } from 'vue'
import { useStack } from '../context/stack'
import { useZIndex } from '../context/zIndex'

export const triggerResizeObserverFallback: typeof ResizeObserver | undefined = undefined

export function useTriggerPlatform(visible: Readonly<Ref<boolean>>) {
  const { zIndex } = useZIndex(() => visible.value, 1)
  const { onStackTop } = useStack(() => visible.value, zIndex)
  return {
    zIndex,
    onStackTop,
    globalScrollToClose: computed(() => false),
    globalUpdateAtScroll: computed(() => false),
  }
}
