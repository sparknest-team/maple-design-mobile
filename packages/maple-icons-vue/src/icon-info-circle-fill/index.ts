import type { App } from 'vue'
import _IconInfoCircleFill from './icon-info-circle-fill.vue'

export const IconInfoCircleFill = Object.assign(_IconInfoCircleFill, {
  install(app: App) { app.component(_IconInfoCircleFill.name, _IconInfoCircleFill) },
})
