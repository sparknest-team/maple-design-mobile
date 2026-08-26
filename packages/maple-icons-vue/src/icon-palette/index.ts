import type { App } from 'vue'
import _IconPalette from './icon-palette.vue'

export const IconPalette = Object.assign(_IconPalette, {
  install(app: App) {
    app.component(_IconPalette.name, _IconPalette)
  },
})
