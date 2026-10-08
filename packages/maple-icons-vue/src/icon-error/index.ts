import type { App } from 'vue'
import _IconError from './icon-error.vue'

export const IconError = Object.assign(_IconError, {
  install(app: App) { app.component(_IconError.name, _IconError) },
})
