const numericSize = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i
/** Validate numeric dimensions without pretending to parse browser CSS expressions. */
export function isPaperSize(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value >= 0
  }
  if (typeof value !== 'string' || !value.trim() || /^[+-]?(?:NaN|Infinity)$/i.test(value.trim())) {
    return false
  }
  return !numericSize.test(value.trim()) || (Number.isFinite(Number(value)) && Number(value) >= 0)
}
export function toPaperSize(value: unknown): string | undefined {
  if (!isPaperSize(value)) {
    return undefined
  }
  return typeof value === 'number' || numericSize.test((value as string).trim())
    ? `${Number(value)}px`
    : (value as string)
}

export const paperProps = {
  /** 显示边框，与阴影独立。 */
  bordered: Boolean,
  /** 阴影等级：false 关闭，true 为 2，数字为 0–24。 */
  elevation: {
    type: [Boolean, Number],
    default: false,
    validator: (value: unknown) => typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value)),
  },
  /** 启用水波效果；不会自动赋予按钮语义。 */
  ripple: Boolean,
  /** 圆角；数字和数字字符串使用 px，其他字符串为 CSS 长度。 */
  radius: { type: [Number, String], validator: isPaperSize },
  /** 宽度，数字使用 px。 */
  width: { type: [Number, String], validator: isPaperSize },
  /** 高度，数字使用 px。 */
  height: { type: [Number, String], validator: isPaperSize },
  /** 使用 50% 圆角；显式 radius 优先。 */
  round: Boolean,
  /** 使用 inline-flex。 */
  inline: Boolean,
}

export type PaperProps = InstanceType<(typeof import('./Paper.vue'))['default']>['$props']
export const props = paperProps
