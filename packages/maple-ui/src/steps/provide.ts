import { type ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import { type StepProvider } from '../step/provide'
import type { StepStatus } from './props'

export interface StepsProvider {
  current: ComputedRef<number>
  direction: ComputedRef<string>
  status: ComputedRef<StepStatus>
  changeable: ComputedRef<boolean>
  getStatus: (step: number) => StepStatus
  clickStep: (step: number, ev: Event) => void
}

export const STEPS_BIND_STEP_KEY = Symbol('STEPS_BIND_STEP_KEY')

export function useStep() {
  const { bindChildren, childProviders } = useChildren<StepsProvider, StepProvider>(STEPS_BIND_STEP_KEY)

  return {
    step: childProviders,
    bindStep: bindChildren,
  }
}
