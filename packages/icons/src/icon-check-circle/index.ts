import type { App } from 'vue'
import _IconCheckCircle from './icon-check-circle.vue'

export const IconCheckCircle = Object.assign(_IconCheckCircle, {
  install(app: App) { app.component(_IconCheckCircle.name, _IconCheckCircle) },
})
