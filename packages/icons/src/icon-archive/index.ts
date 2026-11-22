import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconArchive from './icon-archive.vue'

export const IconArchive: IconComponent = Object.assign(_IconArchive, {
  install(app: App) { app.component(_IconArchive.name!, _IconArchive) },
})
