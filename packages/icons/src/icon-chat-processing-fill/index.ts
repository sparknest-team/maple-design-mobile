import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconChatProcessingFill from './icon-chat-processing-fill.vue'

export const IconChatProcessingFill: IconComponent = Object.assign(_IconChatProcessingFill, {
  install(app: App) { app.component(_IconChatProcessingFill.name!, _IconChatProcessingFill) },
})
