import type { App } from 'vue'
import _IconNotification from './icon-notification.vue'

export const IconNotification = Object.assign(_IconNotification, {
  install(app: App) {
    app.component(_IconNotification.name, _IconNotification)
  },
})
