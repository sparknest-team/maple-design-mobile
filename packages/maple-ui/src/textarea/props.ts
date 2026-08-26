import type { ExtractPropTypes, InputHTMLAttributes, PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickProps } from '../utils/components'

export const textareaProps = {
  /** 绑定值 */
  modelValue: String,
  /** v-model 修饰符 */
  modelModifiers: {
    type: Object as PropType<{ trim?: boolean }>,
    default: () => ({}),
  },
  /** 文本域行数 */
  rows: {
    type: [String, Number],
    default: 8,
  },
  /** 最大输入长度 */
  maxLength: [String, Number],
  /** 是否只读 */
  readonly: Boolean,
  /** 是否允许垂直拖动调整尺寸 */
  resize: Boolean,
  /** 是否自动聚焦 */
  autofocus: Boolean,
  /** 无障碍标签 */
  ariaLabel: String,
  /** 虚拟键盘回车键提示 */
  enterkeyhint: String as PropType<InputHTMLAttributes['enterKeyHint']>,
  /** 透传给原生 textarea 的属性 */
  textareaAttrs: Object as PropType<Record<string, any>>,
  /** 聚焦事件 */
  /** 失焦事件 */
  /** 输入事件 */
  /** 值变化事件 */
  /** 键盘按下事件 */
  /** 清空事件 */
  /** v-model 更新事件 */
  ...pickProps(fieldDecoratorProps, [
    'size',
    'variant',
    'placeholder',
    'line',
    'hint',
    'textColor',
    'focusColor',
    'blurColor',
    'disabled',
    'clearable',
  ]),
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export const props = textareaProps
