import { withInstall } from '../utils/components'
import { setSafeAreaInsets } from './insets'
import { safeAreaProps } from './props'
import _SafeArea from './SafeArea.vue'

const SafeArea: import('../utils/components').ComponentWithInstall<typeof _SafeArea> & {
  setInsets: typeof setSafeAreaInsets
} = Object.assign(withInstall(_SafeArea), { setInsets: setSafeAreaInsets })
export type SafeAreaInstance = InstanceType<typeof _SafeArea>
export type { SafeAreaEdge, SafeAreaInsets, SafeAreaProps } from './props'
export { safeAreaProps, SafeArea }
export const _SafeAreaComponent: typeof SafeArea = SafeArea
export default SafeArea
