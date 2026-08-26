import { presetUno, type Preset, type Rule } from 'unocss'

export interface PresetMapleOptions {
  breakpoints?: boolean | { sm?: string | number; md?: string | number; lg?: string | number; xl?: string | number }
  fontSize?: boolean | PresetMapleFontSize
  colors?: boolean | PresetMapleColors
}

export interface PresetMapleFontSize {
  xs?: string
  sm?: string
  md?: string
  lg?: string
}

export interface PresetMapleColors {
  body?: string
  primary?: string
  info?: string
  warning?: string
  danger?: string
  success?: string
  disabled?: string
}

function getSpacing() {
  return Object.fromEntries(Array.from({ length: 201 }, (_, value) => [String(value), `${value}px`]))
}

function getBreakpoints(options: PresetMapleOptions = {}) {
  const { breakpoints = true } = options

  if (!breakpoints) {
    return
  }

  const defaults = { sm: '768px', md: '992px', lg: '1200px', xl: '1920px' }
  return breakpoints === true ? defaults : { ...defaults, ...breakpoints }
}

function getFontSize(options: PresetMapleOptions = {}) {
  const { fontSize = true } = options

  if (!fontSize) {
    return
  }

  const defaults: PresetMapleFontSize = {
    xs: 'var(--mp-font-size-xs)',
    sm: 'var(--mp-font-size-sm)',
    md: 'var(--mp-font-size-md)',
    lg: 'var(--mp-font-size-lg)',
  }

  return fontSize === true ? defaults : { ...defaults, ...fontSize }
}

function getColors(options: PresetMapleOptions = {}) {
  const { colors = true } = options

  if (!colors) {
    return
  }

  const defaults: Omit<PresetMapleColors, 'body' | 'disabled'> = {
    primary: 'var(--mp-color-primary)',
    info: 'var(--mp-color-info)',
    warning: 'var(--mp-color-warning)',
    danger: 'var(--mp-color-danger)',
    success: 'var(--mp-color-success)',
  }

  if (colors === true) {
    return defaults
  }

  const { body: _body, disabled: _disabled, ...customColors } = colors
  return { ...defaults, ...customColors }
}

function getDisabled(options: PresetMapleOptions = {}) {
  const { colors = true } = options
  if (!colors) {
    return
  }
  return colors === true ? 'var(--mp-color-disabled)' : (colors.disabled ?? 'var(--mp-color-disabled)')
}

function getBody(options: PresetMapleOptions = {}) {
  const { colors = true } = options
  if (!colors) {
    return
  }
  return colors === true ? 'var(--mp-color-body)' : (colors.body ?? 'var(--mp-color-body)')
}

export function presetMaple(options: PresetMapleOptions = {}): Preset[] {
  const body = getBody(options)
  const disabled = getDisabled(options)
  const rules: Rule[] = []

  if (body) {
    rules.push(['mp-bg-body', { 'background-color': body }])
  }
  if (disabled) {
    rules.push(['mp-bg-disabled', { 'background-color': disabled }])
    rules.push(['mp-text-disabled', { color: disabled }])
  }

  return [
    presetUno({ prefix: 'mp-' }),
    {
      name: '@maplejs/maple-preset-unocss',
      blocklist: [/^(?:[\w-]+:)*mp-shadow(?:-.+)?$/],
      theme: {
        colors: getColors(options),
        fontSize: getFontSize(options),
        breakpoints: getBreakpoints(options),
        spacing: getSpacing(),
      },
      rules,
    },
  ]
}
