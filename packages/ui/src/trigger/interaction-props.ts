import type { PropType } from 'vue'
import type { TriggerEvent } from './contract'
import type { Reference } from './reference'

export const triggerInteractionProps = {
  reference: [String, Object] as PropType<Reference>,
  /** Controlled visibility; omitted means internal state. */
  open: { type: Boolean, default: undefined },
  /** Initial uncontrolled visibility. */
  defaultOpen: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  trigger: { type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>, default: 'hover' },
  mouseEnterDelay: { type: Number, default: 100 },
  mouseLeaveDelay: { type: Number, default: 100 },
  focusDelay: { type: Number, default: 0 },
  popupHoverStay: { type: Boolean, default: true },
  blurToClose: { type: Boolean, default: true },
  closeOnClickReference: { type: Boolean, default: true },
  clickOutsideToClose: { type: Boolean, default: true },
  escToClose: { type: Boolean, default: true },
  restoreFocus: { type: Boolean, default: true },
}
