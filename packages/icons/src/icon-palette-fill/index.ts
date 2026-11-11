import type { App } from 'vue'
import _IconPaletteFill from './icon-palette-fill.vue'

export const IconPaletteFill = Object.assign(_IconPaletteFill, {
  install(app: App) { app.component(_IconPaletteFill.name, _IconPaletteFill) },
})
