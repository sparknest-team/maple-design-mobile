import type { App } from 'vue'
import _IconH7 from './icon-h7.vue'

export const IconH7 = Object.assign(_IconH7, {
  install(app: App) { app.component(_IconH7.name, _IconH7) },
})
