import type { ComputedRef, Ref, VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const formProps: Record<keyof FormProps, any>

export interface FormValidation {
  validate(): Promise<boolean>
  resetValidation(): void
  reset(): void
  field?: string
}

export type FormScrollToError = 'start' | 'end'

export type FormLayout = 'horizontal' | 'vertical'

export interface FormProvider {
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  model: ComputedRef<Record<string, any> | undefined>
  layout: ComputedRef<FormLayout>
}

export interface FormProps extends BasicAttributes {
  model?: Record<string, any>
  layout?: FormLayout
  disabled?: boolean
  readonly?: boolean
  scrollToError?: FormScrollToError
  scrollToErrorOffsetY?: number | string
  onSubmit?: ListenerProp<(valid: boolean) => void>
  onReset?: ListenerProp<() => void>
}

export class Form extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<FormProps>

  static useForm(): {
    form: FormProvider | null

    bindForm: ((formValidation: FormValidation) => void) | null
  }

  static useValidation(): {
    errorMessage: Ref<string>

    validate(rules: any, value: any, apis?: any): Promise<boolean>

    resetValidation(): void

    validateWithTrigger<T>(validateTrigger: T[], trigger: T, rules: any, value: any, apis?: any): Promise<void>
  }

  static useFormItem: (typeof import('./formItem'))['FormItem']['useFormItem']

  $props: FormProps

  $slots: {
    default(): VNode[]
  }

  validate(field?: string | string[]): Promise<boolean>

  validateField(field: string | string[]): Promise<boolean>

  resetFields(field?: string | string[]): void

  clearValidate(field?: string | string[]): void

  scrollToField(field: string): void
}

export class _FormComponent extends Form {}
