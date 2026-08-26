import type { App } from 'vue'
import _IconDownloadOutline from './icon-download-outline.vue'

export const IconDownloadOutline = Object.assign(_IconDownloadOutline, {
  install(app: App) {
    app.component(_IconDownloadOutline.name, _IconDownloadOutline)
  },
})
