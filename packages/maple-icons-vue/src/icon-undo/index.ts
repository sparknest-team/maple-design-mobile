import type { App } from 'vue'
import _IconUndo from './icon-undo.vue'

export const IconUndo = Object.assign(_IconUndo, {
  install(app: App) {
    app.component(_IconUndo.name, _IconUndo)
  },
})
