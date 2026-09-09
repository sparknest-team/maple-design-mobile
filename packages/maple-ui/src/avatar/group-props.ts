import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { props as popoverProps } from '../popover/props'
import { props as avatarProps } from './props'

export type PopoverProps = import('vue').ExtractPublicPropTypes<typeof popoverProps>

export const props = {
  shape: avatarProps.shape,
  size: Number,
  autoFixFontSize: avatarProps.autoFixFontSize,
  maxCount: { type: Number, default: 0 },
  zIndexAscend: { type: Boolean, default: false },
  maxStyle: Object as PropType<CSSProperties>,
  maxPopoverProps: Object as PropType<PopoverProps>,
  offset: [Number, String] as PropType<number | string>,
  vertical: Boolean,
}

export type AvatarGroupProps = import('vue').ExtractPublicPropTypes<typeof props>
