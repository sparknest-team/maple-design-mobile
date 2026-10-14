import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'
import Themes from '..'

test('selection dark themes use current component tokens and semantic roles', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(theme['--mp-cascader-item-text-color']).toBe('var(--mp-sys-color-content-primary)')
    expect(theme['--mp-cascader-item-bg-active']).toBe('var(--mp-sys-color-state-selected)')
    expect(theme).not.toHaveProperty('--mp-cascader-option-text-color')
    // Select resolves these roles from token.less in every theme, like Cedar.
    expect(theme).not.toHaveProperty('--mp-select-popup-bg')
    expect(theme).not.toHaveProperty('--mp-select-popup-option-bg-selected')
    expect(theme).not.toHaveProperty('--mp-select-popup-option-text-color-selected')
    for (const suffix of ['', '-hover', '-focus']) {
      expect(theme).not.toHaveProperty(`--mp-field-variant-filled-background${suffix}`)
    }
    expect(theme).not.toHaveProperty('--mp-field-suffix-text-color')
    expect(theme).not.toHaveProperty('--mp-field-error-color')
  }
})

test('floating themes inherit semantic colors and keep the primary contrast exception', () => {
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
  expect(Themes.maple.light['--mp-tooltip-status-primary-text-color']).toBe('var(--mp-sys-color-content-on-dark)')
})

test('default light theme', () => {
  expect(Themes.default.light).toMatchSnapshot()
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
    expect(theme['--mp-badge-text-color']).toBe('var(--mp-sys-color-content-on-bright)')
    expect(theme['--mp-badge-status-tertiary-text-color']).toBe('var(--mp-sys-color-content-on-bright)')
    for (const status of ['info', 'success', 'warning', 'danger']) {
      expect(theme[`--mp-badge-status-${status}-bg-color`]).toBe(`var(--mp-sys-color-status-${status})`)
      expect(theme[`--mp-badge-status-${status}-text-color`]).toBe('var(--mp-sys-color-content-on-bright)')
      expect(theme[`--mp-badge-variant-outline-status-${status}-text-color`]).toBe(
        `var(--mp-sys-color-content-${status})`,
      )
    }
    expect(theme['--mp-badge-status-primary-bg-color']).toBe('var(--mp-sys-color-action-primary)')
    expect(theme['--mp-badge-status-primary-text-color']).toBe('var(--mp-sys-color-content-on-bright)')
    expect(theme['--mp-badge-variant-outline-status-primary-text-color']).toBe('var(--mp-sys-color-content-brand)')
    expect(theme['--mp-badge-variant-outline-status-default-text-color']).toBe('var(--mp-sys-color-content-primary)')
  }
})

test('maple light badge uses light text on its dark primary brand', () => {
  expect(Themes.maple.light['--mp-badge-status-primary-text-color']).toBe('var(--mp-sys-color-content-on-dark)')
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
