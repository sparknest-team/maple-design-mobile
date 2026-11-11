import type { TriggerPlacement } from './contract'

export type TriggerStrategy = 'absolute' | 'fixed'
export type TriggerPopupTranslate =
  readonly [number, number] | Partial<Record<TriggerPlacement, readonly [number, number]>>
