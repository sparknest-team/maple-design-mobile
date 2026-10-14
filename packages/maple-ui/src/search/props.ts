import type { ExtractPropTypes, ExtractPublicPropTypes, PropType, StyleValue } from 'vue'
import type { ButtonProps } from '../button'
import { inputProps } from '../input'

export type SearchShape = 'square' | 'round'
export type SearchActionType = 'cancel' | 'search'

export interface SearchField {
  value: string
  label: string
  placeholder?: string
}

export const searchProps = {
  /** 搜索关键词 */
  modelValue: String,
  /** 默认搜索关键词（非受控状态） */
  defaultValue: { type: String, default: '' },
  /** 当前搜索字段 */
  modelField: String,
  /** 默认搜索字段（非受控状态） */
  defaultField: String,
  /** 字段搜索模式下的表单对象 */
  model: Object as PropType<Record<string, unknown>>,
  /** 字段选择器样式 */
  selectStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },
  /** 受控的最近搜索记录 */
  recentSearches: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /** 搜索记录最大数量 */
  maxSearchHistoryCount: {
    type: Number,
    default: 5,
  },
  /** 是否通过全屏弹层展示搜索历史 */
  historyPopup: {
    type: Boolean,
    default: true,
  },
  /** 搜索字段可选项 */
  fields: {
    type: Array as PropType<SearchField[]>,
    default: () => [],
  },
  /** 是否显示公共搜索按钮 */
  searchButton: { type: Boolean, default: false },
  /** 公共搜索按钮文字 */
  buttonText: String,
  /** 公共搜索按钮属性 */
  buttonProps: Object as PropType<ButtonProps>,
  /** 是否处于加载状态 */
  loading: { type: Boolean, default: false },
  /** 搜索框左侧文本 */
  label: String,
  /** 内层搜索框形状 */
  shape: {
    type: String as PropType<SearchShape>,
    default: 'round',
  },
  /** 外层背景色 */
  background: String,
  /** 内层搜索框背景色 */
  inputBackground: String,
  /** 移动端操作按钮文字 */
  actionText: String,
  /** 移动端操作按钮类型 */
  actionType: {
    type: String as PropType<SearchActionType>,
    default: 'cancel',
  },
  /** 是否显示移动端操作按钮 */
  showAction: Boolean,
  /** 搜索图标名称 */
  searchIcon: {
    type: String,
    default: 'search',
  },
  modelModifiers: inputProps.modelModifiers,
  type: inputProps.type,
  ariaLabel: inputProps.ariaLabel,
  placeholder: inputProps.placeholder,
  maxLength: inputProps.maxLength,
  readonly: inputProps.readonly,
  disabled: inputProps.disabled,
  autofocus: inputProps.autofocus,
  enterkeyhint: inputProps.enterkeyhint,
  textColor: inputProps.textColor,
  focusColor: inputProps.focusColor,
  blurColor: inputProps.blurColor,
  size: inputProps.size,
  variant: { ...inputProps.variant, default: 'outline' },
  /** 是否允许清空 */
  clearable: { type: Boolean, default: false },
  inputAttrs: inputProps.inputAttrs,
  error: inputProps.error,
}

export type SearchProps = ExtractPublicPropTypes<typeof searchProps>
export type SearchResolvedProps = ExtractPropTypes<typeof searchProps>
