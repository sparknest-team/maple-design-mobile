import type { App } from 'vue'
import _IconInfoCircle from './icon-info-circle.vue'

export const IconInfoCircle = Object.assign(_IconInfoCircle, {
  install(app: App) { app.component(_IconInfoCircle.name, _IconInfoCircle) },
})
