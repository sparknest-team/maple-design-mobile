import type { VNodeChild } from 'vue'

export type { MenuFieldNames } from './selection'
export type { MenuPosition } from './platform'
export type { MenuProps } from './props'
export type MenuValue = string | number | boolean | Record<string, any> | any[] | undefined
export type MenuOptionLabelRender = (option: MenuOptionData, checked: boolean) => VNodeChild
export type MenuOptionLabel = VNodeChild | MenuOptionLabelRender
export interface MenuOptionData {
  label?: MenuOptionLabel
  value?: any
  disabled?: boolean
  ripple?: boolean
  children?: MenuOptionData[]
  [key: string]: any
}
