import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEmail from './icon-email.vue'

export const IconEmail: IconComponent = Object.assign(_IconEmail, {
  install(app: App) { app.component(_IconEmail.name, _IconEmail) },
})
