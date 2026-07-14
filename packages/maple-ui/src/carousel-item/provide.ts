import { type ComputedRef } from 'vue'
import { useParent } from '@maplejs/maple-use'
import { assert } from '@maplejs/maple-shared'
import { CAROUSEL_BIND_CAROUSEL_ITEM_KEY, type CarouselProvider } from '../carousel/provide'

export interface CarouselItemProvider {
  index: ComputedRef<number>
  isFocusing: ComputedRef<boolean>
  setTranslate(x: number): void
}

export function useCarousel() {
  const { bindParent, index, parentProvider } = useParent<CarouselProvider, CarouselItemProvider>(
    CAROUSEL_BIND_CAROUSEL_ITEM_KEY,
  )

  assert(!!bindParent, 'CarouselItem', '<mp-carousel-item/> must in <mp-carousel/>')

  return {
    index,
    carousel: parentProvider,
    bindCarousel: bindParent,
  }
}

export function getClosestIndex(
  target: number,
  current: number,
  length: number,
  loop: boolean,
): 'prev' | 'next' | 'active' {
  if (target === current) return 'active'
  if (loop) {
    const diff = ((target - current) % length + length) % length
    if (diff === 1 || diff === -(length - 1)) return 'next'
    if (diff === length - 1 || diff === -1) return 'prev'
  }
  return target < current ? 'prev' : 'next'
}
