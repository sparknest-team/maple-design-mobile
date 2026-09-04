import type { ExtractPropTypes, VNode } from 'vue'

export const pageHeaderProps = {
  /** 主标题 */
  title: String,
  /** 次标题 */
  subtitle: String,
  /** 右侧附加内容 */
  extra: String,
}

export type PageHeaderProps = ExtractPropTypes<typeof pageHeaderProps>

export interface PageHeaderSlots {
  header?: () => VNode[]
  back?: () => VNode[]
  avatar?: () => VNode[]
  title?: () => VNode[]
  subtitle?: () => VNode[]
  extra?: () => VNode[]
  default?: () => VNode[]
  footer?: () => VNode[]
}
