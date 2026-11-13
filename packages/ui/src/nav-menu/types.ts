import type { CSSProperties, HTMLAttributes, VNodeChild } from 'vue'

export type NavMenuKey = string | number
export type NavMenuMode = Extract<import('../utils/constants').Orientation, 'horizontal'>
export interface NavMenuRenderContext {
  option: NavMenuOption
  /** 当前普通节点自身匹配主值；不包含祖先路径、展开或焦点状态。 */
  active: boolean
  expanded: boolean
  level: number
}
export type NavMenuContent = VNodeChild | ((context: NavMenuRenderContext) => VNodeChild)
export interface NavMenuOption {
  key?: NavMenuKey
  type?: 'item' | 'group' | 'divider'
  label?: NavMenuContent
  icon?: NavMenuContent
  extra?: NavMenuContent
  children?: NavMenuOption[]
  disabled?: boolean
  show?: boolean
  props?: HTMLAttributes & { style?: CSSProperties }
  [key: string]: unknown
}
export interface NavMenuFieldNames {
  key?: string
  label?: string
  children?: string
  disabled?: string
}
export interface NavMenuNode {
  key: NavMenuKey
  option: NavMenuOption
  children: NavMenuNode[]
  parent?: NavMenuNode
  level: number
  disabled: boolean
  type: 'item' | 'group' | 'divider'
}
export type NavMenuProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').navMenuProps>

export type NavMenuPopupLayout = 'full-width' | 'full'
export interface NavMenuExposed {
  close(): void
  resize(): void
  setActiveItem(value: NavMenuKey | null): void
}
