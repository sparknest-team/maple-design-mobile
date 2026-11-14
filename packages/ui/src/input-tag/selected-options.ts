import type { InjectionKey } from 'vue'
import type { InputTagFieldNames, InputTagOption, TagData } from './types'

/** Per-field cache for labels returned by a remote candidate source. */
export const inputTagOptionsKey: InjectionKey<Map<string | number, TagData>> = Symbol('input-tag-options')

/** Resolve primitive model values from current candidates, including nested groups. */
export function findInputTagOption(
  options: readonly InputTagOption[],
  value: string | number,
  fieldNames?: InputTagFieldNames,
): TagData | undefined {
  const valueField = fieldNames?.value ?? 'value'
  const labelField = fieldNames?.label ?? 'label'
  for (const option of options) {
    if (typeof option === 'string' || typeof option === 'number') {
      if (Object.is(option, value)) {
        return { [valueField]: option, [labelField]: String(option) }
      }
    } else if (option && option.isGroup === true && Array.isArray(option.options)) {
      const found = findInputTagOption(option.options, value, fieldNames)
      if (found) {
        return found
      }
    } else if (option && Object.is((option as TagData)[valueField], value)) {
      return option as TagData
    }
  }
  return undefined
}
