import type { App } from 'vue'
import _IconChatProcessing from './icon-chat-processing.vue'

export const IconChatProcessing = Object.assign(_IconChatProcessing, {
  install(app: App) { app.component(_IconChatProcessing.name, _IconChatProcessing) },
})
