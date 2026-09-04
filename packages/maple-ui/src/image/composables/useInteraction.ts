import { computed, onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import type { ImageInteraction } from '../api'

export function useImageInteraction(interaction: Ref<ImageInteraction | undefined>) {
  const detected = ref<'desktop' | 'touch'>('desktop')
  let coarsePointer: MediaQueryList | undefined

  const update = () => {
    detected.value = coarsePointer?.matches ? 'touch' : 'desktop'
  }

  onMounted(() => {
    if (typeof window.matchMedia !== 'function') {
      return
    }
    coarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)')
    update()
    coarsePointer.addEventListener('change', update)
  })

  onBeforeUnmount(() => coarsePointer?.removeEventListener('change', update))

  const mode = computed(() => {
    const requested = interaction.value ?? 'auto'
    return requested === 'auto' ? detected.value : requested
  })

  return {
    mode,
    isDesktop: computed(() => mode.value === 'desktop'),
    isTouch: computed(() => mode.value === 'touch'),
  }
}
