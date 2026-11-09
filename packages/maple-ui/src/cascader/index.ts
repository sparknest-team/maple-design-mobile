import { withInstall } from '../utils/components'
import _CascaderPanel from './CascaderPanel.vue'
import _Cascader from './presentation'
import { cascaderProps } from './props'

const Cascader = withInstall(
  _Cascader,
  Object.assign(_Cascader, {
    CascaderPanel: _CascaderPanel,
  }),
  { components: [_Cascader, _CascaderPanel] },
)

export type CascaderInstance = InstanceType<typeof _Cascader> & import('./types').CascaderExpose
export type CascaderPanelInstance = InstanceType<typeof _CascaderPanel>
export type CascaderPanelProps = import('vue').ExtractPublicPropTypes<typeof _CascaderPanel.props>
export const cascaderPanelProps = _CascaderPanel.props
export type { CascaderOption, CascaderFieldNames } from './types'

export { _CascaderPanel as CascaderPanel }
export const _CascaderComponent = Cascader
export const _CascaderPanelComponent = _CascaderPanel

export { Cascader }

export { cascaderProps }

export default Cascader
export type CascaderProps = import('vue').ExtractPublicPropTypes<typeof import('./props').cascaderProps>

export type { CascaderEditMode } from './props'

export type { CascaderTriggerOptions } from './trigger-options'

export type {
  CascaderBaseValue,
  CascaderOptionInfo,
  CascaderReadScope,
  CascaderEmits,
  CascaderSlots,
  CascaderExpose,
} from './types'
