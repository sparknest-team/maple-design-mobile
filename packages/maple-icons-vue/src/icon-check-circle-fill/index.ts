import type { App } from 'vue'
import _IconCheckCircleFill from './icon-check-circle-fill.vue'

export const IconCheckCircleFill = Object.assign(_IconCheckCircleFill, {
  install(app: App) {
    app.component(_IconCheckCircleFill.name, _IconCheckCircleFill)
  },
})
