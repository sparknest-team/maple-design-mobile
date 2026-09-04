import type { App } from 'vue'
import _IconFolderDelete from './icon-folder-delete.vue'

export const IconFolderDelete = Object.assign(_IconFolderDelete, {
  install(app: App) {
    app.component(_IconFolderDelete.name, _IconFolderDelete)
  },
})
