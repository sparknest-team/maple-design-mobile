import type { App } from 'vue'
import _IconDriveFile from './icon-drive-file.vue'

export const IconDriveFile = Object.assign(_IconDriveFile, {
  install(app: App) { app.component(_IconDriveFile.name, _IconDriveFile) },
})
