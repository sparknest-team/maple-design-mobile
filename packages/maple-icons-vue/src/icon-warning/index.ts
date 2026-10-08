import type { App } from 'vue'
import _IconWarning from './icon-warning.vue'

export const IconWarning = Object.assign(_IconWarning, {
  install(app: App) { app.component(_IconWarning.name, _IconWarning) },
})
