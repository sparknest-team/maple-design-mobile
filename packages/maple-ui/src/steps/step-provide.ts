import { type ComputedRef } from 'vue'
import { assert } from '@maplejs/maple-shared'
import { useParent } from '@maplejs/maple-use'
import { STEPS_BIND_STEP_KEY, type StepsProvider } from './provide'

export interface StepProvider {
  index: ComputedRef<number>
}

export function useSteps() {
  const { parentProvider, index, bindParent } = useParent<StepsProvider, StepProvider>(STEPS_BIND_STEP_KEY)

  assert(!!bindParent, 'Steps', '<step/> must in <steps>')

  return {
    index,
    steps: parentProvider,
    bindSteps: bindParent,
  }
}
