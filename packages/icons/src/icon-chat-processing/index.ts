import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconChatProcessing from './icon-chat-processing.vue'

export const IconChatProcessing: IconComponent = Object.assign(_IconChatProcessing, {
  install(app: App) { app.component(_IconChatProcessing.name, _IconChatProcessing) },
})
