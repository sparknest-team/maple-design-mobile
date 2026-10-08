import type { App } from 'vue'
import _IconDragArrow from './icon-drag-arrow.vue'

export const IconDragArrow = Object.assign(_IconDragArrow, {
  install(app: App) { app.component(_IconDragArrow.name, _IconDragArrow) },
})
