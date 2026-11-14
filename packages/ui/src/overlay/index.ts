import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import OverlaySource from './Overlay.vue'
import { overlayProps } from './props'

const Overlay = withInstall(OverlaySource)
withPropsDefaultsSetter(Overlay, overlayProps)

export { overlayProps }
export type { OverlayProps } from './props'

export type OverlayInstance = InstanceType<typeof Overlay>
export const _OverlayComponent: typeof Overlay = Overlay

export default Overlay
