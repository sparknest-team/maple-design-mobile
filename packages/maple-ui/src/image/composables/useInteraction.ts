import { computed, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, type Ref } from 'vue'
import type { ImageInteraction } from '../api'

export function useImageInteraction(interaction: Ref<ImageInteraction | undefined>) {
  const detected = ref<'desktop' | 'touch'>('desktop')
  let coarsePointer: MediaQueryList | undefined
  let listener: (() => void) | undefined
  let generation = 0
  let active = true
  let disposed = false

  function bind() {
    if (!active || disposed || coarsePointer || typeof window.matchMedia !== 'function') {
      return
    }
    const query = window.matchMedia('(hover: none) and (pointer: coarse)')
    const binding = ++generation
    coarsePointer = query
    const update = () => {
      if (!active || disposed || binding !== generation) {
        return
      }
      detected.value = query.matches ? 'touch' : 'desktop'
    }
    listener = update
    update()
    query.addEventListener('change', update)
  }
  function unbind() {
    generation++
    if (listener) {
      coarsePointer?.removeEventListener('change', listener)
    }
    listener = undefined
    coarsePointer = undefined
  }
  onMounted(bind)
  onActivated(() => {
    if (!disposed) {
      active = true
      bind()
    }
  })
  onDeactivated(() => {
    active = false
    unbind()
  })
  onBeforeUnmount(() => {
    disposed = true
    active = false
    unbind()
  })

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
