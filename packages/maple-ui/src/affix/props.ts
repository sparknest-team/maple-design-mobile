import type { ExtractPublicPropTypes, PropType } from 'vue'

export type AffixTarget = string | HTMLElement | Window
export const affixProps = {
  /** 距滚动容器顶部的偏移；数字和数值字符串按 px */
  offsetTop: { type: [Number, String], default: 0 },
  /** 底部偏移；显式传入时优先于 offsetTop */
  offsetBottom: [Number, String],
  target: [String, Object] as PropType<AffixTarget>,
  /** 额外监听的外部滚动容器，不是裁剪边界 */
  targetContainer: [String, Object] as PropType<AffixTarget>,
  zIndex: { type: [Number, String], default: 10 },
  disabled: Boolean,
  cssMode: Boolean,
}
export type AffixProps = ExtractPublicPropTypes<typeof affixProps>
