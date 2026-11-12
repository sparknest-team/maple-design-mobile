import type { SelectOptionData, SelectOptionGroup } from '../select/types'
import type { MentionTokenValue } from './token-codec'

type Option = string | number | boolean | SelectOptionData | SelectOptionGroup

/** Match current options first; the business-provided fallback supplies missing labels. */
export function resolveMentionLabel(
  value: MentionTokenValue,
  options: readonly Option[],
  fallback?: (value: MentionTokenValue) => SelectOptionData | null | undefined,
  cachedLabel?: string,
): string {
  return findMentionLabel(value, options) ?? String(fallback?.(value)?.label ?? cachedLabel ?? value)
}

export function findMentionLabel(value: MentionTokenValue, options: readonly Option[]): string | undefined {
  for (const option of options) {
    if (typeof option === 'string' || typeof option === 'number' || typeof option === 'boolean') {
      if (Object.is(option, value)) {
        return String(option)
      }
    } else if ('isGroup' in option && option.isGroup) {
      const label = findMentionLabel(value, option.options ?? [])
      if (label !== undefined) {
        return label
      }
    } else if (Object.is(option.value, value)) {
      return String(option.label ?? value)
    }
  }
}
