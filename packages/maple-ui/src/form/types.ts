import type { VNodeChild } from 'vue'
import type { ZodType } from 'zod'
import type { FormValidateErrors as ControllerErrors, FormFieldError } from './form-controller'

export interface FormRuleContext {
  model: Readonly<Record<string, unknown>> | undefined
  field: string
}
/** 函数仅 true 通过，其他正常返回值转成错误文字；Promise 拒绝保持可观察。 */
export type FormRule<Value = any> = ((value: Value, context: FormRuleContext) => unknown) | ZodType<any, any, Value>
export type FormRules = Record<string, FormRule | FormRule[]>
export interface ValidatedError extends FormFieldError {
  label: string
  value: unknown
  type: string
  isRequiredError: boolean
}
export type FormValidateErrors<Error extends FormFieldError = ValidatedError> = ControllerErrors<Error>
export interface FieldData {
  value?: unknown
  status?: 'success' | 'warning' | 'error' | 'validating' | ''
  message?: string
}

/** 阻止提交时的编辑会话提示，不伪装成字段规则错误。 */
export interface FormEditingError {
  field: 'editing'
  message: string
}
export type FormSubmitError = ValidatedError | FormEditingError
export interface FormEmits {
  submit: [data: { values: Record<string, unknown>; errors: Record<string, ValidatedError> | undefined }, event: Event]
  'submit-success': [values: Record<string, unknown>, event: Event]
  'submit-failed': [data: { values: Record<string, unknown>; errors: Record<string, FormSubmitError> }, event: Event]
  reset: [event: Event]
}
export interface FormSlots {
  default?: () => VNodeChild
}
export interface FormItemSlots {
  default?: () => VNodeChild
  label?: () => VNodeChild
  help?: () => VNodeChild
  extra?: () => VNodeChild
}
