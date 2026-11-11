import type { App } from 'vue'
import _IconMenuRight from './icon-menu-right.vue'

export const IconMenuRight = Object.assign(_IconMenuRight, {
  install(app: App) { app.component(_IconMenuRight.name, _IconMenuRight) },
})
