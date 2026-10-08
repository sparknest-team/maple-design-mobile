import type { App } from 'vue'
import _IconLocationRadiusFill from './icon-location-radius-fill.vue'

export const IconLocationRadiusFill = Object.assign(_IconLocationRadiusFill, {
  install(app: App) { app.component(_IconLocationRadiusFill.name, _IconLocationRadiusFill) },
})
