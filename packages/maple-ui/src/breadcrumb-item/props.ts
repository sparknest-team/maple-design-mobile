import { defineListenerProp } from '../utils/components'

export const props = {
  /**
   * 分隔符（覆盖父级）
   */
  separator: [String, Number],
  /**
   * 跳转链接（最后一项不会渲染为链接）
   */
  href: String,
  onClick: defineListenerProp<(e: Event) => void>(),
}
