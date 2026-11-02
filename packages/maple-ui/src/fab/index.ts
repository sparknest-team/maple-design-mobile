import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Fab from './Fab'
import { props as fabProps } from './props'

withInstall(Fab)
withPropsDefaultsSetter(Fab, fabProps)

export { fabProps }

export type FabInstance = InstanceType<typeof Fab>
export const _FabComponent: typeof Fab = Fab

export default Fab
export type FabProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>

export type { FabPlacement, FabPosition, FabTrigger, FabDrag } from './props'
