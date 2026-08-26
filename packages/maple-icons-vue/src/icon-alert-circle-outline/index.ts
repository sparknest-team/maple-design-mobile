import type { App } from 'vue'
import _IconAlertCircleOutline from './icon-alert-circle-outline.vue'

export const IconAlertCircleOutline = Object.assign(_IconAlertCircleOutline, {
  install(app: App) {
    app.component(_IconAlertCircleOutline.name, _IconAlertCircleOutline)
  },
})
