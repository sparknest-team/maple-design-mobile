import type { PropType, RenderFunction } from 'vue'
import type { VirtualListProps } from '../_components/virtual-list-v2/interface'
import { inputProps } from '../input/props'
import type { SelectFieldNames, SelectOptionGroup } from '../select/types'
import type { TriggerProps } from '../trigger'
import { popupContainerProp } from '../utils/popup-container'

export interface AutoCompleteOptionData {
  value?: string | number
  label?: string
  render?: RenderFunction
  disabled?: boolean
  [key: string]: unknown
}

export type AutoCompleteOption = string | number | AutoCompleteOptionData

export interface AutoCompleteOptionInfo {
  value: string
  label: string
  /** 禁用；未设置时继承，显式 false 覆盖。 */
  disabled: boolean
  raw: AutoCompleteOptionData
}

export type AutoCompleteFieldNames = SelectFieldNames

export type AutoCompleteFilterOption = boolean | ((inputValue: string, option: AutoCompleteOptionData) => boolean)

export const autoCompleteProps = {
  /** 受控文本值。 */
  modelValue: String,
  /** 非受控初始文本。 */
  defaultValue: { type: String, default: '' },
  /** 候选；支持分组，value 唯一，选择后转为字符串。 */
  options: {
    type: Array as PropType<(AutoCompleteOption | SelectOptionGroup)[]>,
    default: () => [],
  },
  /** 映射 value、label、disabled 等字段。 */
  fieldNames: Object as PropType<AutoCompleteFieldNames>,
  /** 按标签过滤；false 用于远程筛选。 */
  filterOption: {
    type: [Boolean, Function] as PropType<AutoCompleteFilterOption>,
    default: true,
  },
  /** 内置过滤是否区分大小写。 */
  strict: { type: Boolean, default: false },
  /** 弹层挂载容器，与 Trigger 一致。 */
  popupContainer: popupContainerProp,
  /** 允许展开的条件，不负责过滤候选。 */
  shouldOpen: {
    type: Function as PropType<(inputValue: string) => boolean>,
    default: (inputValue: string) => inputValue.length > 0,
  },
  /** 弹层配置；不能覆盖内部 open / disabled / 容器优先级。 */
  triggerProps: Object as PropType<TriggerProps>,
  /** 传入后启用虚拟列表。 */
  virtualListProps: Object as PropType<VirtualListProps>,
  /** 输入外观；未设置时继承 Group。 */
  variant: inputProps.variant,
  /** 五档尺寸；未设置时继承 Group / Form / 全局配置。 */
  size: inputProps.size,
  /** 启用 Input 的浮动提示。 */
  hint: inputProps.hint,
  /** 显示边框或底线。 */
  line: inputProps.line,
  /** 实例文字颜色。 */
  textColor: inputProps.textColor,
  /** 实例聚焦颜色。 */
  focusColor: inputProps.focusColor,
  /** 实例失焦提示颜色。 */
  blurColor: inputProps.blurColor,
  /** 移动虚拟键盘回车提示。 */
  enterkeyhint: inputProps.enterkeyhint,
  /** 输入框可访问名称。 */
  ariaLabel: inputProps.ariaLabel,
  /** 允许清除可编辑的非空值。 */
  clearable: inputProps.clearable,
  disabled: inputProps.disabled,
  /** 只读，可聚焦复制，不展开候选。 */
  readonly: inputProps.readonly,
  /** 错误状态；未设置时继承 FormItem。 */
  error: inputProps.error,
  /** 占位文字或浮动提示内容。 */
  placeholder: inputProps.placeholder,
  /** 输入与候选选择使用相同的截断规则。 */
  maxLength: inputProps.maxLength,
  /** 显示字数统计。 */
  showWordLimit: inputProps.showWordLimit,
  /** 自定义长度计算。 */
  wordLength: inputProps.wordLength,
  /** 自定义截断。 */
  wordSlice: inputProps.wordSlice,
  /** 原生 input 属性，combobox 状态由组件维护。 */
  inputAttrs: inputProps.inputAttrs,
}

export type AutoCompleteProps = import('vue').ExtractPublicPropTypes<typeof autoCompleteProps>
