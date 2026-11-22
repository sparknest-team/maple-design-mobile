import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWarning from './icon-warning.vue'

export const IconWarning: IconComponent = Object.assign(_IconWarning, {
  install(app: App) { app.component(_IconWarning.name!, _IconWarning) },
})
