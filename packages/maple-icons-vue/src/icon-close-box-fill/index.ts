import type { App } from 'vue'
import _IconCloseBoxFill from './icon-close-box-fill.vue'

export const IconCloseBoxFill = Object.assign(_IconCloseBoxFill, {
  install(app: App) {
    app.component(_IconCloseBoxFill.name, _IconCloseBoxFill)
  },
})
