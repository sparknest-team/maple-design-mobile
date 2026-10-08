import type { App } from 'vue'
import _IconUserCircle from './icon-user-circle.vue'

export const IconUserCircle = Object.assign(_IconUserCircle, {
  install(app: App) { app.component(_IconUserCircle.name, _IconUserCircle) },
})
