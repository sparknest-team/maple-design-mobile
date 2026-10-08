import type { App } from 'vue'
import _IconMenuDown from './icon-menu-down.vue'

export const IconMenuDown = Object.assign(_IconMenuDown, {
  install(app: App) { app.component(_IconMenuDown.name, _IconMenuDown) },
})
