import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDriveFile from './icon-drive-file.vue'

export const IconDriveFile: IconComponent = Object.assign(_IconDriveFile, {
  install(app: App) { app.component(_IconDriveFile.name!, _IconDriveFile) },
})
