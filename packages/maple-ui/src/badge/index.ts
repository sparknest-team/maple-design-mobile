import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Badge from './Badge.vue'
import { badgeProps } from './props'

withInstall(_Badge)
withPropsDefaultsSetter(_Badge, badgeProps)

export type BadgeInstance = InstanceType<typeof _Badge>
export type {
  BadgeProps,
  BadgeStatus,
  BadgeVariant,
  BadgeType,
  BadgePosition,
  BadgeInlinePosition,
  BadgeSize,
} from './props'
export { badgeProps }

export const _BadgeComponent = _Badge

export default _Badge
