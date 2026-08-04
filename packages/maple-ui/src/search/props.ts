import { type PropType } from 'vue'
import { inputProps } from '../input'
import { defineListenerProp, pickProps } from '../utils/components'
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
    default: 'magnify',
  },
  onSearch: defineListenerProp<(result: SearchResult, e?: Event) => void>(),
  onCancel: defineListenerProp<() => void>(),
  onFocus: defineListenerProp<(e: FocusEvent) => void>(),
  onBlur: defineListenerProp<(e: FocusEvent) => void>(),
  onInput: defineListenerProp<(value: string, e: Event) => void>(),
  onChange: defineListenerProp<(value: string, e?: Event) => void>(),
  onClear: defineListenerProp<(value: string) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: string) => void>(),
  'onUpdate:modelField': defineListenerProp<(value: string | undefined) => void>(),
  'onUpdate:searchText': defineListenerProp<(value: string | undefined) => void>(),
  'onUpdate:searchField': defineListenerProp<(value: string | undefined) => void>(),
  'onUpdate:model': defineListenerProp<(value: any) => void>(),
  ...pickProps(inputProps, [
    'type',
    'ariaLabel',
    'placeholder',
    'maxlength',
    'readonly',
    'disabled',
    'autofocus',
    'enterkeyhint',
    'textColor',
    'focusColor',
    'blurColor',
  ]),
}
