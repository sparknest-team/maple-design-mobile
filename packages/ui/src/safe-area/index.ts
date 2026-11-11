import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { setSafeAreaInsets } from './insets'
import { safeAreaProps } from './props'
import _SafeArea from './SafeArea.vue'

const SafeArea = Object.assign(withInstall(_SafeArea), { setInsets: setSafeAreaInsets })
withPropsDefaultsSetter(SafeArea, safeAreaProps)
export type SafeAreaInstance = InstanceType<typeof _SafeArea>
export type { SafeAreaEdge, SafeAreaInsets, SafeAreaProps } from './props'
export { safeAreaProps, SafeArea }
export const _SafeAreaComponent = SafeArea
export default SafeArea
