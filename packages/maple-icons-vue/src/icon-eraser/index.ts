import type { App } from 'vue'
import _IconEraser from './icon-eraser.vue'

export const IconEraser = Object.assign(_IconEraser, {
  install(app: App) {
    app.component(_IconEraser.name, _IconEraser)
  },
})
