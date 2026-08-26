import type { App } from 'vue'
import _IconCloseBoxOutline from './icon-close-box-outline.vue'

export const IconCloseBoxOutline = Object.assign(_IconCloseBoxOutline, {
  install(app: App) {
    app.component(_IconCloseBoxOutline.name, _IconCloseBoxOutline)
  },
})
