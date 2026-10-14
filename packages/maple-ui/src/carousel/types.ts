import type { VNodeChild } from 'vue'

export type CarouselTriggerEvent = 'click' | 'hover'
export type CarouselArrowType = 'always' | 'hover' | 'never'
export type CarouselIndicatorType = 'dot' | 'line' | 'slider'
export type CarouselIndicatorPosition = 'bottom' | 'top' | 'left' | 'right' | 'outer'
export type CarouselEffect = 'slide' | 'fade' | 'card'
export type CarouselDirection = import('../utils/constants').Orientation
export interface CarouselAutoPlayConfig {
  interval?: number
  hoverToPause?: boolean
}
export interface CarouselToOptions {
  event?: boolean
  isManual?: boolean
}
export interface CarouselChangeData {
  index: number
  prevIndex: number
  isManual: boolean
}
export interface CarouselEmits {
  'update:current': [index: number]
  change: [index: number, prevIndex: number, isManual: boolean]
}
export interface CarouselExpose {
  next: (options?: CarouselToOptions) => void
  prev: (options?: CarouselToOptions) => void
  to: (index: number, options?: CarouselToOptions) => void
  resize: () => void
}
export interface CarouselSlotScope extends CarouselExpose {
  index: number
  length: number
  hovering: boolean
}
export interface CarouselSlots {
  default?: () => VNodeChild
  prev?: (scope: CarouselSlotScope) => VNodeChild
  next?: (scope: CarouselSlotScope) => VNodeChild
  indicator?: (scope: CarouselSlotScope) => VNodeChild
}
export interface CarouselItemSlots {
  default?: () => VNodeChild
}
