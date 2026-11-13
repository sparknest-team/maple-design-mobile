import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconAlertCircle from './icon-alert-circle.vue'

export const IconAlertCircle: IconComponent = Object.assign(_IconAlertCircle, {
  install(app: App) { app.component(_IconAlertCircle.name, _IconAlertCircle) },
})
