import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { triggerProps } from './props'
import Trigger from './Trigger.vue'

withInstall(Trigger)
withPropsDefaultsSetter(Trigger, triggerProps)

export interface TriggerInstance {
  allowClose(): void
  getReference(): HTMLElement | undefined
  open(): void
  close(): void
  resize(): void
  setReference(reference: Reference): void
}
export type { TriggerProps } from './props'
export type {
  NeededPopperPlacement,
  Placement as TriggerPlacement,
  Reference,
  TriggerEvent,
} from './useFloatingTrigger'
export { triggerProps }
export const _TriggerComponent = Trigger
export default Trigger
