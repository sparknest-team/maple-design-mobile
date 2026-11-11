import type { CSSProperties, PropType } from 'vue'

export const triggerRenderProps = {
  showArrow: Boolean,
  unmountOnClose: { type: Boolean, default: true },
  popupClass: [String, Array, Object],
  popupStyle: Object as PropType<CSSProperties>,
  contentClass: [String, Array, Object],
  contentStyle: Object as PropType<CSSProperties>,
  arrowClass: [String, Array, Object],
  arrowStyle: Object as PropType<CSSProperties>,
  duration: [Number, Object] as PropType<number | { enter: number; leave: number }>,
}
