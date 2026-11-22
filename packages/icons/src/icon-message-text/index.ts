import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMessageText from './icon-message-text.vue'

export const IconMessageText: IconComponent = Object.assign(_IconMessageText, {
  install(app: App) { app.component(_IconMessageText.name!, _IconMessageText) },
})
