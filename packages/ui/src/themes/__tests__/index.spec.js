import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'
import Themes from '..'

test('selection dark themes use current component tokens and semantic roles', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(theme['--mp-cascader-item-text-color']).toBe('var(--mp-sys-color-content-primary)')
    expect(theme).not.toHaveProperty('--mp-cascader-item-bg-active')
    expect(theme['--mp-cascader-item-bg-hover']).toBe('var(--mp-sys-color-state-selected)')
    expect(theme).not.toHaveProperty('--mp-cascader-option-text-color')
    // Select resolves these roles from token.less in every theme, like Cedar.
    expect(theme).not.toHaveProperty('--mp-select-popup-bg')
    expect(theme).not.toHaveProperty('--mp-select-popup-option-bg-selected')
    expect(theme).not.toHaveProperty('--mp-select-popup-option-text-color-selected')
    for (const suffix of ['', '-hover', '-focus']) {
      expect(theme).not.toHaveProperty(`--mp-field-variant-filled-background${suffix}`)
    }
    expect(theme).not.toHaveProperty('--mp-field-suffix-text-color')
    expect(theme['--mp-field-error-color']).toBe('rgb(var(--mp-danger-8))')
  }
})

test('floating themes inherit semantic colors without per-brand text exceptions', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    for (const key of [
      'tooltip-background',
      'tooltip-text-color',
      'tooltip-opacity',
      'popover-background',
      'overlay-background-color',
    ]) {
      expect(theme).not.toHaveProperty('--mp-' + key)
    }
    for (const status of ['primary', 'info', 'success', 'warning', 'danger']) {
      expect(theme).not.toHaveProperty('--mp-tooltip-status-' + status + '-background')
      expect(theme).not.toHaveProperty('--mp-tooltip-status-' + status + '-text-color')
    }
  }
  expect(Themes.maple.light).not.toHaveProperty('--mp-tooltip-status-primary-text-color')
})

test('default light theme', () => {
  expect(Themes.default.light).toMatchSnapshot()
})

test('dark themes inherit current surfaces and omit removed clock tokens', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    for (const key of [
      'menu-background-color',
      'menu-option-text-color',
      'menu-option-selected-background',
      'menu-option-selected-text-color',
      'floating-panel-background',
    ]) {
      expect(theme).not.toHaveProperty('--mp-' + key)
    }
    expect(Object.keys(theme).some((key) => key.startsWith('--mp-time-picker-clock-'))).toBe(false)
  }
})

test('default dark theme', () => {
  expect(Themes.default.dark).toMatchSnapshot()
})

test('maple light theme', () => {
  expect(Themes.maple.light).toMatchSnapshot()
})

test('maple dark theme', () => {
  expect(Themes.maple.dark).toMatchSnapshot()
})

test('dark card keeps semantic contrast roles', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(theme['--mp-card-floating-buttons-color']).toBe('var(--mp-sys-color-content-primary)')
    expect(theme['--mp-card-close-button-background']).toBe('#212121')
    expect(theme['--mp-card-close-button-text-color']).toBe('var(--mp-sys-color-content-on-dark)')
    expect(theme).not.toHaveProperty('--mp-card-close-button-primary-color')
  }
})

test('dark divider keeps semantic line and label roles', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(theme['--mp-divider-color']).toBe('var(--mp-sys-color-border-default)')
    expect(theme['--mp-divider-text-color']).toBe('var(--mp-sys-color-content-secondary)')
  }
})

test('dark avatar keeps semantic content and surface roles', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(theme['--mp-avatar-bg']).toBe('#303030')
    expect(theme['--mp-avatar-border-color']).toBe('var(--mp-sys-color-surface-default)')
    expect(theme['--mp-avatar-text-color']).toBe('var(--mp-sys-color-content-primary)')
  }
})

