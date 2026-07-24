import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as stepProps } from './props'
import type { StepProps } from './props'
import Step from './Step.vue'

withInstall(Step)
withPropsDefaultsSetter(Step, stepProps)

export { stepProps }
export type { StepProps }

export type StepInstance = InstanceType<typeof Step>

export const _StepComponent = Step

export default Step
