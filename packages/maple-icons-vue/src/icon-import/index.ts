import type { App } from 'vue'
import _IconImport from './icon-import.vue'

export const IconImport = Object.assign(_IconImport, {
  install(app: App) { app.component(_IconImport.name, _IconImport) },
})
