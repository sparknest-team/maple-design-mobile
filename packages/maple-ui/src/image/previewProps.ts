import { type PropType } from 'vue'
import { carouselProps } from '../carousel'
import { popupProps } from '../popup'
import { defineListenerProp, pickProps } from '../utils/components'

export const props = {
  visible: Boolean,
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
  'onUpdate:visible': defineListenerProp<(visible: boolean) => void>(),
  'onUpdate:current': defineListenerProp<(current: number) => void>(),
  onPreviewVisibleChange: defineListenerProp<(visible: boolean) => void>(),
  onLongPress: defineListenerProp<(index: number) => void>(),
  onClose: defineListenerProp<() => void>(),
  ...pickProps(carouselProps, ['loop', 'indicator', 'onChange']),
  ...pickProps(popupProps, [
    'lockScroll',
    'teleport',
    'closeOnKeyEscape',
    'onOpen',
    'onOpened',
    'onClosed',
    'onKeyEscape',
    'onRouteChange',
  ]),
}
