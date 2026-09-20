import type { ExtractPropTypes, InputHTMLAttributes, PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickProps } from '../utils/components'

export type TextareaVariant = 'filled' | 'outline' | 'standard'

export interface TextareaMaxLength {
  length: number
  errorOnly?: boolean
}

export interface TextareaAutoSize {
  minRows?: number
  maxRows?: number
}

export type WordLength = (value: string) => number
export type WordSlice = (value: string, maxLength: number) => string

export const textareaProps = {
  /** 绑定值 */
  modelValue: String,
  /** v-model 修饰符 */
  modelModifiers: {
    type: Object as PropType<{ trim?: boolean }>,
    default: () => ({}),
  },
  /** 非受控初始值 */
  defaultValue: { type: String, default: '' },
  /** 文本域行数 */
  rows: [String, Number],
  /** 最大输入长度 */
  maxLength: {
    type: [Number, Object] as PropType<number | TextareaMaxLength>,
    default: 0,
  },
  /** 是否显示字数统计 */
  showWordLimit: { type: Boolean, default: false },
  /** 字符长度计算方法 */
  wordLength: Function as PropType<WordLength>,
  /** 字符截取方法 */
  wordSlice: Function as PropType<WordSlice>,
  /** 是否只读 */
  readonly: { type: Boolean, default: false },
  /** 是否允许垂直拖动调整尺寸 */
  resize: { type: Boolean, default: false },
  /** 是否根据内容自动调整高度 */
  autoSize: {
    type: [Boolean, Object] as PropType<boolean | TextareaAutoSize>,
    default: false,
  },
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
  /** 外观变体 */
  variant: {
    type: String as PropType<TextareaVariant>,
    default: 'outline',
  },
  /** 是否禁用 */
  disabled: { type: Boolean, default: undefined },
  /** 是否允许清空 */
  clearable: { type: Boolean, default: false },
  /** 是否显示错误状态 */
  error: { type: Boolean, default: false },
}

export type TextareaProps = import('vue').ExtractPublicPropTypes<typeof textareaProps>
export const props = textareaProps
