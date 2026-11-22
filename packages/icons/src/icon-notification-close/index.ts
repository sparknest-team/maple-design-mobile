import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconNotificationClose from './icon-notification-close.vue'

export const IconNotificationClose: IconComponent = Object.assign(_IconNotificationClose, {
  install(app: App) { app.component(_IconNotificationClose.name!, _IconNotificationClose) },
})
