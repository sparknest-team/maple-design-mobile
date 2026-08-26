import { InputHTMLAttributes, VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const searchProps: Record<keyof SearchProps, any>

export type SearchShape = 'square' | 'round'
export type SearchActionType = 'cancel' | 'search'

export interface SearchField {
  value: any
  label: string
  placeholder?: string
}

export interface SearchResult {
  searchField?: string
  searchText?: string
  model?: any
}

export interface SearchProps extends BasicAttributes {
  modelValue?: string
  searchField?: string
  defaultField?: string
  searchText?: string
  model?: any
  selectStyle?: any
  fields?: SearchField[]
  enableSearchHistory?: boolean
  searchHistoryMaxCount?: number
  searchHistoryKey?: string
  label?: string
  type?: 'text' | 'password' | 'number' | 'tel' | 'email'
  ariaLabel?: string
  placeholder?: string
  maxLength?: string | number
  disabled?: boolean
  readonly?: boolean
  autofocus?: boolean
  enterkeyhint?: InputHTMLAttributes['enterKeyHint']
  textColor?: string
  focusColor?: string
  blurColor?: string
  shape?: SearchShape
  background?: string
  inputBackground?: string
  actionText?: string
  actionType?: SearchActionType
  showAction?: boolean
  clearable?: boolean
  searchIcon?: string
  onFocus?: ListenerProp<(e: FocusEvent) => void>
  onBlur?: ListenerProp<(e: FocusEvent) => void>
  onInput?: ListenerProp<(value: string, e: Event) => void>
  onChange?: ListenerProp<((value: string, e: Event) => void) | ((result: SearchResult) => void)>
  onClear?: ListenerProp<(value: string) => void>
  onSearch?: ListenerProp<(result: SearchResult, e?: Event) => void>
  onCancel?: ListenerProp<() => void>
  'onUpdate:modelValue'?: ListenerProp<(value: string) => void>
  'onUpdate:searchText'?: ListenerProp<(value?: string) => void>
  'onUpdate:searchField'?: ListenerProp<(value?: string) => void>
  'onUpdate:model'?: ListenerProp<(value: any) => void>
}

export interface SearchClearIconData {
  clear: (e: Event) => void
}

export class Search extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<SearchProps>

  $props: SearchProps

  $slots: {
    prefix(): VNode[]
    'clear-icon'(data: SearchClearIconData): VNode[]
    action(): VNode[]
  }

  focus(): void

  blur(): void
}

export class _SearchComponent extends Search {}
