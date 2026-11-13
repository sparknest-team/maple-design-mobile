import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconAlert from './icon-alert.vue'

export const IconAlert: IconComponent = Object.assign(_IconAlert, {
  install(app: App) { app.component(_IconAlert.name, _IconAlert) },
})
