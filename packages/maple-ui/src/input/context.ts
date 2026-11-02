import type { ComputedRef, InjectionKey } from 'vue'
import type { ComponentSize } from '../utils/constants'
import type { InputVariant } from './props'

export interface InputGroupContext {
  size: ComputedRef<ComponentSize>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  variant: ComputedRef<InputVariant>
  hint: ComputedRef<boolean | undefined>
}

export const inputGroupKey: InjectionKey<InputGroupContext> = Symbol('InputGroup')

/** Internal opt-in for the first cell of the SMS verification control. */
export const oneTimeCodeKey: InjectionKey<boolean> = Symbol('OneTimeCodeAutofill')
