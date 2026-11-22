import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconToRight from './icon-to-right.vue'

export const IconToRight: IconComponent = Object.assign(_IconToRight, {
  install(app: App) { app.component(_IconToRight.name!, _IconToRight) },
})
