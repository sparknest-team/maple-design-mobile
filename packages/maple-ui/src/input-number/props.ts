import { type ExtractPropTypes, type PropType } from 'vue'
import type { ComponentSize } from '../utils/constants'

export type InputNumberMode = 'embed' | 'button' | 'input'
export type InputNumberModelEvent = 'change' | 'input'
export type InputNumberSize = ComponentSize

export const props = {
  /** 绑定值 */
  modelValue: Number,
  /** 默认值，非受控模式下使用 */
  defaultValue: Number,
  /** 控制按钮布局模式 */
  mode: {
    type: String as PropType<InputNumberMode>,
    default: 'embed',
  },
  /** 最多保留的小数位数 */
  precision: Number,
  /** 增减步长 */
  step: {
    type: Number,
    default: 1,
  },
  /** 是否禁用 */
  disabled: Boolean,
  /** 是否展示错误状态 */
  error: Boolean,
  /** 最大值 */
  max: {
    type: Number,
    default: Infinity,
  },
  /** 最小值 */
  min: {
    type: Number,
    default: -Infinity,
  },
  /** 格式化输入框展示值 */
  formatter: Function as PropType<(value: string) => string>,
  /** 将展示值解析为数字文本 */
  parser: Function as PropType<(value: string) => string>,
  /** 输入框占位文本 */
  placeholder: String,
  /** 输入框尺寸 */
  size: {
    type: String as PropType<InputNumberSize>,
    default: 'md',
  },
  /** 是否允许清空 */
  clearable: Boolean,
  /** 触发 v-model 更新的时机 */
  modelEvent: {
    type: String as PropType<InputNumberModelEvent>,
    default: 'change',
  },
  /** 是否只读 */
  readonly: Boolean,
  /** 传给原生 input 的补充属性 */
  inputAttrs: Object as PropType<Record<string, any>>,
}

export type InputNumberProps = ExtractPropTypes<typeof props>
