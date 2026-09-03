import type { ComputedRef, Ref } from 'vue'
import { useChildren, useParent } from '@maplejs/maple-use'
import { type CarouselItemProvider } from './item-provide'
import type { CarouselEffect } from './props'

export interface CarouselProvider {
  size: Ref<number>
  currentIndex: Ref<number>
  vertical: ComputedRef<boolean>
  effect: Ref<CarouselEffect>
  loop: Ref<boolean>
  length: Ref<number>
}

export interface CarouselResizeListenerProvider {
  onResize(): void
}

export const CAROUSEL_BIND_CAROUSEL_ITEM_KEY = Symbol('CAROUSEL_BIND_CAROUSEL_ITEM_KEY')

export const CAROUSEL_RESIZE_DISPATCHER_BIND_CAROUSEL_RESIZE_LISTENER_KEY = Symbol(
  'CAROUSEL_RESIZE_DISPATCHER_BIND_CAROUSEL_RESIZE_LISTENER_KEY',
)

export function useCarouselItems() {
  const { childProviders, length, bindChildren } = useChildren<CarouselProvider, CarouselItemProvider>(
    CAROUSEL_BIND_CAROUSEL_ITEM_KEY,
  )

  return {
    length,
    carouselItems: childProviders,
    bindCarouselItems: bindChildren,
  }
}

export function useCarouselResizeListeners() {
  const { childProviders, bindChildren } = useChildren<null, CarouselResizeListenerProvider>(
    CAROUSEL_RESIZE_DISPATCHER_BIND_CAROUSEL_RESIZE_LISTENER_KEY,
  )

  return {
    carouselResizeListeners: childProviders,
    bindCarouselResizeListeners: bindChildren,
  }
}

export function useCarouselResizeDispatcher() {
  const { parentProvider, bindParent } = useParent<null, CarouselResizeListenerProvider>(
    CAROUSEL_RESIZE_DISPATCHER_BIND_CAROUSEL_RESIZE_LISTENER_KEY,
  )

  return {
    carouselResizeDispatcher: parentProvider,
    bindCarouselResizeDispatcher: bindParent,
  }
}
