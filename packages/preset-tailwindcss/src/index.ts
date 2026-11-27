export interface PresetMapleOptions {
  tailwindVersion?: 3 | 4
  screens?: boolean | PresetMapleScreens
  fontSize?: boolean | PresetMapleFontSize
  colors?: boolean | PresetMapleColors
}

export interface PresetMapleScreens {
  sm?: string | number
  md?: string | number
  lg?: string | number
  xl?: string | number
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

function getScreens(options: PresetMapleOptions = {}) {
  const { screens = true } = options

  if (!screens) {
    return
  }

  const defaultScreens: PresetMapleScreens = {
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1920px',
  }

  if (screens === true) {
    return defaultScreens
  }

  return {
    ...defaultScreens,
    ...screens,
  }
}

function getFontSize(options: PresetMapleOptions = {}) {
  const { fontSize = true } = options

  if (!fontSize) {
    return
  }

  const defaultFontSize: PresetMapleFontSize = {
    xs: 'var(--mp-font-size-xs)',
    sm: 'var(--mp-font-size-sm)',
    md: 'var(--mp-font-size-md)',
    lg: 'var(--mp-font-size-lg)',
  }

  if (fontSize === true) {
    return defaultFontSize
  }

  return {
    ...defaultFontSize,
    ...fontSize,
  }
}

function getColors(options: PresetMapleOptions = {}) {
  const { colors = true } = options

  if (!colors) {
    return
  }

  const defaultColors: Omit<PresetMapleColors, 'body' | 'disabled'> = {
    primary: 'var(--mp-color-primary)',
    info: 'var(--mp-color-info)',
    warning: 'var(--mp-color-warning)',
    danger: 'var(--mp-color-danger)',
    success: 'var(--mp-color-success)',
  }

  if (colors === true) {
    return defaultColors
  }

  const { body: _body, disabled: _disabled, ...customColors } = colors
  return { ...defaultColors, ...customColors }
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

export function presetMaple(options: PresetMapleOptions = {}) {
  const body = getBody(options)
  const disabled = getDisabled(options)

  return {
    prefix: options.tailwindVersion === 4 ? 'mp' : 'mp-',
    corePlugins: {
      boxShadow: false,
      boxShadowColor: false,
    },
    theme: {
      extend: {
        colors: getColors(options),
        backgroundColor: body || disabled ? { body, disabled } : undefined,
        textColor: disabled ? { disabled } : undefined,
        screens: getScreens(options),
        fontSize: getFontSize(options),
        spacing: getSpacing(),
      },
    },
  }
}
