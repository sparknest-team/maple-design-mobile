import type { App } from 'vue'
import _IconMessageProcessingOutline from './icon-message-processing-outline.vue'

export const IconMessageProcessingOutline = Object.assign(_IconMessageProcessingOutline, {
  install(app: App) {
    app.component(_IconMessageProcessingOutline.name, _IconMessageProcessingOutline)
  },
})