test('dark badge keeps governed status roles', () => {
  // Semantic defaults live in the component; dark themes only override real exceptions.
  const badgeTokens = readFileSync(resolve(__dirname, '../../badge/style/token.less'), 'utf8')
  const defaults = Object.fromEntries(
    [...badgeTokens.matchAll(/(--mp-badge-[\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2]]),
  )
  for (const overrides of [Themes.default.dark, Themes.maple.dark]) {
    const theme = { ...defaults, ...overrides }
    expect(theme['--mp-badge-description-text-color']).toBe('var(--mp-sys-color-content-primary)')
    expect(theme['--mp-badge-status-default-text-color']).toBe('var(--mp-sys-color-content-on-bright)')
    expect(theme['--mp-badge-text-color']).toBe('var(--mp-sys-color-content-on-dark)')
    expect(theme['--mp-badge-status-tertiary-text-color']).toBe('var(--mp-sys-color-content-on-bright)')
    for (const status of ['info', 'success', 'warning', 'danger']) {
      expect(theme[`--mp-badge-status-${status}-bg-color`]).toBe(
        status === 'danger' ? 'rgb(var(--mp-danger-4))' : `var(--mp-sys-color-status-${status})`,
      )
      expect(theme[`--mp-badge-status-${status}-text-color`]).toBe('var(--mp-sys-color-content-on-dark)')
      expect(theme[`--mp-badge-variant-outline-status-${status}-text-color`]).toBe(
        `var(--mp-sys-color-content-${status})`,
      )
    }
    expect(theme['--mp-badge-status-primary-bg-color']).toBe('var(--mp-sys-color-action-primary)')
    expect(theme['--mp-badge-status-primary-text-color']).toBe('var(--mp-sys-color-content-on-dark)')
    expect(theme['--mp-badge-variant-outline-status-primary-text-color']).toBe('var(--mp-sys-color-content-brand)')
    expect(theme['--mp-badge-variant-outline-status-default-text-color']).toBe('var(--mp-sys-color-content-primary)')
  }
})

test('default and maple themes use different brand colors', () => {
  expect(Themes.default.light['--mp-primary-6']).toBe('0, 190, 190')
  expect(Themes.default.dark['--mp-primary-6']).toBe('41, 203, 197')
  expect(Themes.maple.light['--mp-primary-6']).toBe('194, 65, 12')
  expect(Themes.maple.dark['--mp-primary-6']).toBe('251, 146, 60')
  expect(Themes.default.light['--mp-primary-6']).not.toBe(Themes.maple.light['--mp-primary-6'])
  expect(Themes.default.dark['--mp-primary-6']).not.toBe(Themes.maple.dark['--mp-primary-6'])
})

test('toViewport', () => {
  expect(
    Themes.toViewport({
      '--mp-a': '30px',
      '--mp-b': '30px -30px',
      '--mp-c': '30px 30px 30px',
      '--mp-d': '30px 30px 30px 30px',
      '--mp-e': '10px',
      '--mp-f': '10.55px',
      '--mp-g': 'calc(100% - 30px)',
    }),
  ).toStrictEqual({
    '--mp-a': '8vmin',
    '--mp-b': '8vmin -8vmin',
    '--mp-c': '8vmin 8vmin 8vmin',
    '--mp-d': '8vmin 8vmin 8vmin 8vmin',
    '--mp-e': '2.666667vmin',
    '--mp-f': '2.813333vmin',
    '--mp-g': 'calc(100% - 8vmin)',
  })

  expect(
    Themes.toViewport(
      {
        '--mp-a': '30px',
        '--mp-b': '30px -30px',
        '--mp-c': '30px 30px 30px',
        '--mp-d': '30px 30px 30px 30px',
        '--mp-e': '10px',
        '--mp-f': '10.55px',
        '--mp-g': 'calc(100% - 30px)',
      },
      {
        viewportWidth: 750,
        viewportUnit: 'vw',
        unitPrecision: 4,
      },
    ),
  ).toStrictEqual({
    '--mp-a': '4vw',
    '--mp-b': '4vw -4vw',
    '--mp-c': '4vw 4vw 4vw',
    '--mp-d': '4vw 4vw 4vw 4vw',
    '--mp-e': '1.3333vw',
    '--mp-f': '1.4067vw',
    '--mp-g': 'calc(100% - 4vw)',
  })
})

test('toRem', () => {
  expect(
    Themes.toRem({
      '--mp-a': '30px',
      '--mp-b': '30px -30px',
      '--mp-c': '30px 30px 30px',
      '--mp-d': '30px 30px 30px 30px',
      '--mp-e': '10px',
      '--mp-f': '10.55px',
      '--mp-g': 'calc(100% - 30px)',
    }),
  ).toStrictEqual({
    '--mp-a': '1.875rem',
    '--mp-b': '1.875rem -1.875rem',
    '--mp-c': '1.875rem 1.875rem 1.875rem',
    '--mp-d': '1.875rem 1.875rem 1.875rem 1.875rem',
    '--mp-e': '0.625rem',
    '--mp-f': '0.659375rem',
    '--mp-g': 'calc(100% - 1.875rem)',
  })

  expect(
    Themes.toRem(
      {
        '--mp-a': '30px',
        '--mp-b': '30px -30px',
        '--mp-c': '30px 30px 30px',
        '--mp-d': '30px 30px 30px 30px',
        '--mp-e': '10px',
        '--mp-f': '10.55px',
        '--mp-g': 'calc(100% - 30px)',
      },
      {
        rootFontSize: 30,
        unitPrecision: 4,
      },
    ),
  ).toStrictEqual({
    '--mp-a': '1rem',
    '--mp-b': '1rem -1rem',
    '--mp-c': '1rem 1rem 1rem',
    '--mp-d': '1rem 1rem 1rem 1rem',
    '--mp-e': '0.3333rem',
    '--mp-f': '0.3517rem',
    '--mp-g': 'calc(100% - 1rem)',
  })
})

test('modal dark themes keep system surface and content defaults', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    for (const key of [
      'dialog-background',
      'dialog-title-text-color',
      'dialog-content-text-color',
      'popup-content-background-color',
      'popup-overlay-background-color',
    ]) {
      expect(theme).not.toHaveProperty('--mp-' + key)
    }
  }
})

