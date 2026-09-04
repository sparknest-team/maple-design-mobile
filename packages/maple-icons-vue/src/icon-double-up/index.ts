import type { App } from 'vue'
import _IconDoubleUp from './icon-double-up.vue'

export const IconDoubleUp = Object.assign(_IconDoubleUp, {
  install(app: App) {
    app.component(_IconDoubleUp.name, _IconDoubleUp)
  },
})
