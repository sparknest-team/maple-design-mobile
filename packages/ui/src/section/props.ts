import type { PropType, VNodeChild } from 'vue'
import type { ComponentSize, SemanticStatus } from '../_utils/constant'
import type { CompatiblePublicProps } from '../_utils/public-props'

export type SectionSize = Extract<ComponentSize, 'sm' | 'md'>
export type SectionMarkerPlacement = 'title' | 'section'
export type SectionStatus = Extract<SemanticStatus, 'default' | 'info' | 'success' | 'warning' | 'danger'>
export type SectionVariant = 'heading-line' | 'plain' | 'tonal' | 'outline'

export const sectionProps = {
  /** 分区 ID，未设置时自动生成。 */
  id: String,
  /** 分区标题，也可通过 title 插槽提供。 */
  title: { type: String, default: '' },
  /** 标题下方的补充说明。 */
  description: { type: String, default: '' },
  /** 分区尺寸，控制标题字号、标题色条和间距。 */
  size: {
    type: String as PropType<SectionSize>,
    default: 'md',
    validator: (size: SectionSize) => size === 'sm' || size === 'md',
  },
  /** 分区外观，表单中默认为 heading-line，其他场景默认为 plain。 */
  variant: { type: String as PropType<SectionVariant>, default: undefined },
  /** 标题在页面中的层级。 */
  headingLevel: {
    type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
    default: undefined,
    validator: (value: number) => Number.isInteger(value) && value >= 1 && value <= 6,
  },
  /** 分区的语义状态，用于色条、浅色底和描边。 */
  status: String as PropType<SectionStatus>,
  /** 显示色条，默认随表单上下文开启。 */
  showMarker: { type: Boolean, default: undefined },
  /** 色条标记标题或整个分区。 */
  markerPlacement: { type: String as PropType<SectionMarkerPlacement>, default: 'title' },
}

export type SectionProps = CompatiblePublicProps<typeof sectionProps>
export interface SectionSlots {
  default?: () => VNodeChild
  title?: () => VNodeChild
  description?: () => VNodeChild
  extra?: () => VNodeChild
}
