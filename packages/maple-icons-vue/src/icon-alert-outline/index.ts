import type { App } from 'vue'
import _IconAlertOutline from './icon-alert-outline.vue'

export const IconAlertOutline = Object.assign(_IconAlertOutline, {
  install(app: App) {
    app.component(_IconAlertOutline.name, _IconAlertOutline)
  },
})
