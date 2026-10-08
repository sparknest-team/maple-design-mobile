import type { App } from 'vue'
import _IconLocationFill from './icon-location-fill.vue'

export const IconLocationFill = Object.assign(_IconLocationFill, {
  install(app: App) { app.component(_IconLocationFill.name, _IconLocationFill) },
})
