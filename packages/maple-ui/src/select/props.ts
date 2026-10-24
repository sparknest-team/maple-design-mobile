import type { ExtractPropTypes, PropType } from 'vue'
import {
  beforeFieldCommitProp,
  fieldPresentationProp,
  readPrettyProp,
  type FieldPresentation,
} from '../_components/field-presentation/context'
import type { ScrollbarProps } from '../_components/selection-scrollbar'
import type { VirtualListProps } from '../_components/virtual-list-v2/interface'
import { componentSizes } from '../_utils/constant'
import type { ComponentSize } from '../_utils/constant'
import { fieldDecoratorProps, fieldVariants } from '../field-decorator/props'
import type { FieldDecoratorVariant } from '../field-decorator/props'
import type { TriggerProps } from '../trigger'
import { popupContainerProp } from '../utils/popup-container'
import type { SelectFieldNames, SelectOptionData, SelectOptionGroup } from './types'

export type SelectPresentation = FieldPresentation
export const selectProps = {
  showTags: { type: Boolean, default: true },
  separator: { type: String, default: ',' },
  textAlign: { type: String as PropType<'left' | 'right' | 'center'>, default: 'left' },
  presentation: fieldPresentationProp,
  readPretty: readPrettyProp,
  beforeCommit: beforeFieldCommitProp,
  readonly: { type: Boolean, default: undefined },
  hint: fieldDecoratorProps.hint,
  line: fieldDecoratorProps.line,
  textColor: fieldDecoratorProps.textColor,
  focusColor: fieldDecoratorProps.focusColor,
  blurColor: fieldDecoratorProps.blurColor,
  /** 下拉菜单是否与触发框等宽；false 时按内容自适应。 */
  autoFitPopupWidth: { type: Boolean, default: true },
  /**
   * @zh 是否开启多选模式（多选模式默认开启搜索）
   * @en Whether to open multi-select mode (The search is turned on by default in the multi-select mode)
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 绑定值
   * @en Value
   */
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<
      string | number | boolean | Record<string, unknown> | (string | number | boolean | Record<string, unknown>)[]
    >,
    default: undefined,
  },
  /**
   * @zh 默认值（非受控模式）
   * @en Default value (uncontrolled mode)
   * @default-value '' \| []
   */
  defaultValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<
      string | number | boolean | Record<string, unknown> | (string | number | boolean | Record<string, unknown>)[]
    >,
    default: (props: { multiple?: boolean }) => (props.multiple ? [] : ''),
  },
  /**
   * @zh 输入框的值
   * @en The value of the input
   * @v-model
   */
  inputValue: {
    type: String,
  },
  /**
   * @zh 输入框的默认值（非受控模式）
   * @en The default value of the input (uncontrolled mode)
   */
  defaultInputValue: {
    type: String,
    default: '',
  },
  /**
   * @zh 选择框的大小
   * @en The size of the select
   * @values 'xs','sm','md','lg','xl'
   * @default-value 'md'
   */
  size: {
    type: String as PropType<ComponentSize>,
    validator: (value: unknown): value is ComponentSize => componentSizes.includes(value as ComponentSize),
  },
  /**
   * @zh 选择框的变体
   * @en The variant of the select
   * @values 'filled', 'outline', 'standard'
   * @default-value 'filled'
   */
  variant: {
    type: String as PropType<FieldDecoratorVariant>,
    validator: (value: unknown): value is FieldDecoratorVariant =>
      fieldVariants.includes(value as FieldDecoratorVariant),
  },
  /**
   * @zh 占位符
   * @en Placeholder
   */
  placeholder: String,
  /**
   * @zh 是否为加载中状态
   * @en Whether it is loading state
   */
  loading: {
    type: Boolean,
    default: false,
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
   * @zh 是否为错误状态
   * @en Whether it is an error state
   */
  error: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @zh 是否允许清空
   * @en Whether to allow clear
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @zh 是否允许搜索
   * @en Whether to allow searching
   * @default-value false (single) \| true (multiple)
   */
  filterable: {
    type: [Boolean, Object] as PropType<boolean | { retainInputValue?: boolean }>,
    default: (props: { multiple?: boolean }) => Boolean(props.multiple),
  },
  /**
   * @zh 是否允许创建
   * @en Whether to allow creation
   */
  creatable: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 多选模式下，最多显示的标签数量。0 表示不限制
   * @en In multi-select mode, the maximum number of labels displayed. 0 means unlimited
   */
  maxTagCount: {
    type: Number,
    default: 0,
  },
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for popup
   */
  popupContainer: popupContainerProp,
  /**
   * @zh 打开列表且无有效选中项时激活首个可用候选；仅高亮，不更新 modelValue 或触发 change
   * @en Activate the first enabled candidate on opening when no valid selection exists; highlighting does not update modelValue or emit change
   * @version 2.43.0
   */
  defaultActiveFirstOption: {
    type: Boolean,
    default: true,
  },
  /**
   * @zh 是否显示下拉菜单
   * @en Whether to show the dropdown
   * @v-model
   */
  open: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @zh 弹出框默认是否可见（非受控模式）
   * @en Whether the popup is visible by default (uncontrolled mode)
   */
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 是否在下拉菜单关闭时销毁元素
   * @en Whether to destroy the element when the dropdown is closed
   */
  unmountOnClose: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 是否过滤选项
   * @en Whether to filter options
   */
  filterOption: {
    type: [Boolean, Function] as PropType<boolean | ((inputValue: string, option: SelectOptionData) => boolean)>,
    default: true,
  },
  /**
   * @zh 选项数据
   * @en Option data
   */
  options: {
    type: Array as PropType<(string | number | boolean | SelectOptionData | SelectOptionGroup)[]>,
    default: () => [],
  },
  /**
   * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
   * @en Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)
   * @type VirtualListProps
   */
  virtualListProps: {
    type: Object as PropType<VirtualListProps>,
  },
  /**
   * @zh 下拉菜单的触发器属性
   * @en Trigger props of the drop-down menu
   * @type TriggerProps
   */
  triggerProps: {
    type: Object as PropType<TriggerProps>,
  },
  /**
   * @zh 格式化显示内容
   * @en Format display content
   */
  formatLabel: {
    type: Function as PropType<(data: SelectOptionData) => string>,
  },
  /**
   * @zh 自定义值中不存在的选项
   * @en Options that do not exist in custom values
   * @version 2.10.0
   */
  fallbackOption: {
    type: [Boolean, Function] as PropType<
      boolean | ((value: string | number | boolean | Record<string, unknown>) => SelectOptionData)
    >,
    default: true,
  },
  /**
   * @zh 是否在下拉菜单中显示额外选项
   * @en Options that do not exist in custom values
   * @version 2.10.0
   */
  showExtraOptions: {
    type: Boolean,
    default: true,
  },
  /**
   * @zh 触发搜索事件的延迟时间
   * @en Delay time to trigger search event
   * @version 2.18.0
   */
  searchDelay: {
    type: Number,
    default: 500,
  },
  /**
   * @zh 多选时最多的选择个数
   * @en Maximum number of choices in multiple choice
   * @version 2.18.0
   */
  limit: {
    type: Number,
    default: 0,
  },
  /**
   * @zh 自定义 `SelectOptionData` 中的字段；当选项值为对象时，也用其中的 `value` 作为键属性
   * @en Customize fields in `SelectOptionData`; when option value is an object, `value` is also used as the key property
   * @version 2.22.0
   */
  fieldNames: {
    type: Object as PropType<SelectFieldNames>,
  },
  /**
   * @zh 是否开启虚拟滚动条
   * @en Whether to enable virtual scroll bar
   * @version 2.38.0
   */
  scrollbar: {
    type: [Boolean, Object] as PropType<boolean | ScrollbarProps>,
    default: true,
  },
  /**
   * @zh 空状态时是否显示header
   * @en Whether to display the header in the empty state
   */
  showHeaderOnEmpty: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   * @zh 空状态时是否显示footer
   * @en Whether to display the footer in the empty state
   */
  showFooterOnEmpty: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   * @zh 标签内容不换行
   * @en Tag content does not wrap
   * @version 2.56.1
   */
  tagNowrap: {
    type: Boolean,
    default: false,
  },
}

export type SelectProps = import('vue').ExtractPublicPropTypes<typeof selectProps>
