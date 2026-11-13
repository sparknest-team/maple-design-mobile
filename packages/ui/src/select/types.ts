import type { HTMLAttributes, RenderFunction, VNodeChild } from 'vue'
import { FieldString } from '../_utils/types'
import type { TagProps } from '../tag/props'
import type { TagEmits } from '../tag/types'
import type { selectEmits } from './emits'

type SelectTagListeners = {
  [K in keyof TagEmits as `on${Capitalize<K>}`]?: (...args: TagEmits[K]) => void
} & {
  [K in keyof TagEmits as `on${Capitalize<K>}Once`]?: (...args: TagEmits[K]) => void
}

/** Attributes and event listeners forwarded to an option's selected Tag. */
export type SelectOptionTagProps = TagProps &
  Omit<HTMLAttributes, keyof SelectTagListeners> &
  SelectTagListeners & {
    [key: `data-${string}`]: unknown
  }

export type SelectOptionValue = string | number | boolean | Record<string, unknown>

/** Published 1.x value contract, including the existing empty-string-option clear result. */
export type SelectValue = SelectOptionValue | SelectOptionValue[] | null | undefined

/** Optional single-select clear override; a function may explicitly return undefined. */
export type SelectEmptyValue = SelectValue | (() => SelectValue)

export interface OptionValueWithKey {
  value: SelectOptionValue
  key: string
}

export type SelectFieldNames = FieldString<SelectOptionData>

export interface SelectOptionData {
  /**
   * @zh 选项值
   * @en Option Value
   */
  value?: string | number | boolean | Record<string, unknown>
  /**
   * @zh 选项内容
   * @en Option content
   */
  label?: string
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean
  /**
   * @zh 选项对应的多选标签的属性
   * @en Props of the multi-select label corresponding to the option
   */
  tagProps?: any
  /**
   * @zh 自定义渲染
   * @en Custom Render
   */
  render?: RenderFunction

  [other: string]: any
}

export interface SelectOptionGroup {
  /**
   * @zh 是否为选项组
   * @en Whether it is an option group
   */
  isGroup: true
  /**
   * @zh 选项组标题
   * @en Option group title
   */
  label: string
  /**
   * @zh 选项组中的选项
   * @en Options in the option group
   */
  options: SelectOption[]

  [other: string]: any
}

/**
 * @zh 选项
 * @en Option
 */
export type SelectOption = string | number | boolean | SelectOptionData | SelectOptionGroup

export interface SelectOptionInfo extends SelectOptionData {
  raw: Record<string, unknown>
  key: string
  index?: number
  origin: 'slot' | 'options' | 'extraOptions'
  value: SelectOptionValue
  label: string
}

export interface SelectOptionGroupInfo extends SelectOptionGroup {
  key: string
  options: (SelectOptionInfo | SelectOptionGroupInfo)[]
}

/**
 * @zh 筛选
 * @en Filter
 */
export type FilterOption = boolean | ((inputValue: string, option: SelectOptionData) => boolean)

/** Event argument tuples derived from the runtime validators. */
export type SelectEmits = {
  [Event in keyof typeof selectEmits]: Parameters<(typeof selectEmits)[Event]>
}
export interface SelectSlots {
  default?(): VNodeChild
  option?(scope: { data: SelectOptionData }): VNodeChild
  label?(scope: { data: SelectOptionData }): VNodeChild
  read?(scope: { value: SelectValue; text: string }): VNodeChild
  selected?(): VNodeChild
  prefix?(): VNodeChild
  suffix?(): VNodeChild
  header?(): VNodeChild
  footer?(): VNodeChild
  empty?(): VNodeChild
  trigger?(): VNodeChild
  'clear-icon'?(scope: { clear(event?: Event): void }): VNodeChild
  'arrow-icon'?(scope: { focus: boolean; menuOpen: boolean }): VNodeChild
  'loading-icon'?(): VNodeChild
  'search-icon'?(): VNodeChild
}
export interface SelectExpose {
  refresh(): Promise<void>
  focus(): void
  blur(): void
}

export type { OptionSearchField } from '../utils/option-data'

export type SelectOptionsLoader = import('../_hooks/use-option-request').OptionsLoader<SelectOption>
