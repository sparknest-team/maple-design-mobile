import type { App } from 'vue'
import _IconHomeFill from './icon-home-fill.vue'

export const IconHomeFill = Object.assign(_IconHomeFill, {
  install(app: App) {
    app.component(_IconHomeFill.name, _IconHomeFill)
  },
})
