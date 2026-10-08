import type { App } from 'vue'
import _IconArchive from './icon-archive.vue'

export const IconArchive = Object.assign(_IconArchive, {
  install(app: App) { app.component(_IconArchive.name, _IconArchive) },
})
