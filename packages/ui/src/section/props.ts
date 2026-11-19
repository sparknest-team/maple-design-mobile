import type { PropType, VNodeChild } from 'vue'
import type { CompatiblePublicProps } from '../_utils/public-props'

export type SectionVariant = 'line' | 'plain' | 'card'

export const sectionProps = {
  /** 分区 ID，未设置时自动生成。 */
  id: String,
  /** 分区标题，也可通过 title 插槽提供。 */
  title: { type: String, default: '' },
  /** 标题下方的补充说明。 */
  description: { type: String, default: '' },
  /** 分区风格：分隔线、仅标题或边框卡片。 */
  variant: { type: String as PropType<SectionVariant>, default: undefined },
  /** 标题在页面中的层级。 */
  headingLevel: {
    type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
    default: undefined,
    validator: (value: number) => Number.isInteger(value) && value >= 1 && value <= 6,
  },
  /** 显示标题左侧的主题色标记。 */
  showMarker: { type: Boolean, default: undefined },
  /** 显示底部结束线，区分后续未分组字段；card 由外框表示结束边界。 */
  showEndDivider: { type: Boolean, default: false },
}

export type SectionProps = CompatiblePublicProps<typeof sectionProps>
export interface SectionSlots {
  default?: () => VNodeChild
  title?: () => VNodeChild
  description?: () => VNodeChild
  extra?: () => VNodeChild
}
