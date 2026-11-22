import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUndo from './icon-undo.vue'

export const IconUndo: IconComponent = Object.assign(_IconUndo, {
  install(app: App) { app.component(_IconUndo.name!, _IconUndo) },
})
