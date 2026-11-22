import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEraser from './icon-eraser.vue'

export const IconEraser: IconComponent = Object.assign(_IconEraser, {
  install(app: App) { app.component(_IconEraser.name!, _IconEraser) },
})
