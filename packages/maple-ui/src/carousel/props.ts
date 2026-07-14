import { PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

export interface CarouselToOptions {
  event?: boolean
  isManual?: boolean
}

export interface CarouselChangeData {
  index: number
  prevIndex: number
  isManual: boolean
}

export type CarouselNavigation = 'hover' | 'always' | 'never'
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
  autoplay: [Boolean, String, Number, Object] as PropType<
    boolean | string | number | { interval?: number; hoverToPause?: boolean }
  >,
  duration: {
    type: [String, Number],
    default: 300,
  },
  initialIndex: {
    type: [String, Number],
    default: 0,
  },
  navigation: {
    type: [Boolean, String] as PropType<boolean | CarouselNavigation>,
    default: false,
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
  vertical: Boolean,
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
  'onUpdate:current': defineListenerProp<(index: number) => void>(),
  onChange: defineListenerProp<(index: number, prevIndex: number, isManual: boolean) => void>(),
}
