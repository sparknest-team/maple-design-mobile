import type { ExtractPropTypes, PropType, VNodeChild } from 'vue'

export type FormSectionVariant = 'line' | 'plain' | 'card'

export const formSectionProps = {
  /** 分区 ID，未设置时自动生成。 */
  id: String,
  /** 分区标题，也可通过 title 插槽提供。 */
  title: { type: String, default: '' },
  /** 标题下方的补充说明。 */
  description: { type: String, default: '' },
  /** 分区风格：分隔线、仅标题或边框卡片。 */
  variant: { type: String as PropType<FormSectionVariant>, default: 'line' },
  /** 显示标题左侧的主题色标记。 */
  showMarker: { type: Boolean, default: true },
  /** 显示底部结束线，区分后续未分组字段；card 由外框表示结束边界。 */
  showEndDivider: { type: Boolean, default: false },
}

export type FormSectionProps = ExtractPropTypes<typeof formSectionProps>
export interface FormSectionSlots {
  default?: () => VNodeChild
  title?: () => VNodeChild
  description?: () => VNodeChild
  extra?: () => VNodeChild
}
