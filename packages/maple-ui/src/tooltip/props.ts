import { type PropType, type TeleportProps } from 'vue'
import type { PositioningStrategy } from '@popperjs/core'
import type { NeededPopperPlacement, Reference, TriggerEvent } from '../trigger'
import { triggerProps } from '../trigger/props'
import { popupContainerProp } from '../utils/popup-container'

export type Placement = NeededPopperPlacement

export type TooltipStatus = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'

export const props = {
  ...triggerProps,
  backgroundColor: String,
  xs: Boolean,
  animationName: { type: String, default: undefined },
  unmountOnClose: { type: Boolean, default: false },
  status: {
    type: String as PropType<TooltipStatus>,
    default: 'default',
  },
  color: String,
  textColor: String,
  content: String,
  open: { type: Boolean, default: undefined },
  defaultOpen: Boolean,
  disabled: Boolean,
  trigger: {
    type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>,
    default: 'hover',
  },
  mouseEnterDelay: { type: Number, default: 0 },
  mouseLeaveDelay: { type: Number, default: 0 },
  focusDelay: { type: Number, default: 0 },
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
  popupContainer: popupContainerProp,
  autoFitPopupWidth: Boolean,
  closeOnClickReference: Boolean,
  escToClose: {
    type: Boolean,
    default: true,
  },
}

export const tooltipProps = props
