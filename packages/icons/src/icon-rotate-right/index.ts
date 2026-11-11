import type { App } from 'vue'
import _IconRotateRight from './icon-rotate-right.vue'

export const IconRotateRight = Object.assign(_IconRotateRight, {
  install(app: App) { app.component(_IconRotateRight.name, _IconRotateRight) },
})
