import { type PropType } from 'vue'
import { carouselProps } from '../carousel'
import { popupProps } from '../popup'
import { pickProps } from '../utils/components'

export const props = {
  open: {
    type: Boolean,
    default: undefined,
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  imagePreventDefault: Boolean,
  src: String,
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  current: {
    type: Number,
    default: undefined,
  },
  defaultCurrent: {
    type: Number,
    default: 0,
  },
  zoom: {
    type: [String, Number],
    default: 2,
  },
  closable: {
    type: Boolean,
    default: undefined,
  },
  maskClosable: {
    type: Boolean,
    default: undefined,
  },
  ...pickProps(carouselProps, ['loop', 'indicator']),
  ...pickProps(popupProps, ['lockScroll', 'popupContainer', 'escToClose']),
}
