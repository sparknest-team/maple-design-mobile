/** Time format rules. Keep independent copies in Cedar and Maple. */
export interface TimeFormatOptions {
  format?: string
  defaultFormat?: string
  use12Hours?: boolean
}

/** Bracketed text is a literal, never a time column. */
export function getTimeFormatColumns(format: string) {
  const tokens = format.replace(/\[[^\]]*\]/g, '')
  const list = ['H', 'h', 'm', 's', 'a', 'A'].filter((unit) => tokens.includes(unit))
  return { list, use12Hours: list.some((unit) => unit === 'h' || unit === 'a' || unit === 'A') }
}

export function resolveTimeFormat(options: TimeFormatOptions = {}) {
  const requested = options.format || options.defaultFormat
  const format =
    requested && getTimeFormatColumns(requested).list.some((unit) => /[Hhms]/.test(unit))
      ? requested
      : options.use12Hours
        ? 'hh:mm:ss a'
        : 'HH:mm:ss'
  const { list, use12Hours } = getTimeFormatColumns(format)
  return {
    format,
    columns: list,
    use12Hours: Boolean(options.use12Hours || use12Hours),
    useSeconds: list.includes('s'),
  }
}

/** Render clock seconds without parsing dates or reading the current timezone. */
export function formatClockLabel(seconds: number, format: string): string {
  if (!Number.isInteger(seconds) || seconds < 0 || seconds >= 86400) {
    return ''
  }
  const hour = Math.floor(seconds / 3600)
  const minute = Math.floor(seconds / 60) % 60
  const second = seconds % 60
  const pad = (value: number) => String(value).padStart(2, '0')
  const tokens: Record<string, string> = {
    H: String(hour),
    HH: pad(hour),
    h: String(hour % 12 || 12),
    hh: pad(hour % 12 || 12),
    m: String(minute),
    mm: pad(minute),
    s: String(second),
    ss: pad(second),
    a: hour < 12 ? 'am' : 'pm',
    A: hour < 12 ? 'AM' : 'PM',
  }
  return format.replace(/\[[^\]]*\]|HH|hh|mm|ss|H|h|m|s|a|A/g, (token) =>
    token.startsWith('[') ? token.slice(1, -1) : tokens[token],
  )
}
