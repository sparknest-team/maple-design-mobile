import type { TriggerProps } from './props'

/** Types only: opt-in configuration boundaries; existing host prop types and runtime precedence stay unchanged. */
type OwnedTriggerKey = 'open' | 'defaultOpen' | 'disabled' | 'onUpdate:open' | 'onOpenChange'
export type TriggerPresentationOptions<Owned extends PropertyKey = never> = Omit<
  TriggerProps,
  OwnedTriggerKey | Owned
> &
  Partial<Record<OwnedTriggerKey | Owned, never>>
