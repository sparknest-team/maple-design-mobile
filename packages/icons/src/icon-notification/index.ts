import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconNotification from './icon-notification.vue'

export const IconNotification: IconComponent = Object.assign(_IconNotification, {
  install(app: App) { app.component(_IconNotification.name!, _IconNotification) },
})
