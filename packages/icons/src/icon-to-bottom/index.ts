import type { App } from 'vue'
import _IconToBottom from './icon-to-bottom.vue'

export const IconToBottom = Object.assign(_IconToBottom, {
  install(app: App) { app.component(_IconToBottom.name, _IconToBottom) },
})
