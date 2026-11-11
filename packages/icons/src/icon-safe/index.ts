import type { App } from 'vue'
import _IconSafe from './icon-safe.vue'

export const IconSafe = Object.assign(_IconSafe, {
  install(app: App) { app.component(_IconSafe.name, _IconSafe) },
})
