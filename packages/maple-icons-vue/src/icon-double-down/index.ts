import type { App } from 'vue'
import _IconDoubleDown from './icon-double-down.vue'

export const IconDoubleDown = Object.assign(_IconDoubleDown, {
  install(app: App) {
    app.component(_IconDoubleDown.name, _IconDoubleDown)
  },
})
