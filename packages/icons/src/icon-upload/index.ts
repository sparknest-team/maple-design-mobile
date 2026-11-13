import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUpload from './icon-upload.vue'

export const IconUpload: IconComponent = Object.assign(_IconUpload, {
  install(app: App) { app.component(_IconUpload.name, _IconUpload) },
})
