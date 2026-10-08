import type { App } from 'vue'
import _IconAlert from './icon-alert.vue'

export const IconAlert = Object.assign(_IconAlert, {
  install(app: App) { app.component(_IconAlert.name, _IconAlert) },
})
