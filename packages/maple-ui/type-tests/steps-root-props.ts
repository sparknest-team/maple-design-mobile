import { stepProps, stepsProps } from '@maple-design/ui'
import { stepProps as subStep, stepsProps as subSteps } from '@maple-design/ui/steps'

const root: typeof subSteps = stepsProps
const item: typeof subStep = stepProps
void [root, item]
