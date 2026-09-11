import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Avatar from './Avatar.vue'
import AvatarGroup from './AvatarGroup.vue'
import { avatarGroupProps, avatarProps } from './props'

const Avatar = withInstall(
  _Avatar,
  Object.assign(_Avatar, {
    Group: AvatarGroup,
  }),
  { components: [_Avatar, AvatarGroup] },
)

withPropsDefaultsSetter(Avatar, avatarProps)
withPropsDefaultsSetter(AvatarGroup, avatarGroupProps)

export { avatarProps, avatarGroupProps, Avatar, AvatarGroup }
export type { AvatarGroupProps, AvatarObjectFit, AvatarProps, AvatarShape, AvatarTriggerType } from './props'

export type AvatarInstance = InstanceType<typeof _Avatar>
export type AvatarGroupInstance = InstanceType<typeof AvatarGroup>
export const _AvatarComponent: typeof Avatar = Avatar
export const _AvatarGroupComponent: typeof AvatarGroup = AvatarGroup

export default Avatar
