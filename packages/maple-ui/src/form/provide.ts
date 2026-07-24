import { getCurrentInstance, type ComponentInternalInstance, type ComputedRef } from 'vue'
import { useChildren, useParent } from '@maplejs/maple-use'
import { type FormLayout } from './props'

export interface Validation {
  validate(): Promise<boolean>
  resetValidation(): void
  reset(): void
  field?: string
}

export interface FormProvider {
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  model: ComputedRef<Record<string, any> | undefined>
  layout: ComputedRef<FormLayout>
}

export const FORM_BIND_FORM_ITEM_KEY = Symbol('FORM_BIND_FORM_ITEM_KEY')

export function useForm<C = Validation>() {
  const { parentProvider, index, bindParent } = useParent<FormProvider, C>(FORM_BIND_FORM_ITEM_KEY)

  const instance = getCurrentInstance()!

  const bindForm = bindParent
    ? (formItemProvider: C) => {
        bindParent({ ...formItemProvider, instance })
      }
    : null

  return {
    index,
    form: parentProvider,
    bindForm,
  }
}

export function useFormItems() {
  const { childProviders, length, bindChildren } = useChildren<
    FormProvider,
    Validation & {
      instance: ComponentInternalInstance
    }
  >(FORM_BIND_FORM_ITEM_KEY)

  return {
    length,
    formItems: childProviders,
    bindFormItems: bindChildren,
  }
}
