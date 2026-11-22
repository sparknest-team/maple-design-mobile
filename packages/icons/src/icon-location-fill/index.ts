import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLocationFill from './icon-location-fill.vue'

export const IconLocationFill: IconComponent = Object.assign(_IconLocationFill, {
  install(app: App) { app.component(_IconLocationFill.name!, _IconLocationFill) },
})
