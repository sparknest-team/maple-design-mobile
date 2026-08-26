import type { App } from 'vue'
import _IconMessageTextOutline from './icon-message-text-outline.vue'

export const IconMessageTextOutline = Object.assign(_IconMessageTextOutline, {
  install(app: App) {
    app.component(_IconMessageTextOutline.name, _IconMessageTextOutline)
  },
})
