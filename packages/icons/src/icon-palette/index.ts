import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPalette from './icon-palette.vue'

export const IconPalette: IconComponent = Object.assign(_IconPalette, {
  install(app: App) { app.component(_IconPalette.name!, _IconPalette) },
})
