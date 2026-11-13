import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconExclamation from './icon-exclamation.vue'

export const IconExclamation: IconComponent = Object.assign(_IconExclamation, {
  install(app: App) { app.component(_IconExclamation.name, _IconExclamation) },
})
