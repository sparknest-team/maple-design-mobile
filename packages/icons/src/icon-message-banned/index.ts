import type { App } from 'vue'
import _IconMessageBanned from './icon-message-banned.vue'

export const IconMessageBanned = Object.assign(_IconMessageBanned, {
  install(app: App) { app.component(_IconMessageBanned.name, _IconMessageBanned) },
})
