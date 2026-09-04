import type { App } from 'vue'
import _IconCodeSquare from './icon-code-square.vue'

export const IconCodeSquare = Object.assign(_IconCodeSquare, {
  install(app: App) {
    app.component(_IconCodeSquare.name, _IconCodeSquare)
  },
})
