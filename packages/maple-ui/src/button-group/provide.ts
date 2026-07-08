import type { ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import type { ButtonStatus, ButtonVariant, ButtonSize } from '../button/props'

export interface ButtonGroupProvider {
  elevation: ComputedRef<string | number | boolean>
  status: ComputedRef<ButtonStatus>
  size: ComputedRef<ButtonSize>
  variant: ComputedRef<ButtonVariant>
  color: ComputedRef<string | undefined>
  textColor: ComputedRef<string | undefined>
  disabled: ComputedRef<boolean>
  stacked: ComputedRef<boolean>
  vertical: ComputedRef<boolean>
}

export const BUTTON_GROUP_BIND_BUTTON_KEY = Symbol('BUTTON_GROUP_BIND_BUTTON_KEY')

export function useButtons() {
  const { bindChildren, childProviders, length } = useChildren<ButtonGroupProvider, null>(BUTTON_GROUP_BIND_BUTTON_KEY)

  return {
    length,
    buttons: childProviders,
    bindButtons: bindChildren,
  }
}
