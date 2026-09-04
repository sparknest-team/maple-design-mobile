import type { App } from 'vue'
import _IconPen from './icon-pen.vue'

export const IconPen = Object.assign(_IconPen, {
  install(app: App) {
    app.component(_IconPen.name, _IconPen)
  },
})
