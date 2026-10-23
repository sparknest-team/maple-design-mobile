import type { InjectionKey, Ref } from 'vue'
import type { MenuStrategy, MenuSubmenuTrigger, MenuValue } from './types'

export interface MenuOptionInfo {
  value?: MenuValue
  label?: any
  disabled?: boolean
}

export interface MenuContext {
  strategy: Ref<MenuStrategy>
  popupMaxHeight: Ref<boolean | number>
  modelValue?: Ref<MenuValue>
  /** Owned by the root so every level expands the same way. */
  submenuTrigger: Ref<MenuSubmenuTrigger>
  onOptionClick: (value: MenuValue, option: MenuOptionInfo, ev: Event) => void
}

export const menuInjectionKey: InjectionKey<MenuContext> = Symbol('Menu')

export interface MenuBranch {
  close(): void
  allowClose(): void
  focus?(): void
}

export interface MenuLevel {
  visible: Ref<boolean>
  register(branch: MenuBranch): () => void
  activate(branch?: MenuBranch): void
  leave?: () => void
}

export const menuLevelKey: InjectionKey<MenuLevel> = Symbol('MenuLevel')
