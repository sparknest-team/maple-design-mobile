import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDragDotVertical from './icon-drag-dot-vertical.vue'

export const IconDragDotVertical: IconComponent = Object.assign(_IconDragDotVertical, {
  install(app: App) { app.component(_IconDragDotVertical.name, _IconDragDotVertical) },
})
