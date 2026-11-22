import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPaletteFill from './icon-palette-fill.vue'

export const IconPaletteFill: IconComponent = Object.assign(_IconPaletteFill, {
  install(app: App) { app.component(_IconPaletteFill.name!, _IconPaletteFill) },
})
