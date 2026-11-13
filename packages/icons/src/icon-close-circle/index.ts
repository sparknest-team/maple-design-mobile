import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCloseCircle from './icon-close-circle.vue'

export const IconCloseCircle: IconComponent = Object.assign(_IconCloseCircle, {
  install(app: App) { app.component(_IconCloseCircle.name, _IconCloseCircle) },
})
