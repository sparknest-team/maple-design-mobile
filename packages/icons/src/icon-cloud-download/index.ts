import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCloudDownload from './icon-cloud-download.vue'

export const IconCloudDownload: IconComponent = Object.assign(_IconCloudDownload, {
  install(app: App) { app.component(_IconCloudDownload.name, _IconCloudDownload) },
})
