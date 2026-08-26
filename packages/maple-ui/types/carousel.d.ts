import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const carouselProps: Record<keyof CarouselProps, any>

export interface CarouselToOptions {
  event?: boolean
  isManual?: boolean
}

export interface CarouselChangeData {
  index: number
  prevIndex: number
  isManual: boolean
}

export type CarouselShowArrow = 'hover' | 'always' | 'never'
export type CarouselDirection = 'horizontal' | 'vertical'
export type CarouselEffect = 'slide' | 'fade' | 'card'
export type CarouselIndicatorType = 'dot' | 'line' | 'slider'
export type CarouselIndicatorPosition = 'top' | 'bottom' | 'left' | 'right' | 'outer'
export type CarouselTrigger = 'click' | 'hover'

export interface CarouselAutoPlayConfig {
  interval?: number
  hoverToPause?: boolean
}

export interface CarouselProps extends BasicAttributes {
  current?: number
  defaultCurrent?: number
  loop?: boolean
  autoPlay?: boolean | string | number | CarouselAutoPlayConfig
  moveSpeed?: string | number
  showArrow?: CarouselShowArrow
  indicator?: boolean
  indicatorColor?: string
  indicatorClass?: string
  arrowClass?: string
  indicatorType?: CarouselIndicatorType
  indicatorPosition?: CarouselIndicatorPosition
  direction?: CarouselDirection
  touchable?: boolean
  draggable?: boolean
  effect?: CarouselEffect
  slidesPerView?: number | 'auto'
  spaceBetween?: string | number
  centeredSlides?: boolean
  height?: string
  transitionTimingFunction?: string
  trigger?: CarouselTrigger
  mousewheel?: boolean
  keyboard?: boolean
  onChange?: ListenerProp<(data: CarouselChangeData) => void>
  'onUpdate:current'?: ListenerProp<(index: number) => void>
}

export type CarouselPrev = (options?: CarouselToOptions) => void
export type CarouselNext = (options?: CarouselToOptions) => void
export type CarouselTo = (index: number, options?: CarouselToOptions) => void

export interface CarouselIndicatorData {
  index: number
  length: number
  hovering: boolean
  prev: CarouselPrev
  next: CarouselNext
  to: CarouselTo
}

export class Carousel extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<CarouselProps>

  $props: CarouselProps

  $slots: {
    default(): VNode[]
    prev(data: CarouselIndicatorData): VNode[]
    next(data: CarouselIndicatorData): VNode[]
    indicator(data: CarouselIndicatorData): VNode[]
  }

  resize(): void
  prev: CarouselPrev
  next: CarouselNext
  to: CarouselTo
}

export class _CarouselComponent extends Carousel {}
