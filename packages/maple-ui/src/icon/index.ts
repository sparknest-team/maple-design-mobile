import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Icon from './Icon.vue'
import { props as iconProps } from './props'

withInstall(Icon)
withPropsDefaultsSetter(Icon, iconProps)

export { iconProps }

export type Instance = InstanceType<typeof Icon>
export const _IconComponent: typeof Icon = Icon

export default Icon
export type IconProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
