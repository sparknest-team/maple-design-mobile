import type { App } from 'vue'
import _IconCloseCircle from './icon-close-circle.vue'

export const IconCloseCircle = Object.assign(_IconCloseCircle, {
  install(app: App) { app.component(_IconCloseCircle.name, _IconCloseCircle) },
})
