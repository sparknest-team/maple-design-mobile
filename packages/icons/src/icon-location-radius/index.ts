import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLocationRadius from './icon-location-radius.vue'

export const IconLocationRadius: IconComponent = Object.assign(_IconLocationRadius, {
  install(app: App) { app.component(_IconLocationRadius.name!, _IconLocationRadius) },
})
