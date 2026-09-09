import type { ExtractPublicPropTypes } from 'vue'

export const paperProps = {
  /** 显示边框，与阴影独立。 */
  bordered: Boolean,
  /** 阴影等级：false 关闭，true 为 2，数字为 0–24。 */
  elevation: { type: [Boolean, Number], default: false },
  /** 启用水波效果；不会自动赋予按钮语义。 */
  ripple: Boolean,
  /** 圆角；数字和数字字符串使用 px，其他字符串为 CSS 长度。 */
  radius: [Number, String],
  /** 宽度，数字使用 px。 */
  width: [Number, String],
  /** 高度，数字使用 px。 */
  height: [Number, String],
  /** 使用 50% 圆角；显式 radius 优先。 */
  round: Boolean,
  /** 使用 inline-flex。 */
  inline: Boolean,
}

export type PaperProps = ExtractPublicPropTypes<typeof paperProps>
export const props = paperProps
