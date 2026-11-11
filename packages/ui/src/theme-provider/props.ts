import type { ExtractPublicPropTypes, PropType } from 'vue'

export type StyleVarName = `--mp-${string}` | `mp${Capitalize<string>}`
export type StyleVars = Record<StyleVarName, string>

export type ThemeProviderMode = 'light' | 'dark'
export type ThemeProviderTheme = ThemeProviderMode | StyleVars

export const themeProviderProps = {
  /** 亮暗模式或主题预设，省略时继承外层；不修改文档主题。 */
  theme: {
    type: [String, Object] as PropType<ThemeProviderTheme>,
    default: undefined,
    validator: (value: unknown) =>
      value === 'light' || value === 'dark' || (!!value && typeof value === 'object' && !Array.isArray(value)),
  },
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

export const props = themeProviderProps
export type ThemeProviderProps = ExtractPublicPropTypes<typeof themeProviderProps>
export type ThemeProviderDefaults = Omit<ThemeProviderProps, 'styleVars'> & {
  styleVars?: StyleVars | null | (() => StyleVars | null)
}
