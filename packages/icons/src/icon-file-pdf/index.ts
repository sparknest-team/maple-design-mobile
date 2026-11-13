import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFilePdf from './icon-file-pdf.vue'

export const IconFilePdf: IconComponent = Object.assign(_IconFilePdf, {
  install(app: App) { app.component(_IconFilePdf.name, _IconFilePdf) },
})
