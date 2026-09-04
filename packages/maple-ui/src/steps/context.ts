import type { ComputedRef, InjectionKey, Slots } from 'vue'
import type { Orientation } from '../utils/constants'
import type { StepsContentPlacement, StepsSize, StepStatus, StepsType } from './props'

export interface StepsContext {
  current: ComputedRef<number>
  direction: ComputedRef<Orientation>
  contentPlacement: ComputedRef<StepsContentPlacement>
  size: ComputedRef<StepsSize>
  type: ComputedRef<StepsType>
  showLine: ComputedRef<boolean>
  changeable: ComputedRef<boolean>
  slots: Slots
  getStatus: (index: number, status?: StepStatus) => StepStatus
  select: (index: number, event: Event) => void
}

export const stepsInjectionKey: InjectionKey<StepsContext> = Symbol('Steps')
