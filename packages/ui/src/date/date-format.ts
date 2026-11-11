/** Shared date-format rules, copied independently into each library. */
export type DateFormatMode = 'date' | 'month' | 'year' | 'week' | 'quarter'

export function getDefaultFormat(mode: DateFormatMode = 'date', showTime = false, useSeconds = true) {
  switch (mode) {
    case 'date':
      return showTime ? (useSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm') : 'YYYY-MM-DD'
    case 'month':
      return 'YYYY-MM'
    case 'year':
      return 'YYYY'
    case 'week':
      return 'gggg-wo'
    case 'quarter':
      return 'YYYY-[Q]Q'
    default:
      return 'YYYY-MM-DD'
  }
}

/** Week and quarter labels are not their serialized model formats. */
export function getDefaultValueFormat(mode: DateFormatMode = 'date', showTime = false, useSeconds = true) {
  if (mode === 'week') {
    return 'YYYY-MM-DD'
  }
  if (mode === 'quarter') {
    return 'YYYY-MM'
  }
  return getDefaultFormat(mode, showTime, useSeconds)
}
