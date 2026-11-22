import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCheckSquare from './icon-check-square.vue'

export const IconCheckSquare: IconComponent = Object.assign(_IconCheckSquare, {
  install(app: App) { app.component(_IconCheckSquare.name!, _IconCheckSquare) },
})
