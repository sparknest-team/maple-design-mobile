import { withInstall } from '../utils/components'
import DividerSource from './Divider.vue'
import { props as dividerProps } from './props'

const Divider = withInstall(DividerSource)

export { Divider, dividerProps }
export type {
  DividerProps,
  DividerOrientation,
  DividerTextAlign,
  DividerType,
  DividerSize,
  DividerSizePreset,
} from './props'

export type DividerInstance = InstanceType<typeof Divider>
export const _DividerComponent: typeof Divider = Divider

export default Divider
