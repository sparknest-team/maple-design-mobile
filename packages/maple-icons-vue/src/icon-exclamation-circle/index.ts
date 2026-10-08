import type { App } from 'vue'
import _IconExclamationCircle from './icon-exclamation-circle.vue'

export const IconExclamationCircle = Object.assign(_IconExclamationCircle, {
  install(app: App) { app.component(_IconExclamationCircle.name, _IconExclamationCircle) },
})
