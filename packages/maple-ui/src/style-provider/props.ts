import type { ExtractPublicPropTypes, PropType } from 'vue'

export type StyleVars = Record<string, string>

export const styleProviderProps = {
  /** 局部 CSS 变量，null 清空覆盖 */
  styleVars: {
    type: Object as PropType<StyleVars | null>,
    default: (): StyleVars | null => ({}),
  },
  /** 包裹元素的标签名 */
  tag: {
    type: String,
    default: 'div',
  },
}

export const props = styleProviderProps
export type StyleProviderProps = ExtractPublicPropTypes<typeof styleProviderProps>
export type StyleProviderDefaults = Omit<StyleProviderProps, 'styleVars'> & {
  styleVars?: StyleVars | null | (() => StyleVars | null)
}
