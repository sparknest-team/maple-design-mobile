import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as stepsProps } from './props'
import { props as stepProps } from './step-props'
import Step from './Step.vue'
import _Steps from './Steps.vue'

const Steps = withInstall(
  _Steps,
  Object.assign(_Steps, {
    Step: Step,
  }),
  { components: [_Steps, Step] },
)

withPropsDefaultsSetter(Steps, stepsProps)
withPropsDefaultsSetter(Step, stepProps)

export { stepsProps, stepProps, Steps, Step }
export type { StepsProps, StepsDirection, StepStatus } from './props'
export type { StepProps } from './step-props'

export type StepsInstance = InstanceType<typeof _Steps>
export type StepInstance = InstanceType<typeof Step>
export const _StepsComponent = Steps
export const _StepComponent = Step

export default Steps
