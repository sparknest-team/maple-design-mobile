import type { App } from 'vue'
import _IconRotateLeft from './icon-rotate-left.vue'

export const IconRotateLeft = Object.assign(_IconRotateLeft, {
  install(app: App) { app.component(_IconRotateLeft.name, _IconRotateLeft) },
})
