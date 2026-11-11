import type { App } from 'vue'
import _IconNotificationClose from './icon-notification-close.vue'

export const IconNotificationClose = Object.assign(_IconNotificationClose, {
  install(app: App) { app.component(_IconNotificationClose.name, _IconNotificationClose) },
})
