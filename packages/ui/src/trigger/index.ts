import { withInstall } from '../utils/components'
import { triggerProps } from './props'
import type { Reference, TriggerElement } from './reference'
import TriggerSource from './trigger'

const Trigger = withInstall(TriggerSource)
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
export type { TriggerProps, TriggerReferenceAttrs } from './props'
export type { TriggerEvent, TriggerPlacement } from './contract'
export type { Reference } from './reference'
export type { TriggerPopupTranslate, TriggerStrategy } from './types'
export { triggerProps }
export const _TriggerComponent: typeof Trigger = Trigger
export default Trigger
