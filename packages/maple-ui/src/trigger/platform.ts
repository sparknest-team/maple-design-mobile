import { computed, type Ref } from 'vue'
import { useStack } from '../context/stack'
import { useZIndex } from '../context/zIndex'

export function useTriggerPlatform(visible: Readonly<Ref<boolean>>, ownerDocument?: () => Document | undefined) {
  const { zIndex } = useZIndex(() => visible.value, 1)
  const { onStackTop } = useStack(() => visible.value, zIndex, ownerDocument)
  return {
    zIndex,
    onStackTop,
    globalScrollToClose: computed(() => false),
    globalUpdateAtScroll: computed(() => false),
  }
}
