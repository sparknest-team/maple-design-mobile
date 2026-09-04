import type { App } from 'vue'
import _IconUp from './icon-up.vue'

export const IconUp = Object.assign(_IconUp, {
  install(app: App) {
    app.component(_IconUp.name, _IconUp)
  },
})
