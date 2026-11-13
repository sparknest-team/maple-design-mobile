import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconImport from './icon-import.vue'

export const IconImport: IconComponent = Object.assign(_IconImport, {
  install(app: App) { app.component(_IconImport.name, _IconImport) },
})
