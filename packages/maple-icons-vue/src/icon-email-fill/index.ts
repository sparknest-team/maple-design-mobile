import type { App } from 'vue'
import _IconEmailFill from './icon-email-fill.vue'

export const IconEmailFill = Object.assign(_IconEmailFill, {
  install(app: App) { app.component(_IconEmailFill.name, _IconEmailFill) },
})
