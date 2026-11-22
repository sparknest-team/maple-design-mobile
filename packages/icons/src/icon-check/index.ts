import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCheck from './icon-check.vue'

export const IconCheck: IconComponent = Object.assign(_IconCheck, {
  install(app: App) { app.component(_IconCheck.name!, _IconCheck) },
})
