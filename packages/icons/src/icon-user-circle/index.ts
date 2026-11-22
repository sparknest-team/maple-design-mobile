import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUserCircle from './icon-user-circle.vue'

export const IconUserCircle: IconComponent = Object.assign(_IconUserCircle, {
  install(app: App) { app.component(_IconUserCircle.name!, _IconUserCircle) },
})
