import type { ComputedRef, InjectionKey } from 'vue'
import type { AvatarShape } from './props'

export interface AvatarGroupContext {
  shape: ComputedRef<AvatarShape>
  size: ComputedRef<number | undefined>
  autoFixFontSize: ComputedRef<boolean>
}

export const avatarGroupInjectionKey: InjectionKey<AvatarGroupContext> = Symbol('MapleAvatarGroup')
