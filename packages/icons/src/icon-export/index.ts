import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconExport from './icon-export.vue'

export const IconExport: IconComponent = Object.assign(_IconExport, {
  install(app: App) { app.component(_IconExport.name!, _IconExport) },
})
