import type { PropType, VNodeChild } from 'vue'
import { componentSizes, type ComponentSize, type SemanticStatus } from '../_utils/constant'
import type { CompatiblePublicProps } from '../_utils/public-props'

export type SectionSize = ComponentSize
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
    validator: (size: SectionSize) => componentSizes.includes(size),
  },
  /** 分区外观，默认为 heading-line。 */
  variant: { type: String as PropType<SectionVariant>, default: 'heading-line' },
  /** 标题在页面中的层级。 */
  headingLevel: {
    type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
    default: 4,
    validator: (value: number) => Number.isInteger(value) && value >= 1 && value <= 6,
  },
  /** 分区的语义状态，用于色条、浅色底和描边。 */
  status: String as PropType<SectionStatus>,
  /** 显示色条，默认关闭。 */
  showMarker: { type: Boolean, default: false },
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
