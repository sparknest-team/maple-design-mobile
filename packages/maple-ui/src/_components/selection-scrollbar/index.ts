import { withInstall } from '../../utils/components'
import { scrollbarProps } from './props'
import _Scrollbar from './Scrollbar.vue'

const Scrollbar = withInstall(_Scrollbar, Object.assign(_Scrollbar, {}), { components: [_Scrollbar] })

export type ScrollbarInstance = InstanceType<typeof _Scrollbar>
export type { ScrollbarProps } from './types'

export const _ScrollbarComponent = Scrollbar

export { Scrollbar }

export { scrollbarProps }

export default Scrollbar
