import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Avatar from './Avatar.vue'
import AvatarGroup from './AvatarGroup.vue'
import { props as avatarGroupProps } from './group-props'
import { props as avatarProps } from './props'

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
export type { AvatarProps, AvatarShape, AvatarTriggerType, ObjectFit } from './props'
export type { AvatarGroupProps } from './group-props'

export type AvatarInstance = InstanceType<typeof _Avatar>
export type AvatarGroupInstance = InstanceType<typeof AvatarGroup>
export const _AvatarComponent = Avatar
export const _AvatarGroupComponent = AvatarGroup

export default Avatar
