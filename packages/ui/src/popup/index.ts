import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import PopupSource from './Popup.vue'
import { popupProps } from './props'

const Popup = withInstall(PopupSource)
withPropsDefaultsSetter(Popup, popupProps)

export { popupProps }
export type { PopupPlacement, PopupProps, PopupCloseReason, PopupBeforeClose } from './props'

export type PopupInstance = InstanceType<typeof Popup>
export const _PopupComponent: typeof Popup = Popup

export default Popup
