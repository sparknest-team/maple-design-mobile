import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFolderAdd from './icon-folder-add.vue'

export const IconFolderAdd: IconComponent = Object.assign(_IconFolderAdd, {
  install(app: App) { app.component(_IconFolderAdd.name!, _IconFolderAdd) },
})
