import { computed, type ComputedRef } from 'vue'
import { type PickerColumnOption } from '../picker/props'

export interface FieldNames {
  label?: string
  value?: string
  children?: string
  disabled?: string
}

export interface FieldNameMap {
  label: string
  value: string
  children: string
  disabled: string
}

export interface FieldNameProps {
  fieldNames?: FieldNames
}

export function useFieldNames(props: FieldNameProps, defaults?: Partial<FieldNameMap>): ComputedRef<FieldNameMap> {
  return computed(() => ({
    label: props.fieldNames?.label ?? defaults?.label ?? 'label',
    value: props.fieldNames?.value ?? defaults?.value ?? 'value',
    children: props.fieldNames?.children ?? defaults?.children ?? 'children',
    disabled: props.fieldNames?.disabled ?? defaults?.disabled ?? 'disabled',
  }))
}

export interface NormalizableOption {
  [key: PropertyKey]: any
}

export function normalizeSelectOptionsToPickerColumns(
  options: NormalizableOption[],
  fieldNames: FieldNameMap,
): PickerColumnOption[] {
  return options.map((option) => ({
    text: option[fieldNames.label],
    value: option[fieldNames.value],
    disabled: option[fieldNames.disabled],
    _raw: option,
  }))
}

export function normalizeCascaderOptionsToPickerColumns(
  options: NormalizableOption[],
  fieldNames: FieldNameMap,
): PickerColumnOption[] {
  return options.map((option) => {
    const normalized: PickerColumnOption = {
      text: option[fieldNames.label],
      value: option[fieldNames.value],
      disabled: option[fieldNames.disabled],
      _raw: option,
    }

    const children = option[fieldNames.children]
    if (Array.isArray(children) && children.length) {
      normalized.children = normalizeCascaderOptionsToPickerColumns(children, fieldNames)
    }

    return normalized
  })
}
