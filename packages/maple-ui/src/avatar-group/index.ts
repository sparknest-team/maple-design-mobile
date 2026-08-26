import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import AvatarGroup from './AvatarGroup.vue'
import { props as avatarGroupProps } from './props'

withInstall(AvatarGroup)
withPropsDefaultsSetter(AvatarGroup, avatarGroupProps)

export { avatarGroupProps }

export type AvatarGroupInstance = InstanceType<typeof AvatarGroup>
export const _AvatarGroupComponent = AvatarGroup

export default AvatarGroup
