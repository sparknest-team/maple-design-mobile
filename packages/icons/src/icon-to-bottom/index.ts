import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconToBottom from './icon-to-bottom.vue'

export const IconToBottom: IconComponent = Object.assign(_IconToBottom, {
  install(app: App) { app.component(_IconToBottom.name, _IconToBottom) },
})
