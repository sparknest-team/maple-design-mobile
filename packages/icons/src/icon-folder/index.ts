import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFolder from './icon-folder.vue'

export const IconFolder: IconComponent = Object.assign(_IconFolder, {
  install(app: App) { app.component(_IconFolder.name, _IconFolder) },
})
