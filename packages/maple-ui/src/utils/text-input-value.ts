export interface TextInputValueOptions {
  numeric?: boolean
  maxLength?: number
  errorOnly?: boolean
  wordLength?: (value: string) => number
  wordSlice?: (value: string, maxLength: number) => string
}

export function formatNumericText(value: string): string {
  const minusIndex = value.indexOf('-')

  if (minusIndex > -1) {
    value = minusIndex === 0 ? '-' + value.replace(/-/g, '') : value.replace(/-/g, '')
  }
  const dotIndex = value.indexOf('.')
  if (dotIndex > -1) {
    value = value.slice(0, dotIndex + 1) + value.slice(dotIndex).replace(/\./g, '')
  }
  return value.replace(/[^-0-9.]/g, '')
}

export function normalizeTextInputValue(value: string, options: TextInputValueOptions): string {
  const normalized = options.numeric ? formatNumericText(value) : value
  const limit = options.maxLength
  if (!limit || options.errorOnly) {
    return normalized
  }

  const length = options.wordLength ?? ((text: string) => text.length)
  if (length(normalized) <= limit) {
    return normalized
  }
  const unit = Math.max(1, length('a'))
  const custom = options.wordSlice?.(normalized, limit)
  if (custom != null) {
    return custom
  }
  const sliced = normalized.slice(0, Math.floor(limit / unit))
  const last = sliced.charCodeAt(sliced.length - 1)
  const next = normalized.charCodeAt(sliced.length)
  // Keep the UTF-16 length budget without splitting a valid surrogate pair.
  return last >= 0xd800 && last <= 0xdbff && next >= 0xdc00 && next <= 0xdfff ? sliced.slice(0, -1) : sliced
}
