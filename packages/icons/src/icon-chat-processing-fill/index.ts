import type { App } from 'vue'
import _IconChatProcessingFill from './icon-chat-processing-fill.vue'

export const IconChatProcessingFill = Object.assign(_IconChatProcessingFill, {
  install(app: App) { app.component(_IconChatProcessingFill.name, _IconChatProcessingFill) },
})
