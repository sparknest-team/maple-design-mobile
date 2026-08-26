import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Fab from './Fab'
import { props as fabProps } from './props'

withInstall(Fab)
withPropsDefaultsSetter(Fab, fabProps)

export { fabProps }

export type FabInstance = InstanceType<typeof Fab>
export const _FabComponent = Fab

export default Fab
