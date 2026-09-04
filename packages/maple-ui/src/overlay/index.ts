import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Overlay from './Overlay'
import { props as overlayProps } from './props'

withInstall(Overlay)
withPropsDefaultsSetter(Overlay, overlayProps)

export { overlayProps }
export type { OverlayProps } from './props'

export type OverlayInstance = InstanceType<typeof Overlay>
export const _OverlayComponent = Overlay

export default Overlay
