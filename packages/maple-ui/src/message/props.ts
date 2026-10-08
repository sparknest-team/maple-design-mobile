import type { PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'
import {
  messagePositions,
  messageStatuses,
  messageVariants,
  type MessageContent,
  type MessagePosition,
  type MessageStatus,
  type MessageVariant,
} from './types'

export const messageProps = {
  /** 视觉强调层级，与语义状态独立 */
  variant: {
    type: String as PropType<MessageVariant>,
    default: 'solid',
    validator: (value: MessageVariant) => messageVariants.includes(value),
  },
  status: {
    type: String as PropType<MessageStatus>,
    default: 'default',
    validator: (value: MessageStatus) => messageStatuses.includes(value),
  },
  position: {
    type: String as PropType<MessagePosition>,
    default: 'top',
    validator: (value: MessagePosition) => messagePositions.includes(value),
  },
  content: [String, Number, Object, Array, Function] as PropType<MessageContent>,
  icon: [String, Number, Object, Array, Function] as PropType<MessageContent>,
  action: [String, Number, Object, Array, Function] as PropType<MessageContent>,
  duration: { type: Number, default: 3000, validator: (value: number) => value >= 0 },
  open: Boolean,
  showIcon: { type: Boolean, default: true },
  closable: Boolean,
  pauseOnHover: Boolean,
  resetOnUpdate: Boolean,
  closeButtonAriaLabel: { type: String, default: 'Close message' },
  popupContainer: popupContainerProp,
}

export type MessageProps = import('vue').ExtractPublicPropTypes<typeof messageProps>
