import type { InjectionKey } from 'vue'
import type { OptionSearchField } from '../utils/option-data'
import type { FilterOption, SelectFieldNames, SelectOptionInfo } from './types'

export interface SelectContext {
  multiple?: boolean
  fieldNames?: Required<SelectFieldNames>
  inputValue?: string
  filterOption?: FilterOption
  caseSensitive?: boolean
  searchFields?: readonly OptionSearchField[]
  component?: string
  valueKeys: string[]
  getOptionId?: (key: string) => string
  activeKey: string | undefined
  onSelect: (key: string, ev: Event) => void
  setActiveKey: (key?: string) => void
  getNextSlotOptionIndex: () => number
  addSlotOptionInfo: (id: number, optionInfo: SelectOptionInfo) => void
  removeSlotOptionInfo: (id: number) => void
}

export const selectInjectionKey: InjectionKey<SelectContext> = Symbol('CedarSelectContext')
