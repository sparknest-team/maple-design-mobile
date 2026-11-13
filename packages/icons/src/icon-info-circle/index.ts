import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconInfoCircle from './icon-info-circle.vue'

export const IconInfoCircle: IconComponent = Object.assign(_IconInfoCircle, {
  install(app: App) { app.component(_IconInfoCircle.name, _IconInfoCircle) },
})
