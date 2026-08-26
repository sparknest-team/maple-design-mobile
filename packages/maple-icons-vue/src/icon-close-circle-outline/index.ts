import type { App } from 'vue'
import _IconCloseCircleOutline from './icon-close-circle-outline.vue'

export const IconCloseCircleOutline = Object.assign(_IconCloseCircleOutline, {
  install(app: App) {
    app.component(_IconCloseCircleOutline.name, _IconCloseCircleOutline)
  },
})
