import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, SemanticStatus } from '../utils/constants'
import type { TagColor, TagVariant } from './types'

export const tagVariants = ['default', 'outline'] as const

export const tagProps = {
  color: String as PropType<TagColor | string>,
  size: { type: String as PropType<ComponentSize>, default: 'md' },
  status: { type: String as PropType<SemanticStatus>, default: 'default' },
  variant: {
    type: String as PropType<TagVariant>,
    default: 'default',
    validator: (value: unknown): value is TagVariant => tagVariants.includes(value as TagVariant),
  },
  show: { type: Boolean, default: undefined },
  defaultShow: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
  checkable: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: undefined },
  defaultValue: { type: Boolean, default: true },
  nowrap: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  textColor: String,
}

export type TagProps = import('vue').ExtractPublicPropTypes<typeof tagProps>

export { TAG_COLORS } from './types'
export type { TagColor, TagVariant } from './types'
