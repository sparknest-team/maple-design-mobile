import { type PropType } from 'vue'

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
  loop: Boolean,
  closable: Boolean,
  maskClosable: Boolean,
  popupContainer: [String, Object, Boolean] as PropType<string | Element | false>,
}
