import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconExclamationCircle from './icon-exclamation-circle.vue'

export const IconExclamationCircle: IconComponent = Object.assign(_IconExclamationCircle, {
  install(app: App) { app.component(_IconExclamationCircle.name, _IconExclamationCircle) },
})
