import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDragDot from './icon-drag-dot.vue'

export const IconDragDot: IconComponent = Object.assign(_IconDragDot, {
  install(app: App) { app.component(_IconDragDot.name, _IconDragDot) },
})
