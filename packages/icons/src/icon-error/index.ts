import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconError from './icon-error.vue'

export const IconError: IconComponent = Object.assign(_IconError, {
  install(app: App) { app.component(_IconError.name, _IconError) },
})
