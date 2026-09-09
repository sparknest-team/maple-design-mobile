import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Cascader from './Cascader.vue'
import { props as cascaderProps } from './props'

withInstall(Cascader)
withPropsDefaultsSetter(Cascader, cascaderProps)

export type CascaderInstance = InstanceType<typeof Cascader>
export type { CascaderProps, CascaderOption, CascaderPresentation } from './props'

export { cascaderProps }

export const _CascaderComponent: typeof Cascader = Cascader

export default Cascader
