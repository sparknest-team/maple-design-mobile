import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Progress from './Progress.vue'
import { props as progressProps } from './props'

withInstall(Progress)
withPropsDefaultsSetter(Progress, progressProps)

export { progressProps }

export type ProgressInstance = InstanceType<typeof Progress>
export const _ProgressComponent = Progress

export default Progress
