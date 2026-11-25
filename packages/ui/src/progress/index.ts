import { withInstall } from '../utils/components'
import ProgressSource from './Progress.vue'
import { progressProps } from './props'

const Progress = withInstall(ProgressSource)

export { progressProps }

export type ProgressInstance = InstanceType<typeof Progress>
export const _ProgressComponent: typeof Progress = Progress

export default Progress
export type { ProgressProps, ProgressColor } from './props'
export type { ProgressSize, ProgressStatus, ProgressMode } from './props'
