import type { ComputedRef, CSSProperties, InjectionKey } from 'vue'

export interface CarouselContext {
  keys: ComputedRef<Array<string | number | symbol>>
  current: ComputedRef<number>
  visible: ComputedRef<number[]>
  slideLabel: (index: number) => string
  itemStyle: (index: number) => CSSProperties
}
export const carouselInjectionKey: InjectionKey<CarouselContext> = Symbol('Carousel')
