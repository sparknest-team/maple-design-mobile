import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFile from './icon-file.vue'

export const IconFile: IconComponent = Object.assign(_IconFile, {
  install(app: App) { app.component(_IconFile.name, _IconFile) },
})
