import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDownCircle from './icon-down-circle.vue'

export const IconDownCircle: IconComponent = Object.assign(_IconDownCircle, {
  install(app: App) { app.component(_IconDownCircle.name!, _IconDownCircle) },
})
