import type { ComputedRef } from 'vue'
import { useChildren } from '@maple-design/use'
import type { ComponentSize, SemanticStatus } from '../utils/constants'
import type { ButtonVariant } from './props'

export interface ButtonGroupProvider {
  elevation: ComputedRef<string | number | boolean>
  status: ComputedRef<SemanticStatus>
  size: ComputedRef<ComponentSize>
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
