import type { App } from 'vue'
import _IconUploadOutline from './icon-upload-outline.vue'

export const IconUploadOutline = Object.assign(_IconUploadOutline, {
  install(app: App) {
    app.component(_IconUploadOutline.name, _IconUploadOutline)
  },
})
