import type { App } from 'vue'
import _IconExport from './icon-export.vue'

export const IconExport = Object.assign(_IconExport, {
  install(app: App) {
    app.component(_IconExport.name, _IconExport)
  },
})
