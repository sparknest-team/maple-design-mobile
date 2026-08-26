import { PropType } from 'vue'

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
  autoPlay: [Boolean, String, Number, Object] as PropType<
    boolean | string | number | { interval?: number; hoverToPause?: boolean }
  >,
  moveSpeed: {
    type: [String, Number],
    default: 300,
  },
  showArrow: {
    type: String as PropType<CarouselShowArrow>,
    default: 'never',
  },
  indicator: {
    type: Boolean,
    default: true,
  },
  indicatorColor: String,
  indicatorClass: String,
  arrowClass: String,
  indicatorType: {
    type: String as PropType<CarouselIndicatorType>,
    default: 'dot',
  },
  indicatorPosition: {
    type: String as PropType<CarouselIndicatorPosition>,
    default: 'bottom',
  },
  direction: {
    type: String as PropType<CarouselDirection>,
    default: 'horizontal',
  },
  touchable: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String as PropType<CarouselEffect>,
    default: 'slide',
  },
  slidesPerView: {
    type: [String, Number] as PropType<number | 'auto'>,
    default: 1,
  },
  spaceBetween: {
    type: [String, Number],
    default: 0,
  },
  centeredSlides: {
    type: Boolean,
    default: false,
  },
  height: String,
  transitionTimingFunction: {
    type: String,
    default: 'cubic-bezier(0.25, 0.8, 0.5, 1)',
  },
  trigger: {
    type: String as PropType<CarouselTrigger>,
    default: 'click',
  },
  mousewheel: {
    type: Boolean,
    default: false,
  },
  keyboard: {
    type: Boolean,
    default: false,
  },
}
