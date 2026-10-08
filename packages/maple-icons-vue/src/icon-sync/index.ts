import type { App } from 'vue'
import _IconSync from './icon-sync.vue'

export const IconSync = Object.assign(_IconSync, {
  install(app: App) { app.component(_IconSync.name, _IconSync) },
})
