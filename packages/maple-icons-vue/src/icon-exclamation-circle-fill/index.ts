import type { App } from 'vue'
import _IconExclamationCircleFill from './icon-exclamation-circle-fill.vue'

export const IconExclamationCircleFill = Object.assign(_IconExclamationCircleFill, {
  install(app: App) { app.component(_IconExclamationCircleFill.name, _IconExclamationCircleFill) },
})
