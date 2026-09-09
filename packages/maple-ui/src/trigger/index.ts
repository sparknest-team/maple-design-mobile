import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { triggerProps } from './props'
import type { TriggerElement } from './reference'
import Trigger from './Trigger.vue'
import type { Reference } from './useFloatingTrigger'

withInstall(Trigger)
withPropsDefaultsSetter(Trigger, triggerProps)

export interface TriggerInstance {
  isTopLayer(event?: Event): boolean
  allowClose(): void
  focusReference(): void
  getReference(): TriggerElement | undefined
  open(): void
  close(): void
  resize(): void
  setReference(reference?: Reference): void
}
export type { TriggerProps } from './props'
export type {
  NeededPopperPlacement,
  Placement as TriggerPlacement,
  Reference,
  TriggerEvent,
} from './useFloatingTrigger'
export { triggerProps }
export const _TriggerComponent: typeof Trigger = Trigger
export default Trigger