test('feedback dark themes inherit governed colors', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    for (const key of ['message-color', 'message-background', 'loading-bar-color', 'loading-bar-error-color']) {
      expect(theme).not.toHaveProperty('--mp-' + key)
    }
    for (const status of ['info', 'success', 'warning', 'danger']) {
      expect(theme).not.toHaveProperty('--mp-message-' + status + '-background')
      expect(theme).not.toHaveProperty('--mp-message-' + status + '-color')
    }
  }
})

test('choice dark themes inherit governed colors without overriding geometry', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    for (const component of ['checkbox', 'radio']) {
      for (const suffix of [
        'control-color',
        'control-color-checked',
        'control-color-disabled',
        'control-color-error',
        'label-text-color',
        'label-text-color-disabled',
      ]) {
        expect(theme).not.toHaveProperty('--mp-' + component + '-' + suffix)
      }
      expect(theme['--mp-' + component + '-control-size']).toBe('24px')
    }
  }
})

test('form details dark themes inherit semantic text colors', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(theme).not.toHaveProperty('--mp-form-details-error-message-color')
    expect(theme).not.toHaveProperty('--mp-form-details-extra-message-color')
  }
})

test('switch dark themes inherit paired semantic defaults', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    for (const suffix of [
      'track-background',
      'track-active-background',
      'track-error-background',
      'handle-background',
      'handle-color',
      'text-color',
      'tonal-track-background',
      'tonal-border-color',
      'tonal-text-color',
      'tonal-handle-color',
    ]) {
      expect(theme).not.toHaveProperty('--mp-switch-' + suffix)
    }
  }
})

test('foundation dark themes inherit the governed defaults', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(theme).not.toHaveProperty('--mp-icon-size')
    for (const key of Object.keys(theme)) {
      expect(key).not.toMatch(/^--mp-(hover-overlay|paper|ripple|skeleton|space)-/)
    }
  }
})

test('current themes and tab colors use the shared contract', () => {
  expect(Themes).toHaveProperty('default.light')
  expect(Themes).toHaveProperty('maple.dark')
  expect(Themes).not.toHaveProperty('tonal')
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    for (const suffix of [
      'background',
      'title-text-color',
      'title-text-color-active',
      'muted-background',
      'border-color',
    ]) {
      expect(theme).not.toHaveProperty('--mp-tabs-' + suffix)
    }
  }
})

test('dark breadcrumb themes keep the documented semantic text and brand roles', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(theme['--mp-breadcrumb-item-active-color']).toBe('var(--mp-sys-color-action-primary)')
    expect(theme['--mp-breadcrumb-item-inactive-color']).toBe('var(--mp-color-text-2)')
  }
})

test('Firefly keeps popover geometry across light and dark themes without rounding the arrow into a dot', () => {
  for (const theme of [Themes.firefly.light, Themes.firefly.dark]) {
    expect(theme['--mp-popover-border-radius']).toBe('var(--mp-sys-radius-md)')
    expect(theme['--mp-trigger-arrow-radius']).toBe('min(2px, var(--mp-sys-radius-sm))')
  }
  expect(Themes.default.dark['--mp-popover-border-radius']).toBe('2px')
  expect(Themes.maple.dark['--mp-popover-border-radius']).toBe('2px')
})

test('brand forms separate action backgrounds from readable content colors', () => {
  for (const brand of [Themes.alps, Themes.firefly]) {
    for (const theme of [brand.light, brand.dark]) {
      expect(theme['--mp-selection-editor-accent']).toBe('var(--mp-sys-color-content-primary)')
      expect(theme['--mp-selection-editor-selected-background']).toBe('var(--mp-sys-color-state-selected)')
      expect(theme['--mp-selected-options-clear-color']).toBe('var(--mp-sys-color-content-primary)')
      expect(theme).not.toHaveProperty('--mp-select-popup-option-check-color')
    }
  }
})

