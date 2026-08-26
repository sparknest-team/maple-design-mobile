import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import CollapseTransition from './CollapseTransition.vue'
import { props as collapseTransitionProps } from './props'

withInstall(CollapseTransition)
withPropsDefaultsSetter(CollapseTransition, collapseTransitionProps)

export { collapseTransitionProps }

export type CollapseTransitionInstance = InstanceType<typeof CollapseTransition>
export const _CollapseTransitionComponent = CollapseTransition

export default CollapseTransition
