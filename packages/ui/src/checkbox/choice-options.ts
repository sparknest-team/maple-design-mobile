import type { VNodeChild } from 'vue'
import type { ChoiceValue } from './choice-value-props'

export interface ChoiceFieldNames {
  label?: string
  value?: string
  disabled?: string
  readonly?: string
  indeterminate?: string
}

export interface ChoiceOption {
  value: ChoiceValue
  label?: VNodeChild | ((option: ChoiceOption, checked: boolean) => VNodeChild)
  disabled?: boolean
  readonly?: boolean
  [key: string]: unknown
}

export interface CheckboxOption extends ChoiceOption {
  indeterminate?: boolean
}

export type ChoiceOptionInput = ChoiceValue | ChoiceOption | Record<string, unknown>

function isValue(value: unknown): value is ChoiceValue {
  return (
    typeof value === 'string' || typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value))
  )
}

/** Normalize copies only; async option changes never rewrite the model. */
export function normalizeChoiceOptions(
  options: readonly ChoiceOptionInput[] | undefined,
  fields: ChoiceFieldNames = {},
): CheckboxOption[] {
  const seen = new Set<ChoiceValue>()
  const result: CheckboxOption[] = []
  for (const input of options ?? []) {
    const record = typeof input === 'object' && input !== null ? input : undefined
    const value = record ? record[fields.value ?? 'value'] : input
    if (!isValue(value) || seen.has(value)) {
      continue
    }
    seen.add(value)
    if (!record) {
      result.push({ value, label: String(value) })
      continue
    }
    const label = record[fields.label ?? 'label'] as ChoiceOption['label']
    result.push({
      ...record,
      value,
      label: label ?? String(value),
      disabled: record[fields.disabled ?? 'disabled'] as boolean | undefined,
      readonly: record[fields.readonly ?? 'readonly'] as boolean | undefined,
      indeterminate: record[fields.indeterminate ?? 'indeterminate'] as boolean | undefined,
    })
  }
  return result
}
