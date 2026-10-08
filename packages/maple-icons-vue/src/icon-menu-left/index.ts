import type { App } from 'vue'
import _IconMenuLeft from './icon-menu-left.vue'

export const IconMenuLeft = Object.assign(_IconMenuLeft, {
  install(app: App) { app.component(_IconMenuLeft.name, _IconMenuLeft) },
})
