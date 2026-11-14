import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import FabSource from './Fab'
import { props as fabProps } from './props'

const Fab = withInstall(FabSource)
withPropsDefaultsSetter(Fab, fabProps)

export { fabProps }

export type FabInstance = InstanceType<typeof Fab>
export const _FabComponent: typeof Fab = Fab

export default Fab
export type FabProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>

export type { FabPlacement, FabPosition, FabTrigger, FabDrag, FabTriggerProps } from './props'
