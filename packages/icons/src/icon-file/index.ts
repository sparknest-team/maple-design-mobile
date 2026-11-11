import type { App } from 'vue'
import _IconFile from './icon-file.vue'

export const IconFile = Object.assign(_IconFile, {
  install(app: App) { app.component(_IconFile.name, _IconFile) },
})
