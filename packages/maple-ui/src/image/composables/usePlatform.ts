// @sync-with: cedar-ui/src/image/composables/usePlatform.ts

import { computed, onMounted, onUnmounted, ref } from 'vue'

export function usePlatform() {
  const isTouchPrimary = ref(false)
  const isFinePointer = ref(false)

  const update = () => {
    if (typeof window === 'undefined') {
      return
    }

    isTouchPrimary.value = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    isFinePointer.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }

  onMounted(() => {
    update()

    const coarseMedia = window.matchMedia('(hover: none) and (pointer: coarse)')
    const fineMedia = window.matchMedia('(hover: hover) and (pointer: fine)')

    coarseMedia.addEventListener('change', update)
    fineMedia.addEventListener('change', update)

    onUnmounted(() => {
      coarseMedia.removeEventListener('change', update)
      fineMedia.removeEventListener('change', update)
    })
  })

  const defaults = computed(() => ({
    closable: isFinePointer.value,
    maskClosable: isFinePointer.value,
    wheelZoom: isFinePointer.value,
    keyboard: isFinePointer.value,
    closeOnImageTap: isTouchPrimary.value,
  }))

  return {
    isTouchPrimary,
    isFinePointer,
    defaults,
  }
}
