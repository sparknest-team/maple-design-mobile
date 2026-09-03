import { type PropType } from 'vue'
import type { ImagePreviewProps } from './types'

export const imagePreviewGroupProps = {
  images: {
    type: Array as PropType<string[]>,
  },
  open: {
    type: Boolean,
    default: undefined,
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  current: {
    type: Number,
    default: undefined,
  },
  defaultCurrent: {
    type: Number,
    default: 0,
  },
  loop: {
    type: Boolean,
    default: undefined,
  },
  closable: {
    type: Boolean,
    default: undefined,
  },
  maskClosable: {
    type: Boolean,
    default: undefined,
  },
  escToClose: {
    type: Boolean,
    default: undefined,
  },
  lockScroll: {
    type: Boolean,
    default: undefined,
  },
  popupContainer: {
    type: [String, Object, Boolean] as PropType<string | HTMLElement | false>,
    default: undefined,
  },
  previewProps: Object as PropType<Partial<ImagePreviewProps>>,
  onOpenChange: Function as PropType<(open: boolean) => void>,
}
