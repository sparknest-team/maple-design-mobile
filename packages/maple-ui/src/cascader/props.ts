import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { openTriggerTargetProp } from '../_components/picker-field/open-trigger'
import type { VirtualListProps } from '../_components/virtual-list-v2/interface'
import type { OptionsLoader } from '../_hooks/use-option-request'
import type { ComponentSize } from '../_utils/constant'
import type { Data } from '../_utils/types'
import {
  fieldDecoratorProps,
  fieldLoadingProps,
  fieldVariants,
  type FieldDecoratorVariant,
} from '../field-decorator/props'
import type { TriggerProps } from '../trigger'
import { emptyValueProp } from '../utils/empty-value'
import type { OptionSearchField } from '../utils/option-data'
import { popupContainerProp } from '../utils/popup-container'
import type { CascaderFieldNames, CascaderOption } from './types'

export type CascaderEditMode = import('../_components/field-presentation/context').FieldEditMode
export const cascaderProps = {
  ...fieldLoadingProps,
  openTriggerTarget: openTriggerTargetProp,
  /** 清空动作产生的模型值；省略保留原默认值。 */
  /** 内置本地过滤是否区分大小写；自定义过滤函数优先。 */
  caseSensitive: { type: Boolean, default: false },
  /** 内置搜索字段；语义字段通过 fieldNames 映射。 */
  searchFields: { type: Array as PropType<readonly OptionSearchField[]>, default: () => ['label'] },
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<string | number | (string | number)[] | (string | number)[][]>(),
  showTags: { type: Boolean, default: true },
  separator: { type: String, default: ',' },
  /** 文字对齐；未设置时继承 FormItem.contentAlign，独立使用默认阅读起点 start。 */
  textAlign: { type: String as PropType<'left' | 'right' | 'center'> },

  autoFitPopupWidth: { type: Boolean, default: false },
  hint: fieldDecoratorProps.hint,
  line: fieldDecoratorProps.line,
  textColor: fieldDecoratorProps.textColor,
  focusColor: fieldDecoratorProps.focusColor,
  blurColor: fieldDecoratorProps.blurColor,
  readonly: { type: Boolean, default: undefined },
  variant: {
    type: String as PropType<FieldDecoratorVariant>,
    default: undefined,
    validator: (value: FieldDecoratorVariant) => fieldVariants.includes(value),
  },
  /**
   * @zh 绑定值是否为路径
   * @en Whether the value is a path
   */
  pathMode: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 是否为多选状态（多选模式默认开启搜索）
   * @en Whether it is a multi-selection state (The search is turned on by default in the multi-select mode)
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
    type: [String, Number, Object, Array] as PropType<
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any> | (string | number | Record<string, any>)[])[]
      | undefined
    >,
  },
  /**
   * @zh 默认值（非受控状态）
   * @en Default value (uncontrolled state)
   * @default-value '' \| undefined \| []
   */
  defaultValue: {
    type: [String, Number, Object, Array] as PropType<
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any> | (string | number | Record<string, any>)[])[]
      | undefined
    >,
    default: (props: Data) => (props.multiple ? [] : props.pathMode ? undefined : ''),
  },
  /**
   * @zh 级联选择器的选项
   * @en Options for cascader
   */
  options: {
    type: [Array, Function] as PropType<readonly CascaderOption[] | OptionsLoader<CascaderOption>>,
    default: undefined,
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
   * @zh 选择框的大小
   * @en The size of the select
   * @values 'xs', 'sm', 'md', 'lg', 'xl'
   * @default-value 'md'
   */
  size: {
    type: String as PropType<ComponentSize>,
  },
  /**
   * @zh 是否允许搜索
   * @en Whether to allow searching
   * @default-value false (single) \| true (multiple)
   */
  filterable: {
    type: Boolean,
    default: (props: Data) => Boolean(props.multiple),
  },
  /**
   * @zh 是否允许清除
   * @en Whether to allow clear
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 输入框的值
   * @en The value of the input
   * @v-model
   */
  inputValue: {
    type: String,
    default: undefined,
  },
  /**
   * @zh 输入框的默认值（非受控状态）
   * @en The default value of the input (uncontrolled state)
   */
  defaultInputValue: {
    type: String,
    default: '',
  },
  /**
   * @zh 是否显示下拉框
   * @en Whether to show the dropdown
   * @v-model
   */
  open: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @zh 展开下一级的触发方式
   * @en Expand the trigger method of the next level
   */
  expandTrigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  /**
   * @zh 是否默认显示下拉框（非受控状态）
   * @en Whether to display the dropdown by default (uncontrolled state)
   */
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 占位符
   * @en Placeholder
   */
  placeholder: String,
  /**
   * @zh 自定义选项过滤方法
   * @en Custom options filter method
   */
  filterOption: {
    type: Function as PropType<(inputValue: string, option: CascaderOption) => boolean>,
  },
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for popup
   */
  popupContainer: popupContainerProp,
  /**
   * @zh 多选模式下，最多显示的标签数量。0 表示不限制
   * @en In multi-select mode, the maximum number of labels displayed. 0 means unlimited
   */
  maxTagCount: {
    type: Number,
    default: 0,
  },
  /**
   * @zh 格式化展示内容
   * @en Format display content
   */
  formatLabel: {
    type: Function as PropType<(options: CascaderOption[]) => string>,
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
   * @zh 是否开启严格选择模式
   * @en Whether to enable strict selection mode
   */
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 数据懒加载函数，传入时开启懒加载功能
   * @en Data lazy loading function, open the lazy loading function when it is passed in
   */
  loadMore: {
    type: Function as PropType<(option: CascaderOption, done: (children?: CascaderOption[]) => void) => void>,
  },
  /**
   * @zh 搜索下拉菜单中的选项是否仅展示标签
   * @en Whether the options in the search dropdown show only label
   */
  searchOptionOnlyLabel: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 触发搜索事件的延迟时间
   * @en Delay time to trigger search event
   */
  searchDelay: {
    type: Number,
    default: 500,
  },
  /**
   * @zh 自定义 `CascaderOption` 中的字段；当选项值为对象时，也用其中的 `value` 作为键属性
   * @en Customize fields in `CascaderOption`; when option value is an object, `value` is also used as the key property
   */
  fieldNames: {
    type: Object as PropType<CascaderFieldNames>,
  },
  /**
   * @zh 自定义不存在选项的值的展示
   * @en Options that do not exist in custom values
   */
  fallbackOption: {
    type: [Boolean, Function] as PropType<
      | boolean
      | ((value: string | number | Record<string, unknown> | (string | number | Record<string, unknown>)[]) => string)
    >,
    default: true,
  },
  /**
   * @zh 是否展开子菜单
   * @en whether to expand the submenu
   */
  expandChild: {
    type: Boolean,
    default: false,
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
   * @zh 标签内容不换行
   * @en Tag content does not wrap
   */
  tagNowrap: {
    type: Boolean,
    default: false,
  },
}

export type CascaderProps = import('vue').ExtractPublicPropTypes<typeof cascaderProps>
