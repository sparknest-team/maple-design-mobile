import type { App } from 'vue'
import _IconAt from './icon-at.vue'

export const IconAt = Object.assign(_IconAt, {
  install(app: App) { app.component(_IconAt.name, _IconAt) },
})
