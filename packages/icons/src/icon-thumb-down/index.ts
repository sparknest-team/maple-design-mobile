import type { App } from 'vue'
import _IconThumbDown from './icon-thumb-down.vue'

export const IconThumbDown = Object.assign(_IconThumbDown, {
  install(app: App) { app.component(_IconThumbDown.name, _IconThumbDown) },
})
