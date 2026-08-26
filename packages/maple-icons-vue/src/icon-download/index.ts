import type { App } from 'vue'
import _IconDownload from './icon-download.vue'

export const IconDownload = Object.assign(_IconDownload, {
  install(app: App) {
    app.component(_IconDownload.name, _IconDownload)
  },
})
