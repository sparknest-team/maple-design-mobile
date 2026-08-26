import { type ExtractPropTypes, type PropType } from 'vue'
import { semanticStatuses, type SemanticStatus } from '../utils/constants'

export type LinkUnderline = 'always' | 'hover' | 'none'
export const linkUnderlines = ['always', 'hover', 'none'] as const

export const props = {
  status: {
    type: String as PropType<SemanticStatus>,
    default: 'default',
    validator: (value: unknown): value is SemanticStatus => semanticStatuses.includes(value as SemanticStatus),
  },
  href: String,
  target: String,
  rel: String,
  underline: {
    type: String as PropType<LinkUnderline>,
    default: 'none',
    validator: (value: unknown): value is LinkUnderline => linkUnderlines.includes(value as LinkUnderline),
  },
  disabled: Boolean,
  loading: Boolean,
  icon: Boolean,
}

export type LinkProps = ExtractPropTypes<typeof props>
