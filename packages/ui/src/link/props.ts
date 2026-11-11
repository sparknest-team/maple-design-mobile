import type { PropType } from 'vue'
import { componentSizes, semanticStatuses } from '../utils/constants'
import type { ComponentSize, SemanticStatus } from '../utils/constants'

export const linkUnderlines = ['always', 'hover', 'none'] as const
export type LinkUnderline = (typeof linkUnderlines)[number]

export type LinkSize = ComponentSize

export const linkProps = {
  /** 五档尺寸，文字、图标及加载图标同步缩放。 */
  size: {
    type: String as PropType<LinkSize>,
    default: 'md',
    validator:
      process.env.NODE_ENV !== 'production'
        ? (value: unknown): value is LinkSize => componentSizes.includes(value as LinkSize)
        : undefined,
  },
  href: String,
  target: String,
  rel: String,
  status: {
    type: String as PropType<SemanticStatus>,
    default: 'default',
    validator:
      process.env.NODE_ENV !== 'production'
        ? (value: unknown): value is SemanticStatus => semanticStatuses.includes(value as SemanticStatus)
        : undefined,
  },
  underline: {
    type: String as PropType<LinkUnderline>,
    default: 'none',
    validator:
      process.env.NODE_ENV !== 'production'
        ? (value: unknown): value is LinkUnderline => linkUnderlines.includes(value as LinkUnderline)
        : undefined,
  },
  /** Show padded hover/active backgrounds; does not control underline or keyboard focus. */
  hoverable: { type: Boolean, default: false },
  icon: Boolean,
  loading: Boolean,
  disabled: Boolean,
}

export type LinkProps = InstanceType<(typeof import('./Link.vue'))['default']>['$props']
