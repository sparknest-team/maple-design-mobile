import type { ExtractPropTypes, VNode } from 'vue'

export const pageHeaderProps = {
  /**
   * @zh 是否显示返回按钮
   * @en Whether to show the back button
   */
  showBack: Boolean,
  /**
   * @zh 页头的主标题
   * @en Main title
   */
  title: String,
  /**
   * @zh 页头的次标题
   * @en Subtitle
   */
  subtitle: String,
  /**
   * @zh 右侧附加内容
   * @en Extra content on the right
   */
  extra: String,
}

export type PageHeaderProps = import('vue').ExtractPublicPropTypes<typeof pageHeaderProps>

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