test('brand field variants keep distinct surfaces and readable focus/error roles', () => {
  for (const brand of [Themes.alps, Themes.firefly]) {
    for (const theme of [brand.light, brand.dark]) {
      expect(theme['--mp-field-variant-filled-background']).not.toBe('transparent')
      expect(theme['--mp-field-variant-filled-background-hover']).not.toBe(
        theme['--mp-field-variant-filled-background-focus'],
      )
      expect(theme['--mp-field-variant-filled-background-focus']).not.toBe(
        theme['--mp-field-variant-filled-background'],
      )
      expect(theme['--mp-field-variant-standard-line-color']).not.toBe('transparent')
      expect(theme['--mp-field-variant-filled-background-error']).toBe('var(--mp-color-danger-light-1)')
      expect(theme['--mp-field-placeholder-text-color']).toBeDefined()
    }
  }
  const tokens = readFileSync(resolve(__dirname, '../../_components/selected-options/style/token.less'), 'utf8')
  expect(tokens).toContain('--mp-selection-editor-accent: var(--mp-sys-color-content-primary)')
  expect(tokens).toContain('--mp-selected-options-clear-color: var(--mp-sys-color-content-primary)')
})

test('Firefly light foreground roles stay readable on their actual soft surfaces', () => {
  const theme = Themes.firefly.light
  const rgb = (value) => {
    const values = value.match(/[\d.]+/g).map(Number)
    const alpha = values[3] ?? 1
    return values.slice(0, 3).map((channel) => channel * alpha + 255 * (1 - alpha))
  }
  const luminance = (value) =>
    rgb(value)
      .map((channel) => {
        const normalized = channel / 255
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
      })
      .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0)
  const contrast = (foreground, background) => {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
    return (values[0] + 0.05) / (values[1] + 0.05)
  }
  for (const role of ['brand', 'info', 'success', 'warning', 'danger']) {
    const foreground = theme[`--mp-sys-color-content-${role}`]
    const backgrounds = ['rgb(255, 255, 255)', theme['--mp-color-fill-1']]
    if (role !== 'brand') {
      backgrounds.push(theme[`--mp-color-${role}-light-1`])
    }
    for (const background of backgrounds) {
      expect(contrast(foreground, background), `${role} on ${background}`).toBeGreaterThanOrEqual(4.5)
    }
  }
  expect(theme['--mp-sys-color-action-primary']).toBe('rgb(234, 255, 104)')
})

test('brand selection and focus follow the primary Button action in light and dark modes', () => {
  for (const brand of ['alps', 'firefly']) {
    for (const mode of ['light', 'dark']) {
      const theme = Themes[brand][mode]
      for (const suffix of [
        'radio-control-color-checked',
        'checkbox-control-color-checked',
        'switch-track-active-background',
        'field-focus-color',
        'field-variant-outline-border-color-focus',
        'date-calendar-selected-background',
        'date-calendar-today-color',
        'upload-active-color',
      ]) {
        expect(theme[`--mp-${suffix}`], `${brand}/${mode}/${suffix}`).toBe('var(--mp-sys-color-action-primary)')
      }
      expect(theme['--mp-date-calendar-selected-color']).toBe('var(--mp-button-solid-text-color)')
    }
  }
  expect(Themes.firefly.light['--mp-slider-active-color']).toBe('var(--mp-sys-color-action-primary)')
  expect(Themes.firefly.dark['--mp-slider-active-color']).toBe('var(--mp-sys-color-action-primary)')
})

// Compare resolved roles, including inherited dark overrides and Cedar token conversion.
test('Firefly links match the corresponding Button text foreground in both modes and prefixes', () => {
  for (const mode of ['light', 'dark']) {
    for (const prefix of ['mp', 'c']) {
      const theme = Object.fromEntries(
        Object.entries(Themes.firefly[mode]).map(([key, value]) => [
          key.replaceAll('--mp-', `--${prefix}-`),
          value.replaceAll('--mp-', `--${prefix}-`),
        ]),
      )
      const resolve = (key, depth = 0) => {
        if (depth > 10) {
          throw new Error('Cyclic theme role')
        }
        const value = theme[key]
        const match = value?.match(/^var\((--[^)]+)\)$/)
        return match ? resolve(match[1], depth + 1) : value
      }
      for (const status of ['primary', 'secondary', 'tertiary']) {
        const link = resolve(`--${prefix}-link-text-color-${status}`)
        expect(link).toBeTruthy()
        expect(link).toBe(resolve(`--${prefix}-button-${status}-foreground-color`))
      }
      expect(resolve(`--${prefix}-link-text-color-primary`)).not.toBe(resolve(`--${prefix}-link-text-color-tertiary`))
    }
  }
})
