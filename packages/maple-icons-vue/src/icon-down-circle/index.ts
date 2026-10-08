import type { App } from 'vue'
import _IconDownCircle from './icon-down-circle.vue'

export const IconDownCircle = Object.assign(_IconDownCircle, {
  install(app: App) { app.component(_IconDownCircle.name, _IconDownCircle) },
})
