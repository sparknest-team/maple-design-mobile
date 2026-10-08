import type { App } from 'vue'
import _IconErrorUnknown from './icon-error-unknown.vue'

export const IconErrorUnknown = Object.assign(_IconErrorUnknown, {
  install(app: App) { app.component(_IconErrorUnknown.name, _IconErrorUnknown) },
})
