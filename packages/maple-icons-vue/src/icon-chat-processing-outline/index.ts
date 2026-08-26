import type { App } from 'vue'
import _IconChatProcessingOutline from './icon-chat-processing-outline.vue'

export const IconChatProcessingOutline = Object.assign(_IconChatProcessingOutline, {
  install(app: App) {
    app.component(_IconChatProcessingOutline.name, _IconChatProcessingOutline)
  },
})
