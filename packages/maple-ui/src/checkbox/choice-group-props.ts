import type { PropType } from 'vue'
import type { ChoiceFieldNames, ChoiceOptionInput } from './choice-options'
import type { ChoiceValue } from './choice-value-props'
import { radioValueProps } from './choice-value-props'

export const choiceOptionsProps = {
  /** 选项数据；传入数组（包括空数组）时替代默认插槽 */
  options: { type: Array as PropType<ChoiceOptionInput[]>, default: undefined },
  /** 业务字段映射 */
  fieldNames: { type: Object as PropType<ChoiceFieldNames>, default: undefined },
}

export const checkboxGroupValueProps = {
  /** 受控值 */
  modelValue: { type: Array as PropType<ChoiceValue[]>, default: undefined },
  /** 非受控初始值 */
  defaultValue: { type: Array as PropType<ChoiceValue[]>, default: () => [] },
  /** 最多可选数量 */
  max: Number,
}

export const radioGroupValueProps = {
  modelValue: radioValueProps.modelValue,
  defaultValue: radioValueProps.defaultValue,
}
