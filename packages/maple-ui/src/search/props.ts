import { type PropType } from 'vue'
import { inputProps } from '../input'
import { pickProps } from '../utils/components'
import type { SearchResult } from './result'

export type SearchShape = 'square' | 'round'
export type SearchActionType = 'cancel' | 'search'

export interface SearchField {
  value: any
  label: string
  placeholder?: string
}

export const props = {
  modelValue: String,
  defaultValue: String,
  label: String,
  modelField: String,
  searchField: String,
  defaultField: String,
  searchText: String,
  model: Object,
  selectStyle: Object,
  recentSearches: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  maxSearchHistoryCount: {
    type: Number,
    default: 5,
  },
  historyPopup: {
    type: Boolean,
    default: true,
  },
  fields: {
    type: Array as PropType<SearchField[]>,
    default: () => [],
  },
  shape: {
    type: String as PropType<SearchShape>,
    default: 'round',
  },
  background: String,
  inputBackground: String,
  actionText: {
    type: String,
    default: '取消',
  },
  actionType: {
    type: String as PropType<SearchActionType>,
    default: 'cancel',
  },
  showAction: Boolean,
  clearable: {
    type: Boolean,
    default: true,
  },
  searchIcon: {
    type: String,
    default: 'search',
  },
  ...pickProps(inputProps, [
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
  ]),
}
