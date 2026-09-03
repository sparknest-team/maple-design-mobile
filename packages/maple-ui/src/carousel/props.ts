import type { ExtractPropTypes, PropType } from 'vue'

export interface CarouselToOptions {
  event?: boolean
  isManual?: boolean
}

export interface CarouselChangeData {
  index: number
  prevIndex: number
  isManual: boolean
}

export type CarouselArrowType = 'always' | 'hover' | 'never'
export type CarouselDirection = 'horizontal' | 'vertical'
export type CarouselEffect = 'slide' | 'fade' | 'card'
export type CarouselIndicatorType = 'dot' | 'line' | 'slider'
export type CarouselIndicatorPosition = 'top' | 'bottom' | 'left' | 'right' | 'outer'
export type CarouselTriggerEvent = 'click' | 'hover'
export type CarouselAutoPlayConfig = {
  interval?: number
  hoverToPause?: boolean
}

export const props = {
  current: Number,
  defaultCurrent: {
    type: Number,
    default: 0,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoPlay: {
    type: [Boolean, Number, Object] as PropType<boolean | number | CarouselAutoPlayConfig>,
    default: false,
  },
  moveSpeed: {
    type: [String, Number],
    default: 300,
  },
  trigger: {
    type: String as PropType<CarouselTriggerEvent>,
    default: 'click',
  },
  direction: {
    type: String as PropType<CarouselDirection>,
    default: 'horizontal',
  },
  showArrow: {
    type: String as PropType<CarouselArrowType>,
    default: 'never',
  },
  arrowClass: String,
  indicator: {
    type: Boolean,
    default: true,
  },
  indicatorType: {
    type: String as PropType<CarouselIndicatorType>,
    default: 'dot',
  },
  indicatorPosition: {
    type: String as PropType<CarouselIndicatorPosition>,
    default: 'bottom',
  },
  indicatorClass: String,
  indicatorColor: String,
  height: String,
  transitionTimingFunction: {
    type: String,
    default: 'cubic-bezier(0.25, 0.8, 0.5, 1)',
  },
  touchable: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  mousewheel: {
    type: Boolean,
    default: false,
  },
  keyboard: {
    type: Boolean,
    default: false,
  },
  slidesPerView: {
    type: [String, Number] as PropType<number | 'auto'>,
    default: 1,
  },
  spaceBetween: {
    type: [String, Number],
    default: 0,
  },
  effect: {
    type: String as PropType<CarouselEffect>,
    default: 'slide',
  },
  centeredSlides: {
    type: Boolean,
    default: false,
  },
}

export type CarouselProps = ExtractPropTypes<typeof props>
