import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { ButtonProps } from '../button'
import { inputProps } from '../input'
import { pickProps } from '../utils/components'

export type SearchShape = 'square' | 'round'
export type SearchActionType = 'cancel' | 'search'

export interface SearchField {
  value: string
  label: string
  placeholder?: string
}

export const props = {
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
  actionText: {
    type: String,
    default: '取消',
  },
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
    default: 'magnify',
  },
  ...pickProps(inputProps, [
    'modelModifiers',
    'type',
    'ariaLabel',
    'placeholder',
    'maxLength',
    'readonly',
    'disabled',
    'autofocus',
    'enterkeyhint',
    'textColor',
    'focusColor',
    'blurColor',
    'size',
    'variant',
  ]),
  /** 是否允许清空 */
  clearable: { type: Boolean, default: false },
}

export type SearchProps = ExtractPropTypes<typeof props>
