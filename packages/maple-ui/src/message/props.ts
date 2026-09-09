import { type PropType, type TeleportProps } from 'vue'
import type { SlotType } from '.'
import { loadingProps } from '../loading'
import { pickProps } from '../utils/components'
import { popupContainerProp } from '../utils/popup-container'
import type { MessagePosition, MessageStatus } from './index'

export type { MessagePosition }

export const props = {
  status: { type: String as PropType<MessageStatus>, default: 'info' },
  position: {
    type: String as PropType<MessagePosition>,
    default: 'top',
  },
  content: [String, Function, Object] as PropType<SlotType>,
  contentClass: String,
  duration: {
    type: Number,
    default: 3000,
  },
  elevation: {
    type: [Boolean, Number],
    default: true,
  },
  vertical: Boolean,
  loadingType: pickProps(loadingProps, 'type'),
  loadingSize: pickProps(loadingProps, 'size'),
  loadingRadius: pickProps(loadingProps, 'radius'),
  loadingColor: {
    ...pickProps(loadingProps, 'color'),
    default: 'currentColor',
  },
  lockScroll: Boolean,
  open: Boolean,
  popupContainer: popupContainerProp,
  forbidClick: Boolean,
  showIcon: {
    type: Boolean,
    default: true,
  },
  closable: Boolean,
  _update: String,
}
