import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconNotebook from './icon-notebook.vue'

export const IconNotebook: IconComponent = Object.assign(_IconNotebook, {
  install(app: App) { app.component(_IconNotebook.name, _IconNotebook) },
})
