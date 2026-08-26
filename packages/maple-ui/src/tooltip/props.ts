import { type PropType, type TeleportProps } from 'vue'
import type { PositioningStrategy } from '@popperjs/core'
import type { NeededPopperPlacement, Reference, TriggerEvent } from '../trigger'

export type Placement = NeededPopperPlacement

export type TooltipType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'

export const props = {
  type: {
    type: String as PropType<TooltipType>,
    default: 'default',
  },
  color: String,
  textColor: String,
  content: String,
  open: Boolean,
  disabled: Boolean,
  trigger: {
    type: String as PropType<TriggerEvent>,
    default: 'hover',
  },
  reference: [String, Object] as PropType<Reference>,
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
  },
  strategy: {
    type: String as PropType<PositioningStrategy>,
    default: 'absolute',
  },
  offsetX: {
    type: [Number, String],
    default: 0,
  },
  offsetY: {
    type: [Number, String],
    default: 0,
  },
  popupContainer: {
    type: [String, Object, Boolean] as PropType<TeleportProps['to'] | false>,
    default: 'body',
  },
  sameWidth: Boolean,
  closeOnClickReference: Boolean,
  escToClose: {
    type: Boolean,
    default: true,
  },
}
