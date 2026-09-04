import type { App } from 'vue'
import _IconDown from './icon-down.vue'

export const IconDown = Object.assign(_IconDown, {
  install(app: App) {
    app.component(_IconDown.name, _IconDown)
  },
})
