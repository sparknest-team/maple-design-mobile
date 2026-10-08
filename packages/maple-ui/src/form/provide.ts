import { inject, provide, type ComputedRef, type InjectionKey } from 'vue'
import { type ComponentSize } from '../utils/constants'
import { type FormFieldController } from './form-controller'
import { type FormLayout, type FormRules } from './props'

export interface FormProvider {
  disabled: ComputedRef<boolean | undefined>
  readonly: ComputedRef<boolean | undefined>
  size: ComputedRef<ComponentSize | undefined>
  rules: ComputedRef<FormRules | undefined>
  model: ComputedRef<Record<string, any> | undefined>
  layout: ComputedRef<FormLayout>
  registerField: (field: FormFieldController) => () => void
}

export const FORM_CONTEXT_KEY: InjectionKey<FormProvider> = Symbol('MpFormContext')

export function provideForm(form: FormProvider) {
  provide(FORM_CONTEXT_KEY, form)
}

export function useForm() {
  return {
    form: inject(FORM_CONTEXT_KEY, undefined),
  }
}
