import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Drag from './Drag.vue'
import { props as dragProps } from './props'

withInstall(Drag)
withPropsDefaultsSetter(Drag, dragProps)

export { dragProps }

export type DragInstance = InstanceType<typeof Drag>
export const _DragComponent: typeof Drag = Drag

export default Drag
export type DragProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>

export type { DragAxis, DragAttraction, DragBoundary } from './props'
