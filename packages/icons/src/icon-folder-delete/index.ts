import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFolderDelete from './icon-folder-delete.vue'

export const IconFolderDelete: IconComponent = Object.assign(_IconFolderDelete, {
  install(app: App) { app.component(_IconFolderDelete.name, _IconFolderDelete) },
})
