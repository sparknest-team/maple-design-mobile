import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Divider from './Divider.vue'
import { props as dividerProps } from './props'

withInstall(Divider)
withPropsDefaultsSetter(Divider, dividerProps)

export { dividerProps }
export type {
  DividerProps,
  DividerOrientation,
  DividerTextAlign,
  DividerType,
  DividerSize,
  DividerSizePreset,
} from './props'

export type DividerInstance = InstanceType<typeof Divider>
export const _DividerComponent = Divider

export default Divider
