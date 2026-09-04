import type { App } from 'vue'
import _IconUploadFill from './icon-upload-fill.vue'

export const IconUploadFill = Object.assign(_IconUploadFill, {
  install(app: App) {
    app.component(_IconUploadFill.name, _IconUploadFill)
  },
})
