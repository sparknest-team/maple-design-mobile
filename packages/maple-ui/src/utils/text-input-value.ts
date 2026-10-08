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
  return options.wordSlice?.(normalized, limit) ?? normalized.slice(0, Math.floor(limit / unit))
}
