import { toRaw } from 'vue'

export interface OptionFields {
  label?: string
  value?: string
  children?: string
  disabled?: string
}
export function resolveOptionFields(fields?: OptionFields, defaults?: OptionFields) {
  return {
    label: fields?.label ?? defaults?.label ?? 'label',
    value: fields?.value ?? defaults?.value ?? 'value',
    children: fields?.children ?? defaults?.children ?? 'children',
    disabled: fields?.disabled ?? defaults?.disabled ?? 'disabled',
  }
}
export function sameOptionValue(left: unknown, right: unknown) {
  return Object.is(toRaw(left), toRaw(right))
}
export function matchesOptionText(label: unknown, query: string, caseSensitive = false) {
  const text = String(label ?? '')
  return caseSensitive ? text.includes(query) : text.toLowerCase().includes(query.toLowerCase())
}

/** Semantic fields; fieldNames maps them to business data keys. */
export type OptionSearchField = 'label' | 'value'
