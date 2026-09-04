import type { App } from 'vue'
import _IconMessageText from './icon-message-text.vue'

export const IconMessageText = Object.assign(_IconMessageText, {
  install(app: App) {
    app.component(_IconMessageText.name, _IconMessageText)
  },
})
