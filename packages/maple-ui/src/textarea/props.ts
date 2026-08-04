import type { ExtractPropTypes, InputHTMLAttributes, PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { defineListenerProp, pickProps } from '../utils/components'

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
  maxlength: [String, Number],
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
  onFocus: defineListenerProp<(e: FocusEvent) => void>(),
  /** 失焦事件 */
  onBlur: defineListenerProp<(e: FocusEvent) => void>(),
  /** 输入事件 */
  onInput: defineListenerProp<(value: string, e: Event) => void>(),
  /** 值变化事件 */
  onChange: defineListenerProp<(value: string, e: Event) => void>(),
  /** 键盘按下事件 */
  onKeydown: defineListenerProp<(e: KeyboardEvent) => void>(),
  /** 清空事件 */
  onClear: defineListenerProp<(value: string) => void>(),
  /** v-model 更新事件 */
  'onUpdate:modelValue': defineListenerProp<(value: string) => void>(),
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
    'onClick',
  ]),
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export const props = textareaProps
