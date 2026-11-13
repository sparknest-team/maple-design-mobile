import alpsLight from './alps-light'
import { convert } from './convert'
import { createBrandDark } from './create-brand-dark'
import defaultDark from './dark'
import fireflyLight from './firefly-light'
import mapleDark from './maple-dark'
import mapleLight from './maple-light'
import { toRem } from './toRem'
import { toViewport } from './toViewport'

const defaultLight = {
  '--mp-color-scheme': 'light',
  '--mp-field-focus-color': 'var(--mp-sys-color-action-primary)',
  '--mp-field-error-color': 'var(--mp-sys-color-content-danger)',
  '--mp-field-variant-outline-border-color-focus': 'var(--mp-sys-color-action-primary)',
  '--mp-brand-1': '232, 255, 251',
  '--mp-brand-2': '176, 242, 233',
  '--mp-brand-3': '125, 229, 219',
  '--mp-brand-4': '79, 216, 207',
  '--mp-brand-5': '37, 203, 197',
  '--mp-brand-6': '0, 190, 190',
  '--mp-brand-7': '0, 156, 162',
  '--mp-brand-8': '0, 124, 133',
  '--mp-brand-9': '0, 94, 105',
  '--mp-brand-10': '0, 66, 77',
  '--mp-primary-1': '232, 255, 251',
  '--mp-primary-2': '176, 242, 233',
  '--mp-primary-3': '125, 229, 219',
  '--mp-primary-4': '79, 216, 207',
  '--mp-primary-5': '37, 203, 197',
  '--mp-primary-6': '0, 190, 190',
  '--mp-primary-7': '0, 156, 162',
  '--mp-primary-8': '0, 124, 133',
  '--mp-primary-9': '0, 94, 105',
  '--mp-primary-10': '0, 66, 77',
} as const

const Themes = {
  default: { light: defaultLight, dark: defaultDark },
  maple: { light: mapleLight, dark: mapleDark },
  alps: { light: alpsLight, dark: createBrandDark(alpsLight, 'alps') },
  firefly: { light: fireflyLight, dark: createBrandDark(fireflyLight, 'firefly') },
  toViewport,
  toRem,
  convert,
}

export const _ThemesComponent: null = null

export default Themes
