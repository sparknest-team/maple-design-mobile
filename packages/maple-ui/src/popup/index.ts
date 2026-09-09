import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Popup from './Popup'
import { props as popupProps } from './props'

withInstall(Popup)
withPropsDefaultsSetter(Popup, popupProps)

export { popupProps }

export type PopupInstance = InstanceType<typeof Popup>
export const _PopupComponent: typeof Popup = Popup

export default Popup
export type PopupProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
