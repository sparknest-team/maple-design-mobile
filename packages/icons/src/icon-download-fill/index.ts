import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDownloadFill from './icon-download-fill.vue'

export const IconDownloadFill: IconComponent = Object.assign(_IconDownloadFill, {
  install(app: App) { app.component(_IconDownloadFill.name!, _IconDownloadFill) },
})
