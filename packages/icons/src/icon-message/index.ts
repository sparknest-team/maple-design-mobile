import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMessage from './icon-message.vue'

export const IconMessage: IconComponent = Object.assign(_IconMessage, {
  install(app: App) { app.component(_IconMessage.name!, _IconMessage) },
})
