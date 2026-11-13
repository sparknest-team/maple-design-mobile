import { expect, test } from 'vitest'
import Themes from '..'

test.each(['alps', 'firefly'] as const)(
  '%s semantic text follows its action and status colors in both modes',
  (brand) => {
    for (const mode of ['light', 'dark'] as const) {
      const theme = Themes[brand][mode]
      expect(theme['--mp-sys-color-content-brand']).toBe('var(--mp-sys-color-action-primary)')
      expect(theme['--mp-button-primary-foreground-color']).toBe('var(--mp-button-primary-color)')
      const roles = {
        info: 'var(--mp-sys-color-status-info)',
        success: 'var(--mp-sys-color-status-success)',
        warning: 'var(--mp-sys-color-status-warning)',
        danger: 'var(--mp-sys-color-status-danger)',
      }
      for (const [status, role] of Object.entries(roles)) {
        expect(theme[`--mp-sys-color-content-${status}`]).toBe(role)
        expect(theme[`--mp-button-${status}-foreground-color`]).toBe(`var(--mp-button-${status}-color)`)
      }
      expect(theme['--mp-checkbox-control-color-checked']).toBe('var(--mp-sys-color-action-primary)')
      expect(theme['--mp-date-calendar-selected-background']).toBe('var(--mp-sys-color-action-primary)')
    }
  },
)
