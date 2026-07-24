import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as stepsProps } from './props'
import type { StepsDirection, StepsProps, StepStatus } from './props'
import Steps from './Steps.vue'

withInstall(Steps)
withPropsDefaultsSetter(Steps, stepsProps)

export { stepsProps }
export type { StepsProps, StepsDirection, StepStatus }

export type StepsInstance = InstanceType<typeof Steps>

export const _StepsComponent = Steps

export default Steps
