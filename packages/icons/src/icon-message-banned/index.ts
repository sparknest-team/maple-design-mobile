import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMessageBanned from './icon-message-banned.vue'

export const IconMessageBanned: IconComponent = Object.assign(_IconMessageBanned, {
  install(app: App) { app.component(_IconMessageBanned.name!, _IconMessageBanned) },
})
