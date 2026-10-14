import type { VNode } from 'vue'
import type { TabsKey } from './props'

export interface TabsEmits {
  'update:active': [key: TabsKey]
  change: [key: TabsKey]
  'tab-click': [key: TabsKey, event: Event]
  add: [event: Event]
  delete: [key: TabsKey, event: Event]
}
export interface TabsSlots {
  default?: () => VNode[]
}
export interface TabNavSlots {
  default?: () => VNode[]
  title?: () => VNode[]
  icon?: () => VNode[]
}
export interface TabPaneSlots {
  default?: () => VNode[]
  title?: () => VNode[]
}
export interface TabsNavsSlots {
  default?: () => VNode[]
  prefix?: () => VNode[]
  suffix?: () => VNode[]
  'add-icon'?: () => VNode[]
}
export interface TabsItemsSlots {
  default?: () => VNode[]
}
export interface TabItemSlots {
  default?: () => VNode[]
}
export interface TabsNavsExpose {
  resize: () => void
}
