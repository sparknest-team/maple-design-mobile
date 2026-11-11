import type {
  FormEmits,
  FormInstance,
  FormItemProps,
  FormItemSlots,
  FormProps,
  FormRule,
  FormRules,
  FormSlots,
  FormSubmitError,
  FormValidateErrors,
  ValidatedError,
} from '@maple-design/ui-vue'
import { Form, FormItem } from '@maple-design/ui-vue'
import type { FormEmits as SubEmits } from '@maple-design/ui-vue/form'
import { z } from 'zod'

export const submit: SubEmits['submit'] = [{ values: {}, errors: undefined }, new Event('submit')]
export const main: FormEmits['submit'] = submit
export const slots: FormSlots = { default: () => 'fields' }
export const itemSlots: FormItemSlots = {
  default: () => 'input',
  label: () => 'Label',
  help: () => 'Help',
  extra: () => 'Extra',
}
// @ts-expect-error Form default slot has no model scope.
export const invalidSlots: FormSlots = { default: (scope: { model: object }) => String(scope.model) }
export function rich(error: ValidatedError) {
  const label: string = error.label
  const value: unknown = error.value
  const type: string = error.type
  const required: boolean = error.isRequiredError
  return { label, value, type, required }
}
export function blocked(error: FormSubmitError) {
  if ('type' in error) {
    rich(error)
  }
}
export async function result(instance: FormInstance) {
  const errors = await instance.validate()
  if (errors) {
    rich(errors.name)
  }
}
export const rules: FormRules = { name: [(value, context) => context.field === 'name' && value !== '', z.string()] }
export const typed: FormRule<string> = async (value, context) => value.length > 0 || context.field
export const accepted: FormProps['rules'] = rules
export const itemRules: FormItemProps['rules'] = z.string()
// @ts-expect-error Cedar rule objects are not Maple function/Zod rules.
export const wrong: FormRules = { name: { required: true } }
// @ts-expect-error Arbitrary values are not rules.
export const wrongItem: FormItemProps['rules'] = 123

export function aggregate(errors: FormValidateErrors) {
  if (errors) {
    rich(errors.name)
  }
}
export function editing(error: FormSubmitError) {
  // @ts-expect-error A blocked editing notice does not promise a rich validation label.
  return error.label
}
const validation = Form.useValidation()
validation.validate([() => true, z.string()], 'value')
// @ts-expect-error Public rule runner rejects arbitrary numeric rules.
validation.validate([123], 'value')
Form.useForm()
Form.useFormItem()
FormItem.useFormItem()
