import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import PaperSource from './Paper.vue'
import { paperProps } from './props'

const Paper = withInstall(PaperSource)
withPropsDefaultsSetter(Paper, paperProps)

export { Paper, paperProps }

export type PaperInstance = InstanceType<typeof Paper>
export const _PaperComponent: typeof Paper = Paper

export default Paper
export type { PaperProps } from './props'
