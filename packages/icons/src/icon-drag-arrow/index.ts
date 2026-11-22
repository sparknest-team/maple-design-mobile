import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDragArrow from './icon-drag-arrow.vue'

export const IconDragArrow: IconComponent = Object.assign(_IconDragArrow, {
  install(app: App) { app.component(_IconDragArrow.name!, _IconDragArrow) },
})
