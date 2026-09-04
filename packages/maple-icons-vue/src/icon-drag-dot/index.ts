import type { App } from 'vue'
import _IconDragDot from './icon-drag-dot.vue'

export const IconDragDot = Object.assign(_IconDragDot, {
  install(app: App) {
    app.component(_IconDragDot.name, _IconDragDot)
  },
})
