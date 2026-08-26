import type { App } from 'vue'
import _IconCheckCircleOutline from './icon-check-circle-outline.vue'

export const IconCheckCircleOutline = Object.assign(_IconCheckCircleOutline, {
  install(app: App) {
    app.component(_IconCheckCircleOutline.name, _IconCheckCircleOutline)
  },
})
