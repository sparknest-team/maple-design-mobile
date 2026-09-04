import type { App } from 'vue'
import _IconAlertCircle from './icon-alert-circle.vue'

export const IconAlertCircle = Object.assign(_IconAlertCircle, {
  install(app: App) {
    app.component(_IconAlertCircle.name, _IconAlertCircle)
  },
})
