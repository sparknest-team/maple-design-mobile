import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLocationRadiusFill from './icon-location-radius-fill.vue'

export const IconLocationRadiusFill: IconComponent = Object.assign(_IconLocationRadiusFill, {
  install(app: App) { app.component(_IconLocationRadiusFill.name!, _IconLocationRadiusFill) },
})
