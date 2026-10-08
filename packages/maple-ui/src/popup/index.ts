import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Popup from './Popup.vue'
import { popupProps } from './props'

withInstall(Popup)
withPropsDefaultsSetter(Popup, popupProps)

export { popupProps }
export type { PopupPlacement, PopupProps } from './props'

export type PopupInstance = InstanceType<typeof Popup>
export const _PopupComponent: typeof Popup = Popup

export default Popup
