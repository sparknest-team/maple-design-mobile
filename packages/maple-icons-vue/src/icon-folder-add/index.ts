import type { App } from 'vue'
import _IconFolderAdd from './icon-folder-add.vue'

export const IconFolderAdd = Object.assign(_IconFolderAdd, {
  install(app: App) {
    app.component(_IconFolderAdd.name, _IconFolderAdd)
  },
})
