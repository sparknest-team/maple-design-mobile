import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLocation from './icon-location.vue'

export const IconLocation: IconComponent = Object.assign(_IconLocation, {
  install(app: App) { app.component(_IconLocation.name, _IconLocation) },
})
