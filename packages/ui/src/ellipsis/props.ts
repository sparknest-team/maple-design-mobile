import type { PropType } from 'vue'
import type { TooltipProps } from '../tooltip'

export type EllipsisExpandTrigger = 'click'
export const ellipsisProps = {
  /** 受控展开状态，配合 v-model:expand 使用。 */
  expand: { type: Boolean, default: undefined },
  /** 非受控初始展开状态。 */
  defaultExpand: { type: Boolean, default: false },
  /** 设置 click 后支持点击、Enter 和 Space 切换展开。 */
  expandTrigger: { type: String as PropType<EllipsisExpandTrigger>, validator: (value: string) => value === 'click' },
  /** 最大行数，省略时为单行。 */
  lineClamp: {
    type: [Number, String],
    validator: (value: unknown) =>
      (typeof value === 'number' || (typeof value === 'string' && value.trim() !== '')) &&
      Number.isFinite(Number(value)) &&
      Number(value) >= 1,
  },
  /** Tooltip 配置；false 禁用提示，true 使用默认配置。 */
  tooltip: { type: [Object, Boolean] as PropType<TooltipProps | boolean>, default: true },
}
export type EllipsisProps = InstanceType<(typeof import('./Ellipsis.vue'))['default']>['$props']
