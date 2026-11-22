import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCodeSquare from './icon-code-square.vue'

export const IconCodeSquare: IconComponent = Object.assign(_IconCodeSquare, {
  install(app: App) { app.component(_IconCodeSquare.name!, _IconCodeSquare) },
})
