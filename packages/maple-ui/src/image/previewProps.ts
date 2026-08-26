import { type PropType } from 'vue'
import { carouselProps } from '../carousel'
import { popupProps } from '../popup'
import { pickProps } from '../utils/components'

export const props = {
  open: Boolean,
  imagePreventDefault: Boolean,
  src: String,
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  current: {
    type: [String, Number],
    default: 0,
  },
  zoom: {
    type: [String, Number],
    default: 2,
  },
  closable: Boolean,
  maskClosable: Boolean,
  ...pickProps(carouselProps, ['loop', 'indicator']),
  ...pickProps(popupProps, ['lockScroll', 'popupContainer', 'escToClose']),
}
