import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconErrorUnknown from './icon-error-unknown.vue'

export const IconErrorUnknown: IconComponent = Object.assign(_IconErrorUnknown, {
  install(app: App) { app.component(_IconErrorUnknown.name, _IconErrorUnknown) },
})
