import type { PropType, VNodeChild } from 'vue'
import { dropdownMenuProps } from './props'
import type { DropdownMenuFieldNames } from './selection'
import type { DropdownMenuOption } from './types'

export interface DropdownMenuOptionRenderers {
  label: (option: DropdownMenuOption, active: boolean, level: number) => VNodeChild
  icon: (option: DropdownMenuOption, active: boolean, level: number) => VNodeChild
  extra: (option: DropdownMenuOption, active: boolean, level: number) => VNodeChild
  hasIcon: (option: DropdownMenuOption) => boolean
  hasExtra: (option: DropdownMenuOption) => boolean
}

export const dropdownMenuBranchProps = {
  option: { type: Object as PropType<DropdownMenuOption>, required: true as const },
  options: dropdownMenuProps.options,
  fieldNames: Object as PropType<DropdownMenuFieldNames>,
  level: { type: Number, default: 0 },
  disabled: Boolean,
  renderers: { type: Object as PropType<DropdownMenuOptionRenderers>, required: true as const },
}
