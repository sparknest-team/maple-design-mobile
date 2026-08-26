import type { App } from 'vue'
import _IconPaletteOutline from './icon-palette-outline.vue'

export const IconPaletteOutline = Object.assign(_IconPaletteOutline, {
  install(app: App) {
    app.component(_IconPaletteOutline.name, _IconPaletteOutline)
  },
})
