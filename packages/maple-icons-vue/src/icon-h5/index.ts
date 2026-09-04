import type { App } from 'vue'
import _IconH5 from './icon-h5.vue'

export const IconH5 = Object.assign(_IconH5, {
  install(app: App) {
    app.component(_IconH5.name, _IconH5)
  },
})
