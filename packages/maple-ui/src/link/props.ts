import type { ExtractPublicPropTypes, PropType } from 'vue'
import { semanticStatuses } from '../utils/constants'
import type { SemanticStatus } from '../utils/constants'

export const linkUnderlines = ['always', 'hover', 'none'] as const
export type LinkUnderline = (typeof linkUnderlines)[number]

export const linkProps = {
  href: String,
  target: String,
  rel: String,
  status: {
    type: String as PropType<SemanticStatus>,
    default: 'default',
    validator: (value: unknown): value is SemanticStatus => semanticStatuses.includes(value as SemanticStatus),
  },
  underline: {
    type: String as PropType<LinkUnderline>,
    default: 'none',
    validator: (value: unknown): value is LinkUnderline => linkUnderlines.includes(value as LinkUnderline),
  },
  /** Show padded hover/active backgrounds; does not control underline or keyboard focus. */
  hoverable: { type: Boolean, default: false },
  icon: Boolean,
  loading: Boolean,
  disabled: Boolean,
}

export type LinkProps = ExtractPublicPropTypes<typeof linkProps>
