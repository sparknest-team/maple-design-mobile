import type { App } from 'vue'
import _IconMessageProcessing from './icon-message-processing.vue'

export const IconMessageProcessing = Object.assign(_IconMessageProcessing, {
  install(app: App) { app.component(_IconMessageProcessing.name, _IconMessageProcessing) },
})
