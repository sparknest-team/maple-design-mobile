import type { ComputedRef, Ref, VNode } from 'vue'
import { type FormLayout } from './form'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const formItemProps: Record<keyof FormItemProps, any>

export type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'

export type FormItemAsteriskPosition = 'start' | 'end'

export type FormItemLayout = FormLayout

export interface FormItemEventHandlers {
  onChange?: () => void
  onInput?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
}

export interface FormItemProps extends BasicAttributes {
  field?: string
  label?: string
  layout?: FormItemLayout
  required?: boolean
  hideLabel?: boolean
  hideAsterisk?: boolean
  asteriskPosition?: FormItemAsteriskPosition
  help?: string
  extra?: string
  disabled?: boolean
  noStyle?: boolean
  rules?: any
  validateTrigger?: FormItemValidateTrigger | FormItemValidateTrigger[]
  onValidate?: ListenerProp<(valid: boolean) => void>
}

export class FormItem extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<FormItemProps>

  static useFormItem(options?: { disabled?: Ref<boolean> | ComputedRef<boolean> }): {
    formItem: {
      error: ComputedRef<boolean>
      errorMessage: ComputedRef<string>
      disabled: ComputedRef<boolean>
      hasOuterLabel: ComputedRef<boolean>
      eventHandlers: ComputedRef<FormItemEventHandlers>
      validateWithTrigger: (trigger: FormItemValidateTrigger) => void
    } | null
    mergedDisabled: ComputedRef<boolean>
    mergedError: ComputedRef<boolean>
    errorMessage: ComputedRef<string>
    eventHandlers: ComputedRef<FormItemEventHandlers>
    hasOuterLabel: ComputedRef<boolean>
  }

  $props: FormItemProps

  $slots: {
    default(): VNode[]
    label(): VNode[]
    help(): VNode[]
    extra(): VNode[]
  }

  validate(): Promise<boolean>

  clearValidate(): void

  resetField(): void
}

export class _FormItemComponent extends FormItem {}
