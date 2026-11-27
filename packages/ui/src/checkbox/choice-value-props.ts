import type { PropType } from 'vue'

export const checkboxValueProps = {
  /** 受控值：布尔选中状态或选中值数组 */
  modelValue: {
    type: [Boolean, Array] as PropType<boolean | (string | number | boolean)[] | null>,
    default: undefined,
  },
  /** 非受控初始值，只在初始化读取 */
  defaultValue: { type: [Boolean, Array] as PropType<boolean | (string | number | boolean)[] | null>, default: false },
  /** 数组/分组模式的选项标识；布尔模式不改变值类型 */
  value: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: true },
}

export const radioValueProps = {
  /** 受控选项值；null 表示未选中 */
  modelValue: { type: [String, Number, Boolean] as PropType<string | number | boolean | null>, default: undefined },
  /** 非受控初始选项值，只在初始化读取 */
  defaultValue: { type: [String, Number, Boolean] as PropType<string | number | boolean | null>, default: null },
  /** 当前选项标识 */
  value: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: true },
}
