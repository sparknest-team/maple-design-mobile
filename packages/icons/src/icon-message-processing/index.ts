import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMessageProcessing from './icon-message-processing.vue'

export const IconMessageProcessing: IconComponent = Object.assign(_IconMessageProcessing, {
  install(app: App) { app.component(_IconMessageProcessing.name, _IconMessageProcessing) },
})
