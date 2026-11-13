import type { StyleVars } from '../theme-provider'
import defaultDark from './dark'

type Brand = 'alps' | 'firefly'

// Maple adaptations of the captured light brands. These are not Horo dark-mode samples.
export function createBrandDark(light: StyleVars, brand: Brand): StyleVars {
  const alps = brand === 'alps'
  const page = alps ? '#10121A' : '#111625'
  const surface = alps ? '#1B1E29' : '#1A2236'
  const overlay = alps ? '#242836' : '#222C43'
  const muted = alps ? '#222633' : '#252F45'
  const text = alps ? '#F1F2F6' : '#EBEEFF'
  const secondary = alps ? '#BDC1CD' : '#BDC5DF'
  const tertiary = alps ? '#9299AB' : '#939DBA'
  const disabled = alps ? '#626A7D' : '#626F8A'
  const border = alps ? '#454D61' : '#465674'
  const divider = alps ? '#303648' : '#33415D'
  const accent = alps ? '#FF946F' : '#C5B8FF'
  const action = alps ? '#EDEEF3' : '#EAFF68'
  const pressed = alps ? '#C9CEDD' : '#CFDF26'
  const onAction = '#111625'
  const info = alps ? '#88B8FF' : accent
  const success = alps ? info : '#74DB9F'
  const warning = '#FFC76B'
  const danger = '#FF927F'
  const field = alps ? 'transparent' : muted
  const focus = alps ? text : accent
  const dark: StyleVars = { ...defaultDark, ...light, '--mp-color-scheme': 'dark' }
  const set = (key: string, value: string) => {
    dark[`--mp-${key}`] = value
  }
  const aliases = (keys: string[], value: string) => keys.forEach((key) => set(key, value))

  aliases(['color-body', 'sys-color-surface-page', 'color-bg-1'], page)
  aliases(['color-bg-2', 'sys-color-surface-default'], surface)
  set('switch-handle-background', text)
  set('switch-handle-color', onAction)
  aliases(['color-bg-3', 'sys-color-surface-raised'], muted)
  aliases(['color-bg-4', 'color-bg-5', 'sys-color-surface-overlay'], overlay)
  aliases(
    [
      'color-fill-1',
      'color-fill-2',
      'color-fill-3',
      'color-fill-4',
      'sys-color-surface-muted',
      'sys-color-state-hover',
      'switch-track-background',
    ],
    muted,
  )
  aliases(['color-text', 'color-text-1', 'sys-color-content-primary'], text)
  aliases(['color-text-2', 'sys-color-content-secondary'], secondary)
  aliases(['color-text-3', 'sys-color-content-tertiary', 'field-control-text-color-disabled'], tertiary)
  aliases(
    [
      'color-text-4',
      'color-text-disabled',
      'sys-color-content-disabled',
      'sys-color-content-decorative',
      'checkbox-control-color-disabled',
      'radio-control-color-disabled',
    ],
    disabled,
  )
  aliases(['checkbox-control-color-checked', 'radio-control-color-checked', 'switch-track-active-background'], accent)
  aliases(['checkbox-control-color', 'radio-control-color'], tertiary)
  aliases(['color-border-1', 'sys-color-border-subtle'], divider)
  aliases(['color-border-2', 'sys-color-border-default'], border)
  aliases(['color-border-3', 'color-border-4', 'sys-color-border-strong'], tertiary)
  aliases(['color-primary', 'sys-color-action-primary'], action)
  set('sys-color-content-brand', 'var(--mp-sys-color-action-primary)')
  set('button-primary-foreground-color', 'var(--mp-button-primary-color)')
  aliases(['button-solid-text-color'], onAction)
  aliases(['button-primary-disabled-color'], border)
  aliases(['button-disabled-solid-text-color'], secondary)
  aliases(['button-primary-state-layer-color'], pressed)
  aliases(
    ['button-primary-tonal-color', 'sys-color-state-selected', 'color-primary-light-1'],
    alps ? '#3C2928' : '#322D49',
  )
  if (!alps) {
    set('button-primary-tonal-color', '#30391F')
    set('button-secondary-color', secondary)
    set('button-secondary-foreground-color', text)
    set('button-secondary-tonal-color', muted)
    set('button-tertiary-color', '#CFC7FF')
    set('button-tertiary-foreground-color', accent)
    set('button-tertiary-text-color', onAction)
    set('button-tertiary-state-layer-color', '#B6A8FB')
    set('button-tertiary-tonal-color', '#322D49')
    aliases(['radio-control-color-checked', 'checkbox-control-color-checked', 'slider-active-color'], '#CFC7FF')
    set('checkbox-mark-color', onAction)
    set('switch-track-active-background', '#B6A8FB')
    set('slider-thumb-border-color', accent)
    set('date-picker-range-background', '#322D49')
  }
  set('field-variant-outline-background', field)
  aliases(['field-variant-filled-background', 'field-variant-filled-background-disabled'], muted)
  aliases(
    [
      'field-variant-outline-border-color',
      'field-variant-outline-border-color-hover',
      'field-variant-outline-border-color-disabled',
    ],
    alps ? border : 'transparent',
  )
  aliases(
    ['field-variant-outline-border-color-focus', 'field-variant-standard-line-color-focus', 'field-focus-color'],
    focus,
  )
  set('field-variant-filled-background-hover', alps ? '#2B3040' : '#303B54')
  set('field-variant-filled-background-focus', alps ? '#343C50' : '#3C4764')
  set('field-variant-filled-background-error', 'var(--mp-color-danger-light-1)')
  aliases(['field-variant-standard-line-color'], tertiary)
  aliases(['field-error-color', 'field-variant-outline-border-color-error'], danger)
  set('field-caret-color', accent)
  set('field-placeholder-text-color', secondary)
  set('sys-color-scrim', 'rgba(0, 0, 0, 0.64)')
  set('temporal-panel-summary-active-color', accent)
  aliases(['date-picker-main-color', 'date-picker-header-color'], text)
  set('date-picker-body-background-color', overlay)
  set('date-picker-title-background', overlay)
  set('date-picker-title-color', text)
  set('date-picker-title-hint-color', tertiary)
  set('day-picker-head-item-color', secondary)
  set('time-picker-body-background', overlay)
  set('date-calendar-selected-background', alps ? accent : '#CFC7FF')
  set('date-calendar-selected-color', '#111625')
  set('date-calendar-today-color', accent)
  set('picker-option-text-color', tertiary)
  set('picker-option-active-text-color', text)
  set('upload-duration-background', 'rgba(0, 0, 0, 0.72)')
  set('upload-duration-color', '#FFFFFF')
  set('upload-background', muted)
  set('upload-active-color', accent)
  set('upload-error-color', danger)

  const statusContent: Record<string, string> = {
    info: 'var(--mp-sys-color-status-info)',
    success: 'var(--mp-sys-color-status-success)',
    warning: 'var(--mp-sys-color-status-warning)',
    danger: 'var(--mp-sys-color-status-danger)',
  }
  for (const [status, color, weak] of [
    ['info', info, '#263149'],
    ['success', success, alps ? '#263149' : '#20392D'],
    ['warning', warning, '#3B3022'],
    ['danger', danger, '#3E2A2E'],
  ]) {
    aliases([`color-${status}`, `sys-color-status-${status}`], color)
    set(`sys-color-content-${status}`, statusContent[status])
    set(`button-${status}-foreground-color`, `var(--mp-button-${status}-color)`)
    aliases([`color-${status}-light-1`, `button-${status}-tonal-color`, `button-${status}-disabled-color`], weak)
  }
  // RGB channels remain compatible with rgb()/rgba() consumers throughout Maple.
  const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  const mix = (a: number[], b: number[], amount: number) =>
    a.map((v, i) => Math.round(v + (b[i] - v) * amount)).join(', ')
  for (const [palette, color] of [
    ['brand', alps ? accent : action],
    ['primary', action],
    ['info', info],
    ['blue', info],
    ['success', success],
    ['warning', warning],
    ['danger', danger],
  ]) {
    const channels = rgb(color)
    for (const [i, amount] of [0.08, 0.14, 0.24, 0.4, 0.7, 1].entries()) {
      set(`${palette}-${i + 1}`, mix(rgb(page), channels, amount))
    }
    for (const [i, amount] of [0.12, 0.26, 0.44, 0.68].entries()) {
      set(`${palette}-${i + 7}`, mix(channels, [255, 255, 255], amount))
    }
  }
  set('primary-7', rgb(pressed).join(', '))
  // Primary selection and focus follow the primary Button action in every brand.
  aliases(
    [
      'checkbox-control-color-checked',
      'radio-control-color-checked',
      'switch-track-active-background',
      'slider-active-color',
      'slider-thumb-border-color',
      'field-focus-color',
      'field-variant-outline-border-color-focus',
      'field-variant-standard-line-color-focus',
      'date-calendar-selected-background',
      'date-calendar-today-color',
      'temporal-panel-summary-active-color',
      'upload-active-color',
    ],
    'var(--mp-sys-color-action-primary)',
  )
  set('date-calendar-selected-color', 'var(--mp-button-solid-text-color)')
  return dark
}
