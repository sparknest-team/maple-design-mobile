import type { App } from 'vue'
import _IconMenuUp from './icon-menu-up.vue'

export const IconMenuUp = Object.assign(_IconMenuUp, {
  install(app: App) {
    app.component(_IconMenuUp.name, _IconMenuUp)
  },
})
