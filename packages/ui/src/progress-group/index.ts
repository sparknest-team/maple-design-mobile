import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import ProgressGroupSource from './ProgressGroup.vue'
import { progressGroupProps } from './props'

const ProgressGroup = withInstall(ProgressGroupSource)
withPropsDefaultsSetter(ProgressGroup, progressGroupProps)
export type ProgressGroupInstance = InstanceType<typeof ProgressGroup>
export type { ProgressGroupItem, ProgressGroupMode, ProgressGroupOrientation, ProgressGroupProps } from './props'
export { progressGroupProps }
export const _ProgressGroupComponent: typeof ProgressGroup = ProgressGroup
export default ProgressGroup
