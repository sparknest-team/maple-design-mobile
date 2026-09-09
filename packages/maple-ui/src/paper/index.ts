import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Paper from './Paper.vue'
import { paperProps } from './props'

withInstall(Paper)
withPropsDefaultsSetter(Paper, paperProps)

export { paperProps }

export type PaperInstance = InstanceType<typeof Paper>
export const _PaperComponent: typeof Paper = Paper

export default Paper
export type { PaperProps } from './props'
