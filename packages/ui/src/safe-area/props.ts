import type { PropType } from 'vue'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'

export const safeAreaEdges = ['top', 'right', 'bottom', 'left'] as const
export type SafeAreaEdge = (typeof safeAreaEdges)[number]
/** CSS pixels relative to the WebView content viewport. Omitted sides use CSS env(). */
export type SafeAreaInsets = Partial<Record<SafeAreaEdge, number>>

export const safeAreaProps = {
  /** 需要留白的边；空数组仅提供局部覆盖，不增加留白。 */
  edges: {
    type: Array as PropType<SafeAreaEdge[]>,
    default: () => [...safeAreaEdges],
    validator: (edges: SafeAreaEdge[]) => edges.every((edge) => safeAreaEdges.includes(edge)),
  },
  /** 宿主提供的安全区，单位 CSS px；0 表示宿主已避让。 */
  insets: Object as PropType<SafeAreaInsets>,
  /** 消费过的边不再由实际 DOM 后代重复补偿。 */
  consume: { type: Boolean, default: true },
  /** 容器标签。 */
  tag: { type: String, default: 'div' },
}
export type SafeAreaProps = ExtractPublicPropTypes<typeof safeAreaProps>
