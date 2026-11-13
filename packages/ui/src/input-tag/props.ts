import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import type { ComponentSize } from '../_utils/constant'
import { componentSizes } from '../_utils/constant'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import { fieldLoadingProps } from '../field-decorator/props'
import { emptyValueProp } from '../utils/empty-value'
import type { InputTagFieldNames, TagData } from './types'

export const inputTagProps = {
  ...fieldPresentationProps,
  ...fieldLoadingProps,
  emptyValue: emptyValueProp<(string | number | TagData)[]>(),
  baseCls: String,
  /**
   * @zh 绑定值
   * @en Value
   * @v-model
   */
  modelValue: {
    type: Array as PropType<(string | number | TagData)[] | null>,
  },
  /**
   * @zh 默认值（非受控状态）
   * @en Default value (uncontrolled state)
   */
  defaultValue: {
    type: Array as PropType<(string | number | TagData)[]>,
    default: () => [],
  },
  /**
   * @zh 输入框的值
   * @en The value of the input
   * @v-model
   */
  inputValue: String,
  /**
   * @zh 输入框的默认值（非受控状态）
   * @en The default value of the input (uncontrolled state)
   */
  defaultInputValue: {
    type: String,
    default: '',
  },
  /**
   * @zh 占位符
   * @en Placeholder
   */
  placeholder: String,
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @zh 是否为错误状态
   * @en Whether it is an error state
   */
  error: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @zh 是否为只读模式
   * @en Whether it is read-only mode
   */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @zh 是否允许清空
   * @en Whether to allow clear
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 输入框的大小
   * @en The size of the input
   * @values 'xs','sm','md','lg','xl'
   * @default-value 'md'
   */
  size: {
    type: String as PropType<ComponentSize>,
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  /**
   * @zh 输入框的变体
   * @en The variant of the input
   * @values 'filled', 'outline', 'standard'
   * @default-value 'outline'
   */
  variant: {
    type: String as PropType<'filled' | 'outline' | 'standard'>,
    default: undefined,
    validator: (value: string) => ['filled', 'outline', 'standard'].includes(value),
  },
  /**
   * @zh 最多展示的标签个数，`0` 表示不限制
   * @en The maximum number of tags displayed, `0` means unlimited
   */
  maxTagCount: {
    type: Number,
    default: 0,
    validator: (value: number) => Number.isFinite(value) && Number.isInteger(value) && value >= 0,
  },
  /**
   * @zh 是否保留输入框的内容
   * @en Whether to keep the content of the input box
   */
  retainInputValue: {
    type: [Boolean, Object] as PropType<boolean | { create?: boolean; blur?: boolean }>,
    default: false,
  },
  /**
   * @zh 格式化标签内容
   * @en Format tag content
   */
  formatTag: {
    type: Function as PropType<(data: TagData) => string>,
  },
  /** Synchronously resolves display data for a primitive tag value. */
  fallbackOption: {
    type: Function as PropType<(value: string | number) => TagData | null | undefined>,
  },
  /**
   * @zh 是否仅创建唯一的值
   * @en Whether to create only unique values
   */
  uniqueValue: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 自定义 `TagData` 中的字段
   * @en Customize fields in `TagData`
   */
  fieldNames: {
    type: Object as PropType<InputTagFieldNames>,
  },
  /**
   * @zh 标签内容不换行
   * @en Tag content does not wrap
   */
  tagNowrap: {
    type: Boolean,
    default: false,
  },
  // private
  focused: Boolean,
  disabledInput: Boolean,
  uninjectFormItemContext: Boolean,
}

export type InputTagProps = Omit<
  ExtractPublicPropTypes<typeof inputTagProps>,
  'baseCls' | 'focused' | 'disabledInput' | 'uninjectFormItemContext'
>
