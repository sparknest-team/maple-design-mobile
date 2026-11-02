import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { NavMenuItemName } from './item-names'
import type { NavMenuKey, NavMenuProps } from './types'

export interface NavMenuEntry {
  open: ComputedRef<boolean>
  popupContainer(): import('../utils/popup-container').PopupContainer | undefined
  close(restoreFocus?: boolean): void
}
export interface NavMenuContext {
  props: NavMenuProps
  activeItem: ComputedRef<NavMenuKey | null>
  panelHost: Ref<HTMLElement | undefined>
  registerItem(id: symbol, entry: NavMenuEntry, name?: NavMenuItemName): () => void
  activateItem(id?: symbol): boolean
  selectItem(name: NavMenuKey): void
}
export const navMenuKey: InjectionKey<NavMenuContext> = Symbol('NavMenu')
