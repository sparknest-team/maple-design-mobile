import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCheckCircle from './icon-check-circle.vue'

export const IconCheckCircle: IconComponent = Object.assign(_IconCheckCircle, {
  install(app: App) { app.component(_IconCheckCircle.name, _IconCheckCircle) },
})
