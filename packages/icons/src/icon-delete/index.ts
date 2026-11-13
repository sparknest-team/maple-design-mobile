import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDelete from './icon-delete.vue'

export const IconDelete: IconComponent = Object.assign(_IconDelete, {
  install(app: App) { app.component(_IconDelete.name, _IconDelete) },
})
