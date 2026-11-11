import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { stepProps, stepsProps } from './props'
import _StepsStep from './Step.vue'
import _Steps from './Steps'

const Steps = withInstall(
  _Steps,
  Object.assign(_Steps, {
    Step: _StepsStep,
  }),
  { components: [_Steps, _StepsStep] },
)

withPropsDefaultsSetter(Steps, stepsProps)
withPropsDefaultsSetter(_StepsStep, stepProps)

export type StepsInstance = InstanceType<typeof _Steps>
export type StepInstance = InstanceType<typeof _StepsStep>
export type StepsStepInstance = StepInstance
export type { StepsProps, StepProps, StepStatus, StepsType, StepsSize, StepsContentPlacement } from './props'

export { stepsProps, stepProps }
export { _StepsStep as Step }

export const _StepsComponent: typeof Steps = Steps
export const _StepComponent: typeof _StepsStep = _StepsStep

export { Steps }

export default Steps
