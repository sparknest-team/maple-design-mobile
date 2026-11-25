import { withInstall } from '../utils/components'
import IconSource from './Icon.vue'
import { props as iconProps } from './props'

const Icon = withInstall(IconSource)

export { Icon, iconProps }

export type IconInstance = InstanceType<typeof Icon>
export const _IconComponent: typeof Icon = Icon

export default Icon
export type { IconProps } from './props'
