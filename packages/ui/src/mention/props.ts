import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import type { OptionsLoader } from '../_hooks/use-option-request'
import { fieldLoadingProps } from '../field-decorator/props'
import type { SelectOptionData, SelectOptionGroup } from '../select/types'
import { emptyValueProp } from '../utils/empty-value'
import type { MentionTokenValue } from './token-codec'

export const mentionProps = {
  readonly: { type: Boolean, default: undefined },
  ...fieldPresentationProps,
  loading: fieldLoadingProps.loading,
  emptyValue: emptyValueProp<string>(),
  /**
   * @zh 绑定值
   * @en Value
   * @v-model
   */
  modelValue: String as PropType<string | null>,
  /**
   * @zh 默认值（非受控状态）
   * @en Default value (uncontrolled state)
   */
  defaultValue: {
    type: String,
    default: '',
  },
  /** Enable encoded, indivisible @ mentions instead of plain text insertion. */
  atomic: { type: Boolean, default: false },
  /** Resolve a missing mention's display data synchronously. */
  fallbackOption: {
    type: Function as PropType<(value: MentionTokenValue) => SelectOptionData | null | undefined>,
  },
  /**
   * @zh 用于自动补全的数据
   * @en Data for automatic completion
   */
  options: {
    type: [Array, Function] as PropType<
      | readonly (string | number | SelectOptionData | SelectOptionGroup)[]
      | OptionsLoader<string | number | SelectOptionData | SelectOptionGroup>
    >,
    default: undefined,
  },
  /**
   * @zh 触发自动补全的关键字
   * @en Keywords that trigger auto-completion
   */
  prefix: {
    type: [String, Array] as PropType<string | string[]>,
    default: '@',
  },
  /**
   * @zh 选中项的前后分隔符
   * @en Before and after the selected item separator
   */
  split: {
    type: String,
    default: ' ',
  },
  /**
   * @zh 输入框或文本域
   * @en default input or textarea
   */
  type: {
    type: String as PropType<'input' | 'textarea'>,
    default: 'input',
  },
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @zh 是否允许清空输入框
   * @en Whether to allow the input to be cleared
   */
  clearable: {
    type: Boolean,
    default: false,
  },
}
