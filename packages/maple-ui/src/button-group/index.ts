import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _ButtonGroup from './ButtonGroup.vue'
import { buttonGroupProps } from './props'

withInstall(_ButtonGroup)
withPropsDefaultsSetter(_ButtonGroup, buttonGroupProps)

export type ButtonGroupInstance = InstanceType<typeof _ButtonGroup>
export type { ButtonGroupProps } from './props'
export { buttonGroupProps }

export const _ButtonGroupComponent = _ButtonGroup

export default _ButtonGroup
