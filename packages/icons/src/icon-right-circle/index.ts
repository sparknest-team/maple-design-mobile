import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRightCircle from './icon-right-circle.vue'

export const IconRightCircle: IconComponent = Object.assign(_IconRightCircle, {
  install(app: App) { app.component(_IconRightCircle.name, _IconRightCircle) },
})
