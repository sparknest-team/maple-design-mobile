import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Progress from './Progress.vue'
import { props as progressProps } from './props'

withInstall(Progress)
withPropsDefaultsSetter(Progress, progressProps)

export { progressProps }

export type ProgressInstance = InstanceType<typeof Progress>
export const _ProgressComponent: typeof Progress = Progress

export default Progress
export type ProgressProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
export type { ProgressSize, ProgressStatus, ProgressMode } from './props'
