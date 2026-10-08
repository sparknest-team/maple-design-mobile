import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { TooltipProps } from '../tooltip'

export type EllipsisExpandTrigger = 'click'
export const ellipsisProps = {
  /** 受控展开状态，配合 v-model:expand 使用。 */
  expand: { type: Boolean, default: undefined },
  /** 非受控初始展开状态。 */
  defaultExpand: { type: Boolean, default: false },
  /** 设置 click 后支持点击、Enter 和 Space 切换展开。 */
  expandTrigger: String as PropType<EllipsisExpandTrigger>,
  /** 最大行数，省略时为单行。 */
  lineClamp: [Number, String],
  /** Tooltip 配置；false 禁用提示，true 使用默认配置。 */
  tooltip: { type: [Object, Boolean] as PropType<TooltipProps | boolean>, default: true },
}
export type EllipsisProps = ExtractPublicPropTypes<typeof ellipsisProps>
