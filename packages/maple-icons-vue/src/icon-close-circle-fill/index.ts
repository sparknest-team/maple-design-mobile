import type { App } from 'vue'
import _IconCloseCircleFill from './icon-close-circle-fill.vue'

export const IconCloseCircleFill = Object.assign(_IconCloseCircleFill, {
  install(app: App) {
    app.component(_IconCloseCircleFill.name, _IconCloseCircleFill)
  },
})
