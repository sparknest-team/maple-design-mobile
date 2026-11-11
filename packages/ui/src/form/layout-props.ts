import type { CSSProperties, PropType } from 'vue'
import type { ColProps } from '../col/props'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'
export type FormLabelAlign = 'start' | 'end' | 'left' | 'right'
export type FormContentAlign = 'start' | 'end' | 'left' | 'center' | 'right'
export type FormColProps = ColProps
export type FormLabelFlex = number | string

/** Shared layout API; each library maintains its own copy. */
export const formItemLayoutProps = {
  /** 内容对齐；未设置时继承 Form，默认 start，作用于 inline、弹出入口和 readPretty。 */
  contentAlign: String as PropType<FormContentAlign>,
  /** 表单项布局，未设置时继承 Form。 */
  layout: String as PropType<FormLayout>,
  /** 标签对齐，未设置时继承 Form。 */
  labelAlign: String as PropType<FormLabelAlign>,
  /** 标签栅格参数，未设置时继承 Form；仅 horizontal 生效。 */
  labelColProps: Object as PropType<FormColProps>,
  /** 内容栅格参数，未设置时继承 Form；仅 horizontal 生效。 */
  wrapperColProps: Object as PropType<FormColProps>,
  /** 标签列的逐实例样式。 */
  labelColStyle: Object as PropType<CSSProperties>,
  /** 内容列的逐实例样式。 */
  wrapperColStyle: Object as PropType<CSSProperties>,
  /** 标签列 flex；数字为伸缩比例，带单位字符串为宽度，优先于自动宽度。 */
  labelColFlex: [Number, String] as PropType<FormLabelFlex>,
}

export const formLayoutProps = {
  ...formItemLayoutProps,
  /** 内容对齐方向；标签对齐独立由 labelAlign 控制。 */
  contentAlign: { type: String as PropType<FormContentAlign>, default: 'start' },
  /** 标签对齐方向。 */
  labelAlign: { type: String as PropType<FormLabelAlign>, default: 'end' },
  /** horizontal 默认标签占 5/24；响应式参数同 Col。 */
  labelColProps: { type: Object as PropType<FormColProps>, default: () => ({ span: 5, offset: 0 }) },
  /** horizontal 默认内容占 19/24；响应式参数同 Col。 */
  wrapperColProps: { type: Object as PropType<FormColProps>, default: () => ({ span: 19, offset: 0 }) },
  /** horizontal 下对齐当前可见标签的最大自然宽度。 */
  autoLabelWidth: { type: Boolean, default: false },
}
