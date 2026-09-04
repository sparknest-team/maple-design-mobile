import type { App } from 'vue'
import _IconDragDotVertical from './icon-drag-dot-vertical.vue'

export const IconDragDotVertical = Object.assign(_IconDragDotVertical, {
  install(app: App) {
    app.component(_IconDragDotVertical.name, _IconDragDotVertical)
  },
})
