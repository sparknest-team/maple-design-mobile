import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import ProgressGroup from './ProgressGroup.vue'
import { progressGroupProps } from './props'

withInstall(ProgressGroup)
withPropsDefaultsSetter(ProgressGroup, progressGroupProps)
export type ProgressGroupInstance = InstanceType<typeof ProgressGroup>
export type { ProgressGroupItem, ProgressGroupMode, ProgressGroupOrientation, ProgressGroupProps } from './props'
export { progressGroupProps }
export const _ProgressGroupComponent: typeof ProgressGroup = ProgressGroup
export default ProgressGroup
