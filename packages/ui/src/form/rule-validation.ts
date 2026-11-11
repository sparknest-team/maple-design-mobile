import type { FormRule } from './types'

export function isFormRule(value: unknown): value is FormRule {
  return (
    typeof value === 'function' ||
    (value !== null &&
      typeof value === 'object' &&
      typeof (value as { safeParseAsync?: unknown }).safeParseAsync === 'function')
  )
}
export function isFormRuleList(value: unknown): boolean {
  return Array.isArray(value) ? value.every(isFormRule) : isFormRule(value)
}
export function isFormRules(value: unknown): boolean {
  return (
    value !== null && typeof value === 'object' && !Array.isArray(value) && Object.values(value).every(isFormRuleList)
  )
}
