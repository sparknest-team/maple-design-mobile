import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _BadgeSource from './Badge.vue'
import { badgeProps } from './props'

const _Badge = withInstall(_BadgeSource)
withPropsDefaultsSetter(_Badge, badgeProps)

export type BadgeInstance = InstanceType<typeof _Badge>
export type { BadgeProps, BadgeVariant, BadgeMode, BadgePosition, BadgeInlinePosition } from './props'
export { badgeProps }

export const _BadgeComponent: typeof _Badge = _Badge

export default _Badge
