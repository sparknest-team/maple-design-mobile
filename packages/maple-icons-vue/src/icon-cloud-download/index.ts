import type { App } from 'vue'
import _IconCloudDownload from './icon-cloud-download.vue'

export const IconCloudDownload = Object.assign(_IconCloudDownload, {
  install(app: App) {
    app.component(_IconCloudDownload.name, _IconCloudDownload)
  },
})
