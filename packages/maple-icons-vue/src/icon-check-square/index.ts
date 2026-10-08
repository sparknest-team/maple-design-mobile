import type { App } from 'vue'
import _IconCheckSquare from './icon-check-square.vue'

export const IconCheckSquare = Object.assign(_IconCheckSquare, {
  install(app: App) { app.component(_IconCheckSquare.name, _IconCheckSquare) },
})
