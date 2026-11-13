import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDownload from './icon-download.vue'

export const IconDownload: IconComponent = Object.assign(_IconDownload, {
  install(app: App) { app.component(_IconDownload.name, _IconDownload) },
})
