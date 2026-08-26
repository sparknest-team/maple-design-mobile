import { type PropType, type TeleportProps } from 'vue'
import type { SlotType } from '.'
import { loadingProps } from '../loading'
import { pickProps } from '../utils/components'
import type { MessagePosition, MessageType } from './index'

export type { MessagePosition }

export const props = {
  type: String as PropType<MessageType>,
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
    type: [Boolean, String, Number],
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
  popupContainer: {
    type: [String, Object, Boolean] as PropType<TeleportProps['to'] | false>,
    default: 'body',
  },
  forbidClick: Boolean,
  showIcon: {
    type: Boolean,
    default: true,
  },
  closable: Boolean,
  _update: String,
}
