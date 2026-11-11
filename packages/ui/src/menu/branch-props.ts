import type { PropType, VNodeChild } from 'vue'
import type { MenuFieldNames } from './selection'
import type { MenuOptionData } from './types'

export interface MenuOptionRenderers {
  label: (option: MenuOptionData, active: boolean, level: number) => VNodeChild
  icon: (option: MenuOptionData, active: boolean, level: number) => VNodeChild
  extra: (option: MenuOptionData, active: boolean, level: number) => VNodeChild
  hasIcon: (option: MenuOptionData) => boolean
  hasExtra: (option: MenuOptionData) => boolean
}

export const menuBranchProps = {
  option: { type: Object as PropType<MenuOptionData>, required: true as const },
  fieldNames: Object as PropType<MenuFieldNames>,
  level: { type: Number, default: 0 },
  disabled: Boolean,
  renderers: { type: Object as PropType<MenuOptionRenderers>, required: true as const },
}
