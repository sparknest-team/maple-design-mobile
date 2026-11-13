import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEmailFill from './icon-email-fill.vue'

export const IconEmailFill: IconComponent = Object.assign(_IconEmailFill, {
  install(app: App) { app.component(_IconEmailFill.name, _IconEmailFill) },
})
